import React, { useState } from "react";
import { Package, Plus } from "lucide-react";

export function VentaForm({ onBack, isNew, productos, clientes, addPedido }) {
  const [form, setForm] = useState({
    productoNombre: "",
    unidades: "",
    total: "",
    descripcion: "",
    estado: "Completado",
  });

  const handleChange = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  return (
    <div className="flex flex-col h-full">
      <div className="bg-[#1a3a6b] text-white px-4 py-3 flex items-center justify-between">
        <button onClick={onBack} className="text-white text-lg font-bold">←</button>
        <h1 className="font-bold text-lg">Detalles de Venta</h1>
        <button onClick={() => { addPedido(form); onBack(); }} className="bg-white text-[#1a3a6b] font-semibold text-sm px-4 py-1.5 rounded-lg">Guardar</button>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-24 space-y-4 bg-gray-50">
        <div className="flex justify-center">
          <div className="w-40 h-32 bg-white rounded-xl border border-gray-200 flex items-center justify-center"><Package size={40} className="text-gray-300" /></div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Producto</label>
          <select value={form.productoNombre} onChange={(e) => handleChange("productoNombre", e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm bg-white outline-none focus:border-blue-400">
            <option value="">Seleccionar repuesto</option>
            {productos.map((p, i) => <option key={i} value={p.nombre}>{p.nombre}</option>)}
          </select>
        </div>
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Unidades</label>
            <input type="number" value={form.unidades} onChange={(e) => handleChange("unidades", e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm outline-none" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Precio Total</label>
            <input type="number" value={form.total} onChange={(e) => handleChange("total", e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm outline-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Ventas({ onNavigate, pedidos }) {
  const totalVentas = pedidos.reduce((s, p) => s + (parseFloat(p.total) || 0), 0);

  return (
    <div className="flex flex-col h-full">
      <div className="bg-[#1a3a6b] text-white px-4 py-4">
        <h1 className="font-bold text-xl">Ventas</h1>
        <p className="text-blue-200 text-sm mt-1">Total: ${totalVentas.toFixed(2)}</p>
      </div>
      <div className="flex-1 overflow-y-auto px-3 py-3 pb-20">
        <div className="space-y-2">
          {pedidos.map((p, i) => (
            <div key={i} className="bg-white rounded-xl p-3 border border-gray-100">
              <div className="flex justify-between"><span className="font-semibold text-sm">Pedido #{p.id}</span><span className="font-bold text-sm">${p.total}</span></div>
              <span className="text-xs text-green-600 font-medium">{p.estado}</span>
            </div>
          ))}
        </div>
      </div>
      <button onClick={() => onNavigate("venta-nueva")} className="fixed bottom-20 right-4 w-12 h-12 bg-[#1a3a6b] text-white rounded-full shadow-lg flex items-center justify-center"><Plus size={22} /></button>
    </div>
  );
}