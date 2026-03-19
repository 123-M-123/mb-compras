'use client';

import { Clock } from "lucide-react";
import Link from "next/link";

export default function PendingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-yellow-200 rounded-2xl shadow-md p-8">

        <div className="flex justify-center mb-4">
          <Clock className="w-14 h-14 text-yellow-500" />
        </div>

        <h1 className="text-2xl font-bold text-center text-yellow-600 mb-2">
          Pago pendiente
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Tu pago está siendo procesado.
        </p>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-yellow-900">
            Tu pago está siendo verificado. Esto puede demorar unos minutos.
            Recibirás una confirmación una vez que se complete.
          </p>
        </div>

        <div className="flex gap-3">
          <Link href="/" className="flex-1">
            <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition">
              Volver a la tienda
            </button>
          </Link>
          <Link href="/" className="flex-1">
            <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg transition">
              Ver mis compras
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}