import { useNavigate } from "react-router-dom";
import { Users, Truck, Package, DollarSign, ClipboardList, ChevronRight } from "lucide-react";

const styles = {
  pageContainer: {
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    paddingBottom: "20px",
  },
  content: {
    padding: "20px",
  },
  section: {
    marginBottom: "30px",
  },
  sectionTitle: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "15px",
  },
  menuItem: {
    backgroundColor: "#e8e8e8",
    padding: "18px 20px",
    marginBottom: "12px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  menuItemContent: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  menuIcon: {
    color: "#333",
  },
  menuText: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#333",
  },
  arrow: {
    color: "#333",
  },
};

export default function Inicio() {
  const navigate = useNavigate();

  const handleNavigation = (section) => {
  };

  const handleProfileClick = () => {
    navigate("/login");
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.content}>
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Usuarios</h2>
          
          <div
            style={styles.menuItem}
            onClick={() => handleNavigation("clientes")}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#d8d8d8"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#e8e8e8"}
          >
            <div style={styles.menuItemContent}>
              <Users size={24} style={styles.menuIcon} />
              <span style={styles.menuText}>Clientes</span>
            </div>
            <ChevronRight size={20} style={styles.arrow} />
          </div>

          <div
            style={styles.menuItem}
            onClick={() => handleNavigation("proveedores")}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#d8d8d8"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#e8e8e8"}
          >
            <div style={styles.menuItemContent}>
              <Truck size={24} style={styles.menuIcon} />
              <span style={styles.menuText}>Proveedores</span>
            </div>
            <ChevronRight size={20} style={styles.arrow} />
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Productos</h2>
          
          <div
            style={styles.menuItem}
            onClick={() => handleNavigation("productos")}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#d8d8d8"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#e8e8e8"}
          >
            <div style={styles.menuItemContent}>
              <Package size={24} style={styles.menuIcon} />
              <span style={styles.menuText}>Productos</span>
            </div>
            <ChevronRight size={20} style={styles.arrow} />
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Ventas</h2>
          
          <div
            style={styles.menuItem}
            onClick={() => handleNavigation("ventas")}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#d8d8d8"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#e8e8e8"}
          >
            <div style={styles.menuItemContent}>
              <DollarSign size={24} style={styles.menuIcon} />
              <span style={styles.menuText}>Ventas</span>
            </div>
            <ChevronRight size={20} style={styles.arrow} />
          </div>

          <div
            style={styles.menuItem}
            onClick={() => handleNavigation("historial")}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#d8d8d8"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#e8e8e8"}
          >
            <div style={styles.menuItemContent}>
              <ClipboardList size={24} style={styles.menuIcon} />
              <span style={styles.menuText}>Historial de Pedidos</span>
            </div>
            <ChevronRight size={20} style={styles.arrow} />
          </div>
        </div>
      </div>
    </div>
  );
}
