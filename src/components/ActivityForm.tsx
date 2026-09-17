import { useState, type FormEvent } from "react";
import { Plus, CalendarDays, Activity, Clock3 } from "lucide-react";
type ActivityFormProps = {
  onAdd: (nume: string, durata: number, data: string) => void;
  darkMode: boolean;
};

function ActivityForm({ onAdd, darkMode }: ActivityFormProps) {
  const [nume, setNume] = useState("");
  const [durata, setDurata] = useState("");
  const [data, setData] = useState(
  new Date().toISOString().split("T")[0]
);
const [mesajSucces, setMesajSucces] = useState(false);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const minute = Number(durata);

    if (!nume.trim() || minute <= 0) {
      return;
    }

    onAdd(nume.trim(), minute, data);
    setMesajSucces(true);
setTimeout(() => {
  setMesajSucces(false);
}, 2500);
    setNume("");
    setDurata("");
    setData(new Date().toISOString().split("T")[0]);
  }

  return (
  <>
    <style>
      {`
        @keyframes successPop {
          0% {
            opacity: 0;
            transform: translateY(-8px) scale(0.97);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
          .activity-add-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(37, 99, 235, 0.35) !important;
}

.activity-add-button:active {
  transform: translateY(0) scale(0.98);
}
      `}
    </style>

    <form
      onSubmit={handleSubmit}
     style={{
  background: darkMode ? "#1e293b" : "#ffffff",
  color: darkMode ? "#e2e8f0" : "#0f172a",
  padding: "20px",
  borderRadius: "12px",
  marginBottom: "20px",
  boxShadow: darkMode
    ? "0 6px 20px rgba(0,0,0,0.25)"
    : "0 6px 20px rgba(15,23,42,0.08)",
  border: darkMode
    ? "1px solid rgba(255,255,255,0.08)"
    : "1px solid #e2e8f0",
  transition:
    "background 0.3s ease, color 0.3s ease, border 0.3s ease, box-shadow 0.3s ease",
}} 
    >
      <h2>Adaugă activitate</h2>
      {mesajSucces && (

  <div
    style={{
      background: darkMode ? "#14532d" : "#dcfce7",
      color: darkMode ? "#86efac" : "#166534",
      border: darkMode
        ? "1px solid #22c55e"
        : "1px solid #86efac",
      padding: "12px 14px",
      borderRadius: "10px",
      marginBottom: "15px",
      fontWeight: 600,
      textAlign: "center",
      animation: "successPop 0.35s ease-out",
    }}
  >
    ✓ Activitatea a fost adăugată cu succes!
  </div>
)}
<div style={{ marginBottom: "15px" }}>
 <label
  htmlFor="data"
  style={{
    display: "flex",
    alignItems: "center",
    gap: "7px",
    fontWeight: 600,
  }}
>
  <CalendarDays size={18} color="#3b82f6" />
  Data activității
</label>

  <input
    id="data"
    type="date"
    value={data}
    onChange={(event) => setData(event.target.value)}
  style={{
  width: "100%",
  padding: "10px",
  marginTop: "6px",
  boxSizing: "border-box",
  borderRadius: "8px",
  border: darkMode
    ? "1px solid #475569"
    : "1px solid #cbd5e1",
  background: darkMode ? "#0f172a" : "#ffffff",
  color: darkMode ? "#e2e8f0" : "#0f172a",
  colorScheme: darkMode ? "dark" : "light",
  transition:
    "background 0.3s ease, color 0.3s ease, border 0.3s ease",
}}
  />
</div>
      <div style={{ marginBottom: "15px" }}>
        <label
  htmlFor="activitate"
  style={{
    display: "flex",
    alignItems: "center",
    gap: "7px",
    fontWeight: 600,
  }}
>
  <Activity size={18} color="#22c55e" />
  Activitate
</label>

        <input
        id="activitate"
type="text"
value={nume}
onChange={(event) => setNume(event.target.value)}
         style={{
  width: "100%",
  padding: "10px",
  marginTop: "6px",
  boxSizing: "border-box",
  borderRadius: "8px",
  border: darkMode
    ? "1px solid #475569"
    : "1px solid #cbd5e1",
  background: darkMode ? "#0f172a" : "#ffffff",
  color: darkMode ? "#e2e8f0" : "#0f172a",
  transition:
    "background 0.3s ease, color 0.3s ease, border 0.3s ease",
}}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
      <label
  htmlFor="durata"
  style={{
    display: "flex",
    alignItems: "center",
    gap: "7px",
    fontWeight: 600,
  }}
>
  <Clock3 size={18} color="#f59e0b" />
  Durată (minute)
</label>

        <input
  id="durata"
  type="number"
  min="1"
  value={durata}
  onChange={(event) => setDurata(event.target.value)}
  style={{
  width: "100%",
  padding: "10px",
  marginTop: "6px",
  boxSizing: "border-box",
  borderRadius: "8px",
  border: darkMode
    ? "1px solid #475569"
    : "1px solid #cbd5e1",
  background: darkMode ? "#0f172a" : "#ffffff",
  color: darkMode ? "#e2e8f0" : "#0f172a",
  transition:
    "background 0.3s ease, color 0.3s ease, border 0.3s ease",
}}
        />
      </div>

      <button
  type="submit"
  className="activity-add-button"
  style={{
    background: "linear-gradient(135deg, #2563eb, #1e3a8a)",
    color: "white",
    padding: "12px 20px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    width: "100%",
    boxShadow: "0 5px 14px rgba(37, 99, 235, 0.25)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  }}
>
  <Plus size={19} strokeWidth={2.5} />
  Adaugă activitate
</button>
        </form>
  </>
  );
}

export default ActivityForm;