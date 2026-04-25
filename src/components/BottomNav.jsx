import React from "react";
import { Home, Users, ShoppingCart, Package, MoreHorizontal, ClipboardList } from "lucide-react";

const tabs = [
  { id: "dashboard", label: "Inicio", icon: Home },
  { id: "clientes", label: "Clientes", icon: Users },
  { id: "ventas", label: "Ventas", icon: ShoppingCart },
  { id: "productos", label: "Productos", icon: Package },
  { id: "menu", label: "Más", icon: MoreHorizontal },
];

export default function BottomNav({ active, onNavigate }) {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center py-2">
        {tabs.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all"
            >
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
                  isActive ? "bg-[#1a3a6b] text-white shadow-lg" : "text-gray-400"
                }`}
              >
                <Icon size={20} />
              </div>
              <span
                className={`text-[10px] font-medium ${
                  isActive ? "text-[#1a3a6b]" : "text-gray-400"
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}