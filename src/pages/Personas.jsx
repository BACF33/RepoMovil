import React, { useState } from "react";
import { Plus, User, Users, ChevronRight } from "lucide-react";

function PersonaCard({ persona, onClick }) {
  return (
    <button
      onClick={() => onClick(persona)}
      className="w-full bg-white border border-gray-100 rounded-xl p-3 flex items-center gap-3 text-left hover:shadow-md transition-all mb-2"
    >
      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
        <User size={18} className="text-[#1a3a6b]" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-800 text-sm">{persona.nombre}</h3>
        <p className="text-xs text-gray-400">{persona.email}</p>
        <p className="text-xs text-gray-400">{persona.telefono} · {persona.municipio}</p>
      </div>
      <ChevronRight size={16} className="text-gray-300" />
    </button>
  );
}

function PersonaForm({ persona: initialData, isNew, tipo, onBack, onSave }) {
  const [form, setForm] = useState(
    initialData || { nombre: "", email: "", telefono: "", municipio: "" }
  );
  const handleChange = (f, v) => setForm((p) => ({ ...p, [f]: v }));

  return (
    <div className="flex flex-col h-full">
      <div className="bg-[#1a3a6b] text-white px-4 py-3 flex items-center justify-between">
        <button onClick={onBack} className="text-white text-lg font-bold">←</button>
        <h1 className="font-bold text-lg">{isNew ? `Nuevo ${tipo}` : `Editar ${tipo}`}</h1>
        <button
          onClick={() => { onSave(form); onBack(); }}
          className="bg-white text-[#1a3a6b] font-semibold text-sm px-4 py-1.5 rounded-lg"
        >
          {isNew ? "Guardar" : "Actualizar"}
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-24 space-y-4 bg-gray-50">
        {["nombre", "email", "telefono", "municipio"].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{field}</label>
            <input
              type="text"
              value={form[field]}
              onChange={(e) => handleChange(field, e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-blue-400"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ClientesList({ clientes, addCliente, updateCliente }) {
  const [view, setView] = useState("list");
  const [selected, setSelected] = useState(null);

  if (view === "form") {
    return (
      <PersonaForm
        persona={selected}
        isNew={!selected}
        tipo="Cliente"
        onBack={() => { setView("list"); setSelected(null); }}
        onSave={(data) => selected ? updateCliente(selected.id, data) : addCliente(data)}
      />
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="bg-[#1a3a6b] text-white px-4 py-3">
        <h1 className="font-bold text-lg flex items-center gap-2"><Users size={20} /> Clientes</h1>
      </div>
      <div className="flex-1 overflow-y-auto px-3 py-3 pb-20">
        {clientes.length === 0 && <p className="text-center text-gray-400 text-sm mt-8">No hay clientes</p>}
        {clientes.map((c, i) => <PersonaCard key={i} persona={c} onClick={(p) => { setSelected(p); setView("form"); }} />)}
      </div>
      <button onClick={() => { setSelected(null); setView("form"); }} className="fixed bottom-20 right-4 w-12 h-12 bg-[#1a3a6b] text-white rounded-full shadow-lg flex items-center justify-center"><Plus size={22} /></button>
    </div>
  );
}

export function ProveedoresList({ proveedores, addProveedor, updateProveedor }) {
  const [view, setView] = useState("list");
  const [selected, setSelected] = useState(null);

  if (view === "form") {
    return (
      <PersonaForm
        persona={selected}
        isNew={!selected}
        tipo="Proveedor"
        onBack={() => { setView("list"); setSelected(null); }}
        onSave={(data) => selected ? updateProveedor(selected.id, data) : addProveedor(data)}
      />
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="bg-[#1a3a6b] text-white px-4 py-3">
        <h1 className="font-bold text-lg flex items-center gap-2"><Users size={20} /> Proveedores</h1>
      </div>
      <div className="flex-1 overflow-y-auto px-3 py-3 pb-20">
        {proveedores.length === 0 && <p className="text-center text-gray-400 text-sm mt-8">No hay proveedores</p>}
        {proveedores.map((p, i) => <PersonaCard key={i} persona={p} onClick={(p) => { setSelected(p); setView("form"); }} />)}
      </div>
      <button onClick={() => { setSelected(null); setView("form"); }} className="fixed bottom-20 right-4 w-12 h-12 bg-[#1a3a6b] text-white rounded-full shadow-lg flex items-center justify-center"><Plus size={22} /></button>
    </div>
  );
}