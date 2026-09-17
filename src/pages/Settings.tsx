import { useState } from "react";
import Card from "../components/Card";

type SettingsProps = {
  numeInitial: string;
  clasaInitiala: string;
  onSalvare: (nume: string, clasa: string) => void;
  darkMode: boolean;
};

export default function Settings({
  numeInitial,
  clasaInitiala,
  onSalvare,
  darkMode,
}: SettingsProps) {
  const [numeUtilizator, setNumeUtilizator] = useState(numeInitial);
  const [clasaUtilizator, setClasaUtilizator] = useState(clasaInitiala);
  const [mesajSalvare, setMesajSalvare] = useState("");

  const salveazaProfil = () => {
    onSalvare(numeUtilizator, clasaUtilizator);
    setMesajSalvare("✅ Profilul a fost salvat cu succes!");

    setTimeout(() => {
      setMesajSalvare("");
    }, 3000);
  };

  return (
    <Card titlu="Setări" darkMode={darkMode}>
      <div
        style={{
          display: "grid",
          gap: "16px",
          maxWidth: "520px",
          margin: "0 auto",
          transition: "all 0.3s ease",
          animation: "fadeIn 0.3s ease",
        }}
      >
       <label>
  <strong>Numele utilizatorului</strong>

  <input
    type="text"
    value={numeUtilizator}
    onChange={(e) => setNumeUtilizator(e.target.value)}
    placeholder="Ex.: Andrei Popescu"
    style={{
      width: "100%",
      marginTop: "8px",
      padding: "12px",
      borderRadius: "8px",
      border: darkMode
        ? "1px solid #475569"
        : "1px solid #cbd5e1",
      boxSizing: "border-box",
      background: darkMode ? "#0f172a" : "#ffffff",
      color: darkMode ? "#e2e8f0" : "#0f172a",
      transition:
        "background 0.3s ease, color 0.3s ease, border 0.3s ease",
    }}
  />
</label>

<label>
  <strong>Clasa</strong>

  <select
    value={clasaUtilizator}
    onChange={(e) => setClasaUtilizator(e.target.value)}
    style={{
      width: "100%",
      marginTop: "8px",
      padding: "12px",
      borderRadius: "8px",
      border: darkMode
        ? "1px solid #475569"
        : "1px solid #cbd5e1",
      boxSizing: "border-box",
      background: darkMode ? "#0f172a" : "#ffffff",
      color: darkMode ? "#e2e8f0" : "#0f172a",
      transition:
        "background 0.3s ease, color 0.3s ease, border 0.3s ease",
    }}
  >
    <option>Clasa a V-a</option>
    <option>Clasa a VI-a</option>
    <option>Clasa a VII-a</option>
    <option>Clasa a VIII-a</option>
  </select>
</label> 

        <button
          onClick={salveazaProfil}
          style={{
            background: "#16a34a",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "12px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Salvează profilul
        </button>

        {mesajSalvare && (
          <p
            style={{
              color: "#16a34a",
              fontWeight: "bold",
              textAlign: "center",
              marginTop: "12px",
            }}
          >
            {mesajSalvare}
          </p>
        )}
      </div>
            <div
        style={{
          maxWidth: "520px",
          margin: "28px auto 0",
          paddingTop: "20px",
          borderTop: darkMode
            ? "1px solid #334155"
            : "1px solid #e2e8f0",
          textAlign: "center",
          color: darkMode ? "#cbd5e1" : "#64748b",
        }}
      >
        <h3
          style={{
            margin: "0 0 10px",
            color: darkMode ? "#93c5fd" : "#1e3a8a",
          }}
        >
          Despre JAFI
        </h3>

        <p style={{ margin: "5px 0", fontWeight: 600 }}>
          Jurnalul Activităților Fizice Independente
        </p>

        <p style={{ margin: "5px 0" }}>
          Versiunea 1.0
        </p>

        <p style={{ margin: "5px 0" }}>
          Autor: <strong>Toma Alin Cătălin</strong>
        </p>

        <p
          style={{
            margin: "12px 0 0",
            fontSize: "13px",
            opacity: 0.8,
          }}
        >
          © 2026 Toma Alin Cătălin. Toate drepturile rezervate.
        </p>
      </div>
    </Card>
  );
}