import React from "react";
import { Users, UserCheck, Package, DollarSign, ClipboardList, ChevronRight } from "lucide-react";

const menuItems = [
  {
    section: "Usuarios",
    items: [
      { label: "Clientes", icon: Users, page: "clientes" },
      { label: "Proveedores", icon: UserCheck, page: "proveedores" },
    ],
  },
  {
    section: "Productos",
    items: [{ label: "Productos", icon: Package, page: "productos" }],
  },
  {
    section: "Ventas",
    items: [
      { label: "Ventas", icon: DollarSign, page: "ventas" },
      { label: "Historial de Pedidos", icon: ClipboardList, page: "historial" },
    ],
  },
];

export default function Menu({ onNavigate }) {
  return (
    <div className="pb-2">
      {menuItems.map(({ section, items }) => (
        <div key={section} className="mb-4">
          <h2 className="font-bold text-gray-800 text-lg px-1 mb-2">{section}</h2>
          <div className="space-y-2">
            {items.map(({ label, icon: Icon, page }) => (
              <button
                key={label}
                onClick={() => onNavigate(page)}
                className="w-full flex items-center justify-between bg-gray-100 rounded-xl px-4 py-3 hover:bg-blue-50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} className="text-gray-600" />
                  <span className="font-medium text-gray-700">{label}</span>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
