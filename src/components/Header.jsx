import React from "react";
import { User, Search } from "lucide-react";

const Header = ({ showSearch = false }) => {
  // Definimos un usuario por defecto para evitar importar mockData
  const currentUser = {
    name: "Cristian",
    role: "Administrador"
  };

  return (
    <header className="bg-[#1a3a6b] text-white p-4 rounded-b-3xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <User size={20} className="text-[#1a3a6b]" />
          </div>
          <div>
            <p className="text-xs text-blue-200">Bienvenido,</p>
            <h2 className="font-bold text-sm">{currentUser.name}</h2>
          </div>
        </div>
        <div className="bg-blue-800/50 px-3 py-1 rounded-full border border-blue-400/30">
          <span className="text-[10px] font-medium uppercase tracking-wider">
            {currentUser.role}
          </span>
        </div>
      </div>

      {showSearch && (
        <div className="relative mt-2">
          <Search 
            size={16} 
            className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300" 
          />
          <input
            type="text"
            placeholder="Buscar productos o clientes..."
            className="w-full bg-blue-800/40 border border-blue-400/20 rounded-xl py-2 pl-10 pr-4 text-sm placeholder:text-blue-300 outline-none focus:border-blue-400/50"
          />
        </div>
      )}
    </header>
  );
};

export default Header;