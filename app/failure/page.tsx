'use client';

import { XCircle, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function FailurePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-red-200 rounded-2xl shadow-md p-8">
        
        <div className="flex justify-center mb-4">
          <XCircle className="w-14 h-14 text-red-500" />
        </div>

        <h1 className="text-2xl font-bold text-center text-red-600 mb-2">
          Pago fallido
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Lamentablemente, su pago no pudo ser procesado.
        </p>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-red-800">Por favor, intentá de nuevo</p>
            <p className="text-sm text-red-600">
              Comprobá tus datos de pago e intentalo nuevamente.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Link href="/" className="flex-1">
            <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition">
              Volver a la tienda
            </button>
          </Link>
          <Link href="/checkout" className="flex-1">
            <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition">
              Intentar de nuevo
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}