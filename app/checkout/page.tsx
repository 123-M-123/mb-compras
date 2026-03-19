'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    MercadoPago: any;
  }
}

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const brickContainer = useRef<HTMLDivElement>(null);
  const brickRendered = useRef(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const titulo = searchParams?.get('titulo') || '';
  const precio = Number(searchParams?.get('precio')) || 0;
  const descripcion = searchParams?.get('descripcion') || '';

  useEffect(() => {
    if (brickRendered.current) return;
    brickRendered.current = true;

    const initBrick = async () => {
      try {
        // 1. Crear preferencia
        const res = await fetch('/api/create-preference', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: titulo,
            price: precio,
            quantity: 1,
            description: descripcion,
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Error creando preferencia');

        const preferenceId = data.id;

        // 2. Cargar SDK de Mercado Pago
        const script = document.createElement('script');
        script.src = 'https://sdk.mercadopago.com/js/v2';
        script.async = true;
        document.body.appendChild(script);

        script.onload = async () => {
          const mp = new window.MercadoPago(
            process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!,
            { locale: 'es-AR' }
          );

          const bricksBuilder = mp.bricks();

          await bricksBuilder.create('payment', 'payment-brick-container', {
            initialization: {
              amount: precio,
              preferenceId: preferenceId,
            },
            customization: {
  paymentMethods: {
    creditCard: 'all',
    debitCard: 'all',
    mercadoPago: 'all',      // ← saldo cuenta MP + cuotas sin tarjeta
    ticket: 'all',           // ← pagos en efectivo (Rapipago, Pago Fácil)
  },
},
            callbacks: {
              onReady: () => setLoading(false),
              onSubmit: async ({ formData }: any) => {
                const result = await fetch('/api/process-payment', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(formData),
                });
                const payment = await result.json();

                if (payment.status === 'approved') {
                  window.location.href = '/success';
                } else if (payment.status === 'pending'|| payment.status === 'in_process') {
                  window.location.href = '/pending';
                } else {
                  window.location.href = '/failure';
                }
              },
              onError: (error: any) => {
                console.error('Brick error:', error);
                setError('Ocurrió un error con el formulario de pago.');
              },
            },
          });
        };
      } catch (err: any) {
        setError(err.message || 'Error inesperado');
        setLoading(false);
      }
    };

    initBrick();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">Finalizar compra</h1>
      <p className="text-gray-600 mb-1">{titulo}</p>
      <p className="text-xl font-bold mb-6">
  $ {precio.toLocaleString('es-AR')}
</p>

      {loading && <p className="text-gray-500">Cargando formulario de pago...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div id="payment-brick-container" ref={brickContainer} />
    </div>
  );
}