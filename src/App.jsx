import React, { useState } from "react";
import BottomNav from "./components/BottomNav";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Menu from "./pages/Menu";
import { ProductosList } from "./pages/Productos";
import Ventas, { VentaForm } from "./pages/Ventas";
import { ClientesList, ProveedoresList } from "./pages/Personas";

const MAIN_TABS = ["dashboard", "clientes", "ventas", "productos", "menu"];

export default function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [activeTab, setActiveTab] = useState("dashboard");

  // Estados locales
  const [clientes, setClientes] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [productos, setProductos] = useState([]);
  const [pedidos, setPedidos] = useState([]);

  const navigate = (page) => {
    setCurrentPage(page);
    if (MAIN_TABS.includes(page)) setActiveTab(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return (
          <>
            <Header />
            <div className="flex-1 overflow-y-auto px-3 py-3 pb-20">
              <Dashboard onNavigate={navigate} />
            </div>
          </>
        );
      case "menu":
        return (
          <>
            <Header showSearch />
            <div className="flex-1 overflow-y-auto px-4 py-4 pb-20">
              <Menu onNavigate={navigate} />
            </div>
          </>
        );
      case "clientes":
        return (
          <ClientesList 
            clientes={clientes} 
            addCliente={(c) => setClientes([...clientes, { ...c, id: Date.now() }])}
          />
        );
      case "proveedores":
        return (
          <ProveedoresList 
            proveedores={proveedores} 
            addProveedor={(p) => setProveedores([...proveedores, { ...p, id: Date.now() }])}
          />
        );
      case "productos":
        return <ProductosList productos={productos} onNavigate={navigate} />;
      case "ventas":
        return <Ventas pedidos={pedidos} onNavigate={navigate} />;
      case "venta-nueva":
        return (
          <VentaForm 
            onBack={() => navigate("ventas")} 
            productos={productos}
            addPedido={(p) => setPedidos([...pedidos, { ...p, id: pedidos.length + 1 }])}
          />
        );
      default:
        return <div className="p-10 text-center">Página no encontrada</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-sm min-h-screen bg-gray-50 flex flex-col relative shadow-2xl">
        {renderPage()}
        <BottomNav
          active={activeTab}
          onNavigate={(tab) => {
            setActiveTab(tab);
            navigate(tab);
          }}
        />
      </div>
    </div>
  );
}