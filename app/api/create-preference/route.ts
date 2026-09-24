import { NextRequest, NextResponse } from 'next/server';

/**
 * CREACIÓN DE PREFERENCIA DE CHECKOUT - MB COMPRAS
 * =========================================================================
 * Arquitectura Híbrida:
 * 1. Consulta dinámica a tdt.ar para obtener las credenciales activas de Axel (gaId: 534715172).
 * 2. Fallback de seguridad hacia process.env.MP_ACCESS_TOKEN (Cuenta de Marcos).
 * 3. 🟢 ARREGLA FALTANTE CRÍTICO: Inyecta external_reference para la Columna A del Excel.
 * 4. 🟢 ARREGLA URLs: Elimina localhost:3000 de retorno y centraliza el webhook en tdt.ar.
 * 5. 🟢 NORMALIZA NÚMEROS: Number() en precios para evitar errores 400 de Mercado Pago.
 */

// Fallback de seguridad: Tu cuenta personal de Marcos en Vercel
const FALLBACK_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN || '';

// gaId oficial de MB Compras registrado en la Planilla Maestra de TdT
const MB_COMPRAS_GAID = process.env.GA_ID || "534715172";

// Secreto interno de comunicación con la Nave Nodriza
const INTERNAL_SECRET = process.env.TIENDAS_INTERNAL_SECRET || "tdt-secure-bridge-2026";

type ItemCarrito = {
  id: string;
  title: string;
  quantity: number;
  unit_price: number;
  currency_id?: string;
  description?: string;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 🟢 ARREGLADO: Fallback seguro a su dominio de producción (nunca más localhost)
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://mb-compras.vercel.app';

    // 🟢 ARREGLADO: Capturamos el email para que el Excel identifique la tienda
    const vendedorEmail = body.vendedorEmail || "tallerbasicobuongusto@gmail.com";

    // 1. 🟢 RESOLUCIÓN DINÁMICA DEL TOKEN (Consulta a tdt.ar)
    let tokenActivo = FALLBACK_ACCESS_TOKEN;
    let origenToken = "FALLBACK_MARCOS";

    try {
      const resToken = await fetch(`https://tdt.ar/api/tiendas/mp-token?gaId=${MB_COMPRAS_GAID}`, {
        method: "GET",
        headers: {
          "Cache-Control": "no-store",
          "x-tiendas-secret": INTERNAL_SECRET,
        },
        signal: AbortSignal.timeout(3000),
      });

      if (resToken.ok) {
        const dataToken = await resToken.json();
        if (dataToken.success && dataToken.access_token) {
          tokenActivo = dataToken.access_token;
          origenToken = "OFICIAL_MB_COMPRAS";
        }
      }
    } catch (errToken) {
      console.warn(
        `[CHECKOUT MB-COMPRAS] No se pudo consultar tdt.ar. Usando token de fallback:`,
        errToken
      );
    }

    // Validación de seguridad
    if (!tokenActivo) {
      console.error("[CHECKOUT MB-COMPRAS] Error crítico: No hay ningún token disponible.");
      return NextResponse.json(
        { error: "Medio de pago no configurado actualmente. Por favor coordinar por WhatsApp." },
        { status: 500 }
      );
    }

    console.log(`[CHECKOUT MB-COMPRAS] Procesando preferencia con credencial: [${origenToken}]`);

    // 2. 🟢 CONSTRUCCIÓN DE ITEMS CON SANITIZACIÓN NUMÉRICA
    let items: ItemCarrito[];

    if (body.items && Array.isArray(body.items)) {
      // Carrito múltiple
      items = body.items.map((i: any) => ({
        id:          String(i.id || 'prod'),
        title:       String(i.title || 'Producto MB Compras').substring(0, 250),
        quantity:    Number(i.quantity || 1),
        unit_price:  Number(i.unit_price ?? i.price ?? 0),
        currency_id: 'ARS',
      }));
    } else {
      // Producto único (compatibilidad)
      items = [{
        id:          '1',
        title:       String(body.title || 'Compra MB Compras').substring(0, 250),
        quantity:    Number(body.quantity || 1),
        unit_price:  Number(body.price ?? body.unit_price ?? 0),
        currency_id: 'ARS',
        description: body.description ? String(body.description).substring(0, 250) : undefined,
      }];
    }

    // 3. 🟢 OBJETO PREFERENCIA CON IDENTIFICACIÓN CONTABLE Y WEBHOOK CENTRAL
    const preference = {
      items,
      // 🛡️ ESTA LÍNEA ES LA QUE SALVA TU EXCEL:
      external_reference: vendedorEmail,

      // 🛡️ URLs de retorno corregidas hacia producción
      back_urls: {
        success: `${baseUrl}/success`,
        failure: `${baseUrl}/failure`,
        pending: `${baseUrl}/pending`,
      },
      auto_return: 'approved',

      // 🛡️ Webhook oficial centralizado en tdt.ar
      notification_url: "https://tdt.ar/api/webhook",

      metadata: {
        vendedor_email: vendedorEmail,
        cliente_nombre: body.clienteNombre || "Cliente MB Compras",
        cliente_whatsapp: body.clienteWhatsapp || "S/D",
        punto_entrega: body.puntoEntrega || "S/D"
      }
    };

    // 4. ENVÍO DIRECTO A MERCADO PAGO
    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenActivo}`,
      },
      body: JSON.stringify(preference),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('[CHECKOUT MB-COMPRAS] Mercado Pago API Error:', data);
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('[CHECKOUT MB-COMPRAS] Error creating preference:', error);
    return NextResponse.json(
      { error: 'Error creating preference' },
      { status: 500 }
    );
  }
}