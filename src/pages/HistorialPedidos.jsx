import React, { useState } from "react";
import { Search, Menu, Plus } from "lucide-react";

function PedidoCard({ pedido }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-3 mb-3">
      <div className="flex justify-between items-start mb-1">
        <h3 className="font-semibold text-gray-800 text-sm">Pedido #{pedido.id}</h3>
        <span className="font-bold text-gray-800 text-sm">${pedido.total.toFixed(2)}</span>
      </div>
      <p className="text-xs text-gray-400">Id Cliente: {pedido.clienteId}</p>
      <p className="text-xs text-gray-500 mt-0.5">Proveedor: {pedido.proveedor}</p>
      <p className="text-xs text-gray-500 mt-0.5">Unidades vendidas: {pedido.unidades}</p>
      <p className="text-xs text-gray-400 mt-1">Desc Pedido: {pedido.descripcion}</p>
    </div>
  );
}

export default function HistorialPedidos({ onNavigate }) {
  const { pedidos } = useApp();
  const [filter, setFilter] = useState("todos");
  const [search, setSearch] = useState("");

  const filtered = pedidos.filter((p) => {
    const matchSearch = p.id.includes(search) || p.clienteId.includes(search);
    const matchFilter =
      filter === "todos" ||
      (filter === "sinstock" && p.estado === "Sin Stock");
    return matchSearch && matchFilter;
  });

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-[#1a3a6b] text-white px-4 py-3 flex items-center justify-between">
        <h1 className="font-bold text-lg">Historial de pedidos</h1>
        <div className="flex gap-3">
          <Menu size={22} />
          <Search size={22} />
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white px-4 py-2 flex gap-2 border-b border-gray-100">
        {["todos", "sinstock"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              filter === f ? "bg-[#1a3a6b] text-white" : "bg-gray-100 text-gray-600"
            }`}
          >
            {f === "todos" ? "Todos" : "Sin Stock"}
          </button>
        ))}
        <button className="px-4 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-600">
          Mas
        </button>
      </div>

      {/* Search */}
      <div className="bg-white px-4 py-2">
        <input
          type="text"
          placeholder="Buscar Id"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-blue-400"
        />
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-3 py-2 pb-20">
        {filtered.map((p, i) => (
          <PedidoCard key={i} pedido={p} />
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-gray-400 text-sm mt-8">No hay pedidos</p>
        )}
      </div>

      {/* FAB */}
      <button
        onClick={() => onNavigate("venta-nueva")}
        className="fixed bottom-20 right-4 w-12 h-12 bg-[#1a3a6b] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-800 transition-all z-40"
      >
        <Plus size={22} />
      </button>
    </div>
  );
}
