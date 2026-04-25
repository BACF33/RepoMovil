import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import imgLogo from "../assets/golo-removebg-preview 5.png";
import imgFondo from "../assets/fondo.png";

const styles = {
  pageContainer: {
    minHeight: "100vh",
    backgroundImage: `url(${imgFondo})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    position: "relative",
  },
  topBar: {
    width: "90%",
    maxWidth: "400px",
    height: "5px",
    background: "linear-gradient(90deg, #00d4ff, #0099cc)",
    boxShadow: "0 0 15px #00d4ff, 0 0 30px rgba(0, 212, 255, 0.5)",
    marginTop: "20px",
    borderRadius: "2px",
  },
  bottomBar: {
    width: "90%",
    maxWidth: "400px",
    height: "5px",
    background: "linear-gradient(90deg, #00d4ff, #0099cc)",
    boxShadow: "0 0 15px #00d4ff, 0 0 30px rgba(0, 212, 255, 0.5)",
    marginBottom: "20px",
    borderRadius: "2px",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    maxWidth: "450px",
  },
  logoContainer: {
    marginBottom: "30px",
    textAlign: "center",
  },
  logo: {
    width: "200px",
    height: "auto",
    filter: "drop-shadow(0 0 10px rgba(0, 212, 255, 0.5))",
  },
  formCard: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: "15px",
    padding: "40px 30px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
  },
  formTitle: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#2c3e50",
    textAlign: "center",
    marginBottom: "10px",
  },
  titleUnderline: {
    width: "150px",
    height: "3px",
    background: "#1e5a8e",
    margin: "0 auto 30px",
  },
  label: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "8px",
    display: "block",
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "12px 18px",
    border: "2px solid #d0d5da",
    borderRadius: "8px",
    fontSize: "14px",
    transition: "all 0.3s ease",
    outline: "none",
    color: "#333",
    backgroundColor: "#fff",
  },
  forgotPassword: {
    textAlign: "center",
    marginBottom: "25px",
  },
  forgotLink: {
    color: "#555",
    fontSize: "14px",
    textDecoration: "underline",
    cursor: "pointer",
  },
  submitButton: {
    width: "100%",
    padding: "14px",
    background: "#1e5a8e",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  },
};

export default function IniciarSesion() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    usuario: "",
    contrasena: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.topBar}></div>

      <div style={styles.contentContainer}>
        <div style={styles.logoContainer}>
          <img src={imgLogo} alt="Express Spare Parts" style={styles.logo} />
        </div>

        <div style={styles.formCard}>
          <h2 style={styles.formTitle}>Iniciar sesion</h2>
          <div style={styles.titleUnderline}></div>

          <form onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Usuario</label>
              <input
                type="text"
                name="usuario"
                placeholder="Usuario"
                value={form.usuario}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Contraseña</label>
              <input
                type="password"
                name="contrasena"
                placeholder="Contraseña"
                value={form.contrasena}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.forgotPassword}>
              <a href="#" style={styles.forgotLink}>
                Recuperacion contraseña
              </a>
            </div>

            <button type="submit" style={styles.submitButton}>
              Iniciar sesion
            </button>
          </form>
        </div>
      </div>

      <div style={styles.bottomBar}></div>

      <style>{`
        input:focus {
          border-color: #1e5a8e !important;
          box-shadow: 0 0 0 3px rgba(30, 90, 142, 0.1) !important;
        }

        button:hover {
          background: #164a73;
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(0,0,0,0.3);
        }

        a:hover {
          color: #1e5a8e !important;
        }
      `}</style>
    </div>
  );
}
