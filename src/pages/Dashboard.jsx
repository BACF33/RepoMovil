import React, { useState } from "react";
import { Star, User, Package, Truck, DollarSign } from "lucide-react";


function BarChart({ data }) {
  const max = Math.max(...data.map((d) => Math.max(d.ingresos, d.gastos)));
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex items-end gap-1 h-40 min-w-[320px] px-2">
        {data.map((d, i) => (
          <div key={i} className="flex flex-col items-center gap-0.5 flex-1">
            <div className="flex items-end gap-0.5 h-32 w-full justify-center">
              <div
                className="bg-[#1a3a6b] rounded-t-sm w-2 transition-all"
                style={{ height: `${(d.ingresos / max) * 100}%` }}
              />
              <div
                className="bg-red-500 rounded-t-sm w-2 transition-all"
                style={{ height: `${(d.gastos / max) * 100}%` }}
              />
            </div>
            <span className="text-[8px] text-gray-500">{d.mes}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-4 justify-center mt-2">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-[#1a3a6b] rounded-sm" />
          <span className="text-xs text-gray-500">Ingresos</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-red-500 rounded-sm" />
          <span className="text-xs text-gray-500">Gastos</span>
        </div>
      </div>
    </div>
  );
}

function PieChart({ data }) {
  const total = data.reduce((s, d) => s + d.porcentaje, 0);
  let cumulative = 0;
  const size = 160;
  const cx = size / 2;
  const cy = size / 2;
  const r = 60;

  const slices = data.map((d) => {
    const startAngle = (cumulative / total) * 2 * Math.PI - Math.PI / 2;
    cumulative += d.porcentaje;
    const endAngle = (cumulative / total) * 2 * Math.PI - Math.PI / 2;
    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);
    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
    const midAngle = (startAngle + endAngle) / 2;
    const lx = cx + (r * 0.65) * Math.cos(midAngle);
    const ly = cy + (r * 0.65) * Math.sin(midAngle);
    return { ...d, path: `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`, lx, ly };
  });

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {slices.map((s, i) => (
          <g key={i}>
            <path d={s.path} fill={s.color} stroke="white" strokeWidth="1.5" />
            <text x={s.lx} y={s.ly} textAnchor="middle" dominantBaseline="middle" fontSize="7" fill="white" fontWeight="bold">
              {s.porcentaje}%
            </text>
          </g>
        ))}
      </svg>
      <div className="grid grid-cols-2 gap-x-6 gap-y-1 mt-3">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
            <span className="text-xs text-gray-600">{d.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Dashboard({ onNavigate }) {
  const [tab, setTab] = useState("fiscal");

  const quickActions = [
    { label: "Usuario", icon: User, page: "clientes" },
    { label: "Producto", icon: Package, page: "productos" },
    { label: "Proveedor", icon: Truck, page: "menu" },
    { label: "Venta", icon: DollarSign, page: "ventas" },
  ];

  return (
    <div className="space-y-4 pb-2">
      {/* Ingresos y gastos */}
      <div className="bg-white rounded-2xl shadow-sm p-4 mx-1">
        <h2 className="text-center font-semibold text-gray-700 mb-3">Ingreso y gastos</h2>
        <div className="flex gap-2 bg-gray-100 rounded-xl p-1 mb-4">
          <button
            onClick={() => setTab("fiscal")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === "fiscal" ? "bg-[#1a3a6b] text-white shadow" : "text-gray-500"
            }`}
          >
            Este año fiscal
          </button>
          <button
            onClick={() => setTab("efectivo")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === "efectivo" ? "bg-[#1a3a6b] text-white shadow" : "text-gray-500"
            }`}
          >
            Eféctivo
          </button>
        </div>
        <BarChart data={ventasMensuales} />
        <div className="flex justify-between mt-3 pt-3 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-400">Ingresos</p>
            <p className="font-bold text-gray-800">$00.00</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">Gastos</p>
            <p className="font-bold text-gray-800">$00.00</p>
          </div>
        </div>
      </div>

      {/* Pie chart */}
      <div className="bg-white rounded-2xl shadow-sm p-4 mx-1">
        <h2 className="text-center font-semibold text-gray-700 mb-4">Municipios por orden de compras</h2>
        <PieChart data={municipios} />
      </div>

      {/* Quick create */}
      <div className="bg-white rounded-2xl shadow-sm p-4 mx-1 border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Star size={18} className="text-gray-400" />
          <h2 className="font-semibold text-gray-700">Creacion rapida</h2>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {quickActions.map(({ label, icon: Icon, page }) => (
            <button
              key={label}
              onClick={() => onNavigate(page)}
              className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gray-50 hover:bg-blue-50 hover:border-blue-200 border border-gray-100 transition-all"
            >
              <Icon size={22} className="text-gray-600" />
              <span className="text-xs text-gray-600 font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
