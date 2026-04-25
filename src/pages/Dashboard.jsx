import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, User, Package, Truck, DollarSign, BarChart3, PieChart } from "lucide-react";

const styles = {
  pageContainer: {
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    paddingBottom: "20px",
  },
  content: {
    padding: "20px",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "15px",
    padding: "20px",
    marginBottom: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  cardTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#666",
    textAlign: "center",
    marginBottom: "15px",
  },
  tabContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "15px",
  },
  tab: {
    flex: 1,
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  tabActive: {
    backgroundColor: "#1e5a8e",
    color: "white",
  },
  tabInactive: {
    backgroundColor: "#e8e8e8",
    color: "#666",
  },
  chartPlaceholder: {
    width: "100%",
    height: "200px",
    backgroundColor: "#f0f0f0",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "15px",
  },
  statsContainer: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "10px",
  },
  statItem: {
    textAlign: "center",
  },
  statLabel: {
    fontSize: "13px",
    color: "#666",
    marginBottom: "5px",
  },
  statValue: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
  },
  quickActionsCard: {
    backgroundColor: "white",
    borderRadius: "15px",
    padding: "20px",
    marginBottom: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  quickActionsTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "15px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  quickActionsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "15px",
  },
  quickActionItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
  },
  quickActionIcon: {
    width: "50px",
    height: "50px",
    backgroundColor: "#e8e8e8",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#666",
  },
  quickActionLabel: {
    fontSize: "12px",
    color: "#666",
    textAlign: "center",
  },
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("fiscal");

  return (
    <div style={styles.pageContainer}>
      <div style={styles.content}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Ingreso y gastos</h3>
          
          <div style={styles.tabContainer}>
            <button
              style={{
                ...styles.tab,
                ...(activeTab === "fiscal" ? styles.tabActive : styles.tabInactive),
              }}
              onClick={() => setActiveTab("fiscal")}
            >
              Este año fiscal
            </button>
            <button
              style={{
                ...styles.tab,
                ...(activeTab === "efectivo" ? styles.tabActive : styles.tabInactive),
              }}
              onClick={() => setActiveTab("efectivo")}
            >
              Efectivo
            </button>
          </div>

          <div style={styles.chartPlaceholder}>
            <BarChart3 size={48} color="#1e5a8e" />
          </div>

          <div style={styles.statsContainer}>
            <div style={styles.statItem}>
              <div style={styles.statLabel}>Ingresos</div>
              <div style={styles.statValue}>$00.00</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statLabel}>Gastos</div>
              <div style={styles.statValue}>$00.00</div>
            </div>
          </div>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Municipios por orden de compras</h3>
          
          <div style={styles.chartPlaceholder}>
            <PieChart size={48} color="#1e5a8e" />
          </div>
        </div>

        <div style={styles.quickActionsCard}>
          <h3 style={styles.quickActionsTitle}>
            <Star size={20} color="#333" />
            Creacion rapida
          </h3>
          
          <div style={styles.quickActionsGrid}>
            <div style={styles.quickActionItem}>
              <div style={styles.quickActionIcon}>
                <User size={28} />
              </div>
              <span style={styles.quickActionLabel}>Usuario</span>
            </div>

            <div style={styles.quickActionItem}>
              <div style={styles.quickActionIcon}>
                <Package size={28} />
              </div>
              <span style={styles.quickActionLabel}>Producto</span>
            </div>

            <div style={styles.quickActionItem}>
              <div style={styles.quickActionIcon}>
                <Truck size={28} />
              </div>
              <span style={styles.quickActionLabel}>Proveedor</span>
            </div>

            <div style={styles.quickActionItem}>
              <div style={styles.quickActionIcon}>
                <DollarSign size={28} />
              </div>
              <span style={styles.quickActionLabel}>Venta</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
