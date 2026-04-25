import React, { useState } from "react";
import { Search, Menu, Plus, Package } from "lucide-react";


function ProductCard({ producto, onClick }) {
  const stockColor =
    producto.stock === 0
      ? "text-red-500"
      : producto.stock < 20
      ? "text-yellow-500"
      : "text-green-600";

  return (
    <button
      onClick={() => onClick(producto)}
      className="w-full bg-white border border-gray-100 rounded-xl p-3 flex gap-3 text-left hover:shadow-md transition-all"
    >
      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
        <Package size={28} className="text-gray-400" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-gray-800 text-sm leading-tight">{producto.nombre}</h3>
          <span className="font-bold text-gray-800 text-sm ml-2 flex-shrink-0">
            ${producto.precio.toFixed(2)}
          </span>
        </div>
        <p className="text-xs text-gray-400 mt-0.5">Id: {producto.id}</p>
        <p className={`text-xs font-medium mt-0.5 ${stockColor}`}>
          Stock: {producto.stock} Unidades
        </p>
        <p className="text-xs text-gray-500 mt-0.5">Proveedor: {producto.proveedor}</p>
        <p className="text-xs text-gray-400 mt-1 line-clamp-2">{producto.descripcion}</p>
      </div>
    </button>
  );
}

export function ProductosList({ onNavigate }) {
  const { productos } = useApp();
  const [filter, setFilter] = useState("todos");
  const [search, setSearch] = useState("");

  const filtered = productos.filter((p) => {
    const matchSearch =
      p.nombre.toLowerCase().includes(search.toLowerCase()) ||
      p.id.includes(search);
    const matchFilter =
      filter === "todos" ||
      (filter === "sinstock" && p.stock === 0);
    return matchSearch && matchFilter;
  });

  return (
    <div className="flex flex-col h-full">
      <div className="bg-[#1a3a6b] text-white px-4 py-3 flex items-center justify-between">
        <h1 className="font-bold text-lg">Lista De Productos</h1>
        <div className="flex gap-3">
          <Menu size={22} />
          <Search size={22} />
        </div>
      </div>

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

      <div className="bg-white px-4 py-2">
        <input
          type="text"
          placeholder="Buscar Id"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-blue-400"
        />
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-3 pb-20">
        {filtered.map((p, i) => (
          <ProductCard
            key={i}
            producto={p}
            onClick={(prod) => onNavigate("producto-detalle", prod)}
          />
        ))}
      </div>

      <button
        onClick={() => onNavigate("producto-nuevo")}
        className="fixed bottom-20 right-4 w-12 h-12 bg-[#1a3a6b] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-800 transition-all z-40"
      >
        <Plus size={22} />
      </button>
    </div>
  );
}

export function ProductoForm({ onBack, producto: initialData, isNew }) {
  const { addProducto, updateProducto, proveedores } = useApp();
  const [form, setForm] = useState(
    initialData || {
      nombre: "",
      codigo: "",
      stock: "",
      precio: "",
      proveedor: "",
      descripcion: "",
      estado: "Disponible",
    }
  );

  const handleChange = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = () => {
    if (isNew) {
      addProducto(form);
    } else {
      updateProducto(initialData.id, form);
    }
    onBack();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-[#1a3a6b] text-white px-4 py-3 flex items-center justify-between">
        <button onClick={onBack} className="text-white text-lg font-bold">←</button>
        <h1 className="font-bold text-lg">Product details</h1>
        <button
          onClick={handleSubmit}
          className="bg-white text-[#1a3a6b] font-semibold text-sm px-4 py-1.5 rounded-lg"
        >
          {isNew ? "Guardar" : "Update"}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 pb-24 space-y-4 bg-gray-50">
        <div className="flex justify-center">
          <div className="w-40 h-32 bg-white rounded-xl border border-gray-200 flex items-center justify-center">
            <Package size={40} className="text-gray-300" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Spare part name"
            value={form.nombre}
            onChange={(e) => handleChange("nombre", e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm bg-white outline-none focus:border-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Code <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="111801"
            value={form.codigo}
            onChange={(e) => handleChange("codigo", e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm bg-white outline-none focus:border-blue-400"
          />
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stock <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder="105"
              value={form.stock}
              onChange={(e) => handleChange("stock", e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm bg-white outline-none focus:border-blue-400"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input
              type="number"
              placeholder="$50.00"
              value={form.precio}
              onChange={(e) => handleChange("precio", e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm bg-white outline-none focus:border-blue-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Provider</label>
          <select
            value={form.proveedor}
            onChange={(e) => handleChange("proveedor", e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm bg-white outline-none focus:border-blue-400 appearance-none"
          >
            <option value="">Provider name</option>
            {proveedores.map((p) => (
              <option key={p.id} value={p.nombre}>
                {p.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            placeholder="Spare part description"
            value={form.descripcion}
            onChange={(e) => handleChange("descripcion", e.target.value)}
            rows={3}
            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm bg-white outline-none focus:border-blue-400 resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            value={form.estado}
            onChange={(e) => handleChange("estado", e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm bg-white outline-none focus:border-blue-400"
          >
            <option>Disponible</option>
            <option>Sin Stock</option>
            <option>Descontinuado</option>
          </select>
        </div>
      </div>
    </div>
  );
}
