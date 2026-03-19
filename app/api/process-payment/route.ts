import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    
    // Log para ver qué manda el Brick
    console.log('FormData recibido:', JSON.stringify(formData, null, 2));

    const response = await fetch('https://api.mercadopago.com/v1/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        'X-Idempotency-Key': crypto.randomUUID(),
      },
      body: JSON.stringify({ ...formData, differential_pricing_id: undefined }),
    });

    const data = await response.json();
    
    // Log para ver qué responde MP
    console.log('Respuesta MP:', JSON.stringify(data, null, 2));

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error processing payment:', error);
    return NextResponse.json(
      { error: 'Error procesando el pago' },
      { status: 500 }
    );
  }
}