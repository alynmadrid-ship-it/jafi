import { useState, useEffect } from "react";
import { Trash2, Pencil } from "lucide-react";
import Header from "./components/Header";
import Card from "./components/Card";
import ActivityForm from "./components/ActivityForm";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
Pie,
Cell,
Legend,
} from "recharts";
type Activitate = {
  id: number;
  nume: string;
  durata: number;
  data: string;
};
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
  return localStorage.getItem("darkMode") === "true";
});
const [numeUtilizator, setNumeUtilizator] = useState(
  () => localStorage.getItem("numeUtilizator") || ""
);

const [clasaUtilizator, setClasaUtilizator] = useState(
  () => localStorage.getItem("clasaUtilizator") || "Clasa a V-a"
);
  const [sectiuneActiva, setSectiuneActiva] = useState<
  "acasa" | "activitate" | "statistici" | "realizari" | "setari"
>("acasa");
 const [activitati , setActivitati] = useState<Activitate[]>(() => {
  const salvate = localStorage.getItem("activitati");
  if (!salvate) {
    return [];
  }

  try {
  return JSON.parse(salvate);
} catch {
  return [];
}
});
useEffect(() => {
  localStorage.setItem("darkMode", String(darkMode));
}, [darkMode]);
useEffect(() => {
  localStorage.setItem("activitati", JSON.stringify(activitati));
}, [activitati]);
const [textCautare, setTextCautare] = useState("");
const [filtruPerioada, setFiltruPerioada] = useState("toate");
  const azi = new Date();

const inceputSaptamana = new Date(azi);
const ziuaSaptamanii = azi.getDay();
const diferentaPanaLuni = ziuaSaptamanii === 0 ? -6 : 1 - ziuaSaptamanii;

inceputSaptamana.setDate(azi.getDate() + diferentaPanaLuni);
inceputSaptamana.setHours(0, 0, 0, 0);

const sfarsitSaptamana = new Date(inceputSaptamana);
sfarsitSaptamana.setDate(inceputSaptamana.getDate() + 6);
sfarsitSaptamana.setHours(23, 59, 59, 999);

const activitatiSaptamanaCurenta = activitati.filter((activitate) => {
  if (!activitate.data) {
    return false;
  }

  const dataActivitatii = new Date(`${activitate.data}T12:00:00`);

  return (
    dataActivitatii >= inceputSaptamana &&
    dataActivitatii <= sfarsitSaptamana
  );
});

const totalMinute = activitatiSaptamanaCurenta.reduce(
  (total, activitate) => total + activitate.durata,
  0
);
const procentProgres = Math.min(
  Math.round((totalMinute / 420) * 100),
  100
);
let mesajMotivational = "";

if (procentProgres >= 100) {
  mesajMotivational = "Felicitări! Ai atins obiectivul săptămânal!";
} else if (procentProgres >= 75) {
  mesajMotivational = "Ești foarte aproape de obiectiv!";
} else if (procentProgres >= 50) {
  mesajMotivational = "Ai depășit jumătatea obiectivului!";
} else if (procentProgres >= 25) {
  mesajMotivational = "Ai început bine. Menține ritmul!";
} else {
  mesajMotivational = "Continuă, fiecare minut contează!";
}
const zileActive = new Set(
  activitatiSaptamanaCurenta.map((activitate) => activitate.data)
).size;

const mediaPeZi =
  zileActive > 0 ? Math.round(totalMinute / zileActive) : 0;

const minuteRamase = Math.max(420 - totalMinute, 0);
const zileSaptamana = Array.from({ length: 7 }, (_, index) => {
  const dataZilei = new Date(inceputSaptamana);
  dataZilei.setDate(inceputSaptamana.getDate() + index);

  const dataISO = [
    dataZilei.getFullYear(),
    String(dataZilei.getMonth() + 1).padStart(2, "0"),
    String(dataZilei.getDate()).padStart(2, "0"),
  ].join("-");

  const minute = activitatiSaptamanaCurenta
    .filter((activitate) => activitate.data === dataISO)
    .reduce(
      (total, activitate) => total + activitate.durata,
      0
    );

  return {
    zi: dataZilei.toLocaleDateString("ro-RO", {
      weekday: "short",
    }),
    minute,
  };
});
const nivelRealizare =
  totalMinute >= 600
    ? { nume: "💎 Platinum", culoare: "#7c3aed" }
    : totalMinute >= 420
    ? { nume: "🥇 Aur", culoare: "#f59e0b" }
    : totalMinute >= 240
    ? { nume: "🥈 Argint", culoare: "#94a3b8" }
    : totalMinute >= 120
    ? { nume: "🥉 Bronz", culoare: "#b45309" }
    : { nume: "🚶 Începător", culoare: "#2563eb" };
const urmatorulNivel =
  totalMinute < 120
    ? 120
    : totalMinute < 240
    ? 240
    : totalMinute < 420
    ? 420
    : totalMinute < 600
    ? 600
    : null;

const minuteRamaseNivel =
  urmatorulNivel === null ? 0 : urmatorulNivel - totalMinute;
  const pragNivelCurent =
  totalMinute >= 600
    ? 600
    : totalMinute >= 420
    ? 420
    : totalMinute >= 240
    ? 240
    : totalMinute >= 120
    ? 120
    : 0;

const pragNivelUrmator = urmatorulNivel ?? 600;

const progresNivel =
  pragNivelUrmator === pragNivelCurent
    ? 100
    : ((totalMinute - pragNivelCurent) /
        (pragNivelUrmator - pragNivelCurent)) *
      100;
      
const dateGraficSaptamanal = zileSaptamana;
const activitatiGrupate = activitati.reduce<Record<string, Activitate[]>>(
  (grupuri, activitate) => {
    const dataActivitatii = activitate.data || "Fără dată";

    if (!grupuri[dataActivitatii]) {
      grupuri[dataActivitatii] = [];
    }

    grupuri[dataActivitatii].push(activitate);

    return grupuri;
  },
  {}
);

const dateSortate = Object.keys(activitatiGrupate).sort((a, b) =>
  b.localeCompare(a)
);
 function adaugaActivitate(
  nume: string,
  durata: number,
  data: string
) {
    const activitateNoua: Activitate = {
  id: Date.now(),
  nume,
  durata,
  data,
};
    
    setActivitati((listaVeche) => [activitateNoua, ...listaVeche]);
  }
 function stergeActivitate(id: number) {
  const confirmare = window.confirm(
    "Sigur dorești să ștergi această activitate?"
  );

  if (!confirmare) {
    return;
  }

  setActivitati((listaVeche) =>
    listaVeche.filter((activitate) => activitate.id !== id)
  );
}
function editeazaActivitate(id: number) {
  const activitate = activitati.find((element) => element.id === id);

  if (!activitate) {
    return;
  }

  const numeNou = window.prompt(
    "Modifică numele activității:",
    activitate.nume
  );

  if (numeNou === null || !numeNou.trim()) {
    return;
  }

  const durataNouaText = window.prompt(
    "Modifică durata în minute:",
    String(activitate.durata)
  );

  if (durataNouaText === null) {
    return;
  }

  const durataNoua = Number(durataNouaText);

  if (durataNoua <= 0 || Number.isNaN(durataNoua)) {
    return;
  }

  setActivitati((listaVeche) =>
    listaVeche.map((element) =>
      element.id === id
        ? {
            ...element,
            nume: numeNou.trim(),
            durata: durataNoua,
          }
        : element
    )
  );
}
function exportaPDF() {
  const documentPDF = new jsPDF();

  documentPDF.setFontSize(18);
  documentPDF.text("Jurnalul activitatilor fizice", 14, 20);

  documentPDF.setFontSize(11);
  documentPDF.text(
    `Data generarii: ${new Date().toLocaleDateString("ro-RO")}`,
    14,
    30
  );

  autoTable(documentPDF, {
    startY: 40,
    head: [["Activitate", "Durata", "Data"]],
    body: activitatiFiltrate.map((activitate) => [
      activitate.nume,
      `${activitate.durata} minute`,
      activitate.data,
    ]),
  });

  documentPDF.save("jurnal-activitati.pdf");
}
useEffect(() => {
  localStorage.setItem(
    "activitati",
    JSON.stringify(activitati)
  );
}, [activitati]);
const astazi = new Date();

const anulCurent = astazi.getFullYear();
const lunaCurenta = astazi.getMonth();

const primaZiDinLuna = new Date(anulCurent, lunaCurenta, 1);

const ultimaZiDinLuna = new Date(
  anulCurent,
  lunaCurenta + 1,
  0
);

const numarZileLuna = ultimaZiDinLuna.getDate();

const ziuaSaptamaniiPrimaZi =
  primaZiDinLuna.getDay() === 0
    ? 6
    : primaZiDinLuna.getDay() - 1;

const zileCalendar = [
  ...Array(ziuaSaptamaniiPrimaZi).fill(null),
  ...Array.from(
    { length: numarZileLuna },
    (_, index) => index + 1
  ),
];
const minutePeZiCalendar = activitati.reduce<Record<string, number>>(
  (rezultat, activitate) => {
    if (!activitate.data) {
      return rezultat;
    }

    rezultat[activitate.data] =
      (rezultat[activitate.data] || 0) + activitate.durata;

    return rezultat;
  },
  {}
);
const totalActivitati = activitati.length;
const realizari = [
  {
    nume: "🎉 Prima activitate",
    obtinuta: totalActivitati >= 1,
  },
  {
    nume: "🥉 120 minute",
    obtinuta: totalMinute >= 120,
  },
  {
    nume: "🥈 240 minute",
    obtinuta: totalMinute >= 240,
  },
  {
    nume: "🥇 Obiectiv OMS atins",
    obtinuta: totalMinute >= 420,
  },
  {
    nume: "💎 Platinum",
    obtinuta: totalMinute >= 600,
  },
];
const dateActiveUnice = [
  ...new Set(
    activitati
      .filter((activitate) => activitate.data)
      .map((activitate) => activitate.data)
  ),
].sort((dataA, dataB) => dataB.localeCompare(dataA));

let serieCurenta = 0;
let recordSerie = 0;
let serieTemporara = 0;
if (dateActiveUnice.length > 0) {
  const astazi = new Date();
  astazi.setHours(12, 0, 0, 0);

  const ieri = new Date(astazi);
  ieri.setDate(ieri.getDate() - 1);

  const ultimaDataActiva = new Date(`${dateActiveUnice[0]}T12:00:00`);

  const diferentaFataDeAstazi = Math.round(
    (astazi.getTime() - ultimaDataActiva.getTime()) /
      (1000 * 60 * 60 * 24)
  );

  if (diferentaFataDeAstazi === 0 || diferentaFataDeAstazi === 1) {
    serieCurenta = 1;
 serieTemporara = 1;
recordSerie = 1;
    for (let index = 1; index < dateActiveUnice.length; index++) {
      const dataAnterioara = new Date(
        `${dateActiveUnice[index - 1]}T12:00:00`
      );

      const dataCurenta = new Date(
        `${dateActiveUnice[index]}T12:00:00`
      );

      const diferentaZile = Math.round(
        (dataAnterioara.getTime() - dataCurenta.getTime()) /
          (1000 * 60 * 60 * 24)
      );

      if (diferentaZile === 1) {
  serieCurenta++;
  serieTemporara++;
} else {
  if (serieTemporara > recordSerie) {
    recordSerie = serieTemporara;
  }
  serieTemporara = 1;
  break;
}
    }
  }
if (serieTemporara > recordSerie) {
    recordSerie = serieTemporara;
}
}
const mediaMinutePeActivitate =
  totalActivitati === 0
    ? 0
    : Math.round(totalMinute / totalActivitati);

const numarZileActive = Object.keys(minutePeZiCalendar).length;
const ultimele28Zile = Array.from({ length: 28 }, (_, index) => {
  const data = new Date();
  data.setDate(data.getDate() - (27 - index));

  const dataFormatata = data.toISOString().split("T")[0];

  return {
    data: dataFormatata,
    minute: minutePeZiCalendar[dataFormatata] || 0,
  };
});
const activitatePreferata =
  activitati.length === 0
    ? "-"
    : Object.entries(
        activitati.reduce<Record<string, number>>((rezultat, activitate) => {
          rezultat[activitate.nume] =
            (rezultat[activitate.nume] || 0) + 1;
          return rezultat;
        }, {})
      ).sort((a, b) => b[1] - a[1])[0][0];

      const dateActivitatiPreferate = Object.entries(
  activitati.reduce<Record<string, number>>((rezultat, activitate) => {
    rezultat[activitate.nume] =
      (rezultat[activitate.nume] || 0) + activitate.durata;

    return rezultat;
  }, {})
).map(([nume, minute]) => ({
  nume,
  minute,
}));
const COLORS = [
  "#2563eb",
  "#16a34a",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#ec4899",
  "#84cc16",
];
      const activitatiPerioada = activitati.filter((activitate) => {
  if (filtruPerioada === "toate") {
    return true;
  }

  const data = new Date(activitate.data);

  if (filtruPerioada === "saptamana") {
    return data >= inceputSaptamana && data <= sfarsitSaptamana;
  }

  if (filtruPerioada === "luna") {
    return (
      data.getMonth() === azi.getMonth() &&
      data.getFullYear() === azi.getFullYear()
    );
  }

  return true;
});
      const activitatiFiltrate = activitatiPerioada.filter((activitate) =>
  activitate.nume
    .toLowerCase()
    .includes(textCautare.toLowerCase())
);
  return (
    <div
  style={{
    minHeight: "100vh",
    padding: "20px",
    background: darkMode ? "#0f172a" : "#f8fafc",
    color: darkMode ? "#e2e8f0" : "#0f172a",
    transition: "background 0.3s ease, color 0.3s ease",
  }}
>
      <Header
        titlu="Jurnalul Activităților Fizice Independente"
        subtitlu="Instrument pentru monitorizarea activității fizice a elevilor"
        onNavigare={setSectiuneActiva}
        sectiuneActiva={sectiuneActiva}
        darkMode={darkMode}
onToggleDarkMode={() => setDarkMode((valoare) => !valoare)}
      />

{sectiuneActiva === "acasa" && (
  <Home
    numeUtilizator={numeUtilizator}
    clasaUtilizator={clasaUtilizator}
    totalMinute={totalMinute}
    procentProgres={procentProgres}
    serieCurenta={serieCurenta}
    totalActivitati={totalActivitati}
    zileActive={zileActive}
    darkMode={darkMode}
    nivelRealizare={nivelRealizare}
  />
)}
      {sectiuneActiva === "activitate" && (
 <ActivityForm
  onAdd={adaugaActivitate}
  darkMode={darkMode}
/>
)}
{sectiuneActiva === "activitate" && (
      <Card titlu="Obiectiv săptămânal">
        <h3>{totalMinute} / 420 minute</h3>
<div
  style={{
    width: "100%",
    height: "18px",
    background: "#e5e7eb",
    borderRadius: "999px",
    overflow: "hidden",
    marginTop: "12px",
    marginBottom: "8px",
  }}
>
  <div
    style={{
      width: `${procentProgres}%`,
      height: "100%",
      background: "#2563eb",
      transition: "width 0.3s ease",
    }}
  />
</div>

<p style={{ fontWeight: "bold" }}>
  {procentProgres}% din obiectiv
</p>
<p
  style={{
    background: "#eff6ff",
    color: "#1e3a8a",
    padding: "12px",
    borderRadius: "10px",
    fontWeight: "bold",
    marginTop: "10px",
  }}
>
  {mesajMotivational}
</p>

  <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "18px",
    marginTop: "20px",
  }}
>
  <div
    className="card-hover"
    style={{
      background: "white",
      border: "1px solid #e2e8f0",
      borderRadius: "16px",
      padding: "20px",
      textAlign: "center",
      boxShadow: "0 6px 18px rgba(0, 0, 0, 0.08)",
    }}
  >
    <div style={{ fontSize: "30px", marginBottom: "8px" }}>🔥</div>

    <strong
      style={{
        display: "block",
        fontSize: "30px",
        color: "#1e3a8a",
        marginBottom: "4px",
      }}
    >
      {zileActive}
    </strong>

    <div style={{ color: "#64748b", fontWeight: 600 }}>
      Zile active
    </div>
  </div>

  <div
    className="card-hover"
    style={{
      background: "white",
      border: "1px solid #e2e8f0",
      borderRadius: "16px",
      padding: "20px",
      textAlign: "center",
      boxShadow: "0 6px 18px rgba(0, 0, 0, 0.08)",
    }}
  >
    <div style={{ fontSize: "30px", marginBottom: "8px" }}>⏱️</div>

    <strong
      style={{
        display: "block",
        fontSize: "30px",
        color: "#1e3a8a",
        marginBottom: "4px",
      }}
    >
      {totalMinute}
    </strong>

    <div style={{ color: "#64748b", fontWeight: 600 }}>
      Minute totale
    </div>
  </div>

  <div
    className="card-hover"
    style={{
      background: "white",
      border: "1px solid #e2e8f0",
      borderRadius: "16px",
      padding: "20px",
      textAlign: "center",
      boxShadow: "0 6px 18px rgba(0, 0, 0, 0.08)",
    }}
  >
    <div style={{ fontSize: "30px", marginBottom: "8px" }}>📊</div>

    <strong
      style={{
        display: "block",
        fontSize: "30px",
        color: "#1e3a8a",
        marginBottom: "4px",
      }}
    >
      {mediaPeZi}
    </strong>

    <div style={{ color: "#64748b", fontWeight: 600 }}>
      Media pe zi
    </div>
  </div>

  <div
    className="card-hover"
    style={{
      background: "white",
      border: "1px solid #e2e8f0",
      borderRadius: "16px",
      padding: "20px",
      textAlign: "center",
      boxShadow: "0 6px 18px rgba(0, 0, 0, 0.08)",
    }}
  >
    <div style={{ fontSize: "30px", marginBottom: "8px" }}>🎯</div>

    <strong
      style={{
        display: "block",
        fontSize: "30px",
        color: "#1e3a8a",
        marginBottom: "4px",
      }}
    >
      {minuteRamase}
    </strong>

    <div style={{ color: "#64748b", fontWeight: 600 }}>
      Minute rămase
    </div>
  </div>
</div>
        <p>
          Înregistrează activitățile fizice efectuate și urmărește progresul
          săptămânal.
        </p>
      </Card>
)}
{sectiuneActiva === "acasa" && (
  <Card titlu="Nivel de activitate" darkMode={darkMode}>
    <div
      className="card-hover"
      style={{
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
        padding: "28px 24px",
        background: darkMode
  ? `linear-gradient(135deg, ${nivelRealizare.culoare}18, #172033 55%, #0f172a)`
  : `linear-gradient(135deg, ${nivelRealizare.culoare}12, #ffffff 55%, #f8fafc)`,
        borderRadius: "20px",
        border: `1px solid ${nivelRealizare.culoare}30`,
        boxShadow: "0 10px 28px rgba(15, 23, 42, 0.08)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-45px",
          right: "-45px",
          width: "130px",
          height: "130px",
          borderRadius: "50%",
          background: `${nivelRealizare.culoare}12`,
        }}
      />

      <span
        style={{
          display: "inline-block",
          padding: "6px 12px",
          marginBottom: "12px",
          borderRadius: "999px",
          background: `${nivelRealizare.culoare}15`,
          color: nivelRealizare.culoare,
          fontSize: "13px",
          fontWeight: 700,
          letterSpacing: "0.4px",
        }}
      >
        NIVEL ACTUAL
      </span>

      <div
        style={{
          fontSize: "36px",
          lineHeight: 1.1,
          fontWeight: 800,
          color: nivelRealizare.culoare,
          marginBottom: "18px",
        }}
      >
        {nivelRealizare.nume}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "8px",
          fontSize: "14px",
          fontWeight: 700,
          color: darkMode ? "#cbd5e1" : "#475569",
        }}
      >
        <span>Progres</span>

        <span style={{ color: nivelRealizare.culoare }}>
          {Math.round(Math.min(Math.max(progresNivel, 0), 100))}%
        </span>
      </div>

      <div
        style={{
          width: "100%",
          height: "12px",
         background: darkMode ? "#334155" : "#e2e8f0",
          borderRadius: "999px",
          overflow: "hidden",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            width: `${Math.min(Math.max(progresNivel, 0), 100)}%`,
            height: "100%",
            background: `linear-gradient(90deg, ${nivelRealizare.culoare}, ${nivelRealizare.culoare}bb)`,
            borderRadius: "999px",
            transition: "width 0.6s ease",
          }}
        />
      </div>

      <p
        style={{
          fontSize: "15px",
          lineHeight: 1.6,
          color: darkMode ? "#cbd5e1" : "#475569",
          margin: 0,
        }}
      >
        {urmatorulNivel === null
          ? "Felicitări! Ai atins nivelul maxim."
          : `Mai ai ${minuteRamaseNivel} minute până la următorul nivel.`}
      </p>
    </div>
  </Card>
)}
{sectiuneActiva === "realizari" && (
<Card titlu="Realizări" darkMode={darkMode}>
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
      gap: "14px",
    }}
  >
    {realizari.map((realizare, index) => (
      <div
        key={index}
        style={{
  padding: "16px",
  borderRadius: "12px",
  textAlign: "center",
  fontWeight: "bold",

  background: realizare.obtinuta
    ? darkMode
      ? "#14532d"
      : "#dcfce7"
    : darkMode
      ? "#0f172a"
      : "#f1f5f9",

  color: realizare.obtinuta
    ? darkMode
      ? "#86efac"
      : "#166534"
    : darkMode
      ? "#94a3b8"
      : "#64748b",

  border: realizare.obtinuta
    ? darkMode
      ? "1px solid #22c55e"
      : "1px solid #86efac"
    : darkMode
      ? "1px solid #475569"
      : "1px solid #cbd5e1",

  opacity: realizare.obtinuta ? 1 : 0.7,

  transition:
    "background 0.3s ease, color 0.3s ease, border 0.3s ease",
}}
      >
        {realizare.nume}
      </div>
    ))}
  </div>
</Card>
)}
{sectiuneActiva === "acasa" && (
<Card titlu="Serie de activitate" darkMode={darkMode}>
  <div
    style={{
      textAlign: "center",
      padding: "20px",
    }}
  >
    <div
      style={{
        fontSize: "42px",
        fontWeight: "bold",
        color: serieCurenta > 0 ? "#ea580c" : "#94a3b8",
        marginBottom: "8px",
      }}
    >
      🔥 {serieCurenta}
    </div>

    <div
      style={{
        fontSize: "18px",
        fontWeight: "bold",
        color: darkMode ? "#93c5fd" : "#1e3a8a",
      }}
    >
      {serieCurenta === 1 ? "zi consecutivă" : "zile consecutive"}
    </div>
<div
  style={{
    marginTop: "14px",
    fontSize: "17px",
    fontWeight: "bold",
    color: "#7c3aed",
  }}
>
  🏆 Record personal: {recordSerie}{" "}
  {recordSerie === 1 ? "zi" : "zile"}
</div>
    <p
      style={{
        marginTop: "10px",
        marginBottom: 0,
        color: darkMode ? "#cbd5e1" : "#64748b",
      }}
    >
      {serieCurenta > 0
        ? "Continuă seria și înregistrează activitate în fiecare zi!"
        : "Înregistrează o activitate astăzi pentru a începe seria."}
    </p>
  </div>
</Card>
)}
{sectiuneActiva === "acasa" && (
<Card titlu="Calendarul activităților" darkMode={darkMode}>
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)",
      gap: "8px",
    }}
  >
    {ultimele28Zile.map((zi) => {
     let culoare = darkMode ? "#1e293b" : "#e2e8f0";

      if (zi.minute > 0 && zi.minute < 30) {
        culoare = "#bbf7d0";
    } else if (zi.minute >= 30 && zi.minute < 60) {
  culoare = "#fde68a";
} else if (zi.minute >= 60 && zi.minute < 90) {
        culoare = "#fdba74";
      } else if (zi.minute >= 90) {
        culoare = "#fca5a5";
      }

      return (
        <div
          key={zi.data}
          title={`${zi.data}: ${zi.minute} minute`}
          style={{
            background: culoare,
            borderRadius: "8px",
            padding: "10px 4px",
            textAlign: "center",
            fontSize: "12px",
            fontWeight: "bold",
            color:
  zi.minute === 0 && darkMode
    ? "#e2e8f0"
    : "#334155",
          }}
        >
          {new Date(`${zi.data}T12:00:00`).getDate()}
        </div>
      );
    })}
  </div>

  <div
    style={{
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: "12px",
      marginTop: "16px",
      fontSize: "12px",
      color: darkMode ? "#cbd5e1" : "#64748b",
    }}
  >
    <span>⬜ 0 min</span>
    <span>🟩 1–29 min</span>
    <span>🟨 30–59 min</span>
    <span>🟧 60–89 min</span>
    <span>🟥 90+ min</span>
  </div>
</Card>
)}
{sectiuneActiva === "acasa" && (
<Card
  titlu="Activitatea din această săptămână"
  darkMode={darkMode}
>
  {dateGraficSaptamanal.length === 0 ? (
    <p>Nu există activități înregistrate în această săptămână.</p>
  ) : (
   <div
  style={{
    width: "100%",
    height: "260px",
    marginBottom: "30px",
  }}
>
  <ResponsiveContainer width="100%" height="100%">
        <BarChart data={dateGraficSaptamanal}>
          <CartesianGrid
  strokeDasharray="3 3"
  vertical={false}
  stroke={darkMode ? "#334155" : "#e2e8f0"}
/>
          <XAxis
  dataKey="zi"
  tick={{ fill: darkMode ? "#cbd5e1" : "#64748b" }}
  axisLine={{ stroke: darkMode ? "#475569" : "#cbd5e1" }}
  tickLine={{ stroke: darkMode ? "#475569" : "#cbd5e1" }}
/>

<YAxis
  tick={{ fill: darkMode ? "#cbd5e1" : "#64748b" }}
  axisLine={{ stroke: darkMode ? "#475569" : "#cbd5e1" }}
  tickLine={{ stroke: darkMode ? "#475569" : "#cbd5e1" }}
/>
          <Tooltip
  contentStyle={{
    background: darkMode ? "#0f172a" : "#ffffff",
    border: darkMode
      ? "1px solid #475569"
      : "1px solid #e2e8f0",
    borderRadius: "10px",
    color: darkMode ? "#e2e8f0" : "#0f172a",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  }}
  labelStyle={{
    color: darkMode ? "#93c5fd" : "#1e3a8a",
    fontWeight: "bold",
  }}
/>
          <Bar
  dataKey="minute"
  fill="#2563eb"
  radius={[8, 8, 0, 0]}
/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )}
  </Card>
  )}
  {sectiuneActiva === "acasa" && (
  <Card titlu="Calendarul activităților" darkMode={darkMode}>
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)",
      gap: "8px",
      textAlign: "center",
    }}
  >
    {["L", "Ma", "Mi", "J", "V", "S", "D"].map((zi) => (
      <strong key={zi}>{zi}</strong>
    ))}

    {zileCalendar.map((zi, index) => {
  if (!zi) {
    return <div key={index}></div>;
  }

  const dataZi = [
    anulCurent,
    String(lunaCurenta + 1).padStart(2, "0"),
    String(zi).padStart(2, "0"),
  ].join("-");

  const minuteZi = minutePeZiCalendar[dataZi] || 0;

  let culoareFundal = darkMode ? "#0f172a" : "#ffffff";
  if (minuteZi >= 60) {
    culoareFundal = "#bbf7d0";
  } else if (minuteZi > 0) {
    culoareFundal = "#fef08a";
  }

  return (
    <div
      key={index}
      title={`${minuteZi} minute`}
      style={{
        height: "42px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: darkMode
  ? "1px solid #475569"
  : "1px solid #ddd",
        borderRadius: "8px",
        background: culoareFundal,
        color: minuteZi > 0
  ? "#0f172a"
  : darkMode
    ? "#e2e8f0"
    : "#0f172a",
        fontWeight: minuteZi > 0 ? "bold" : "normal",
      }}
    >
      {zi}
    </div>
  );
})}
  </div>
  </Card>
  )}
  {sectiuneActiva === "statistici" && (
    <>
  <Card titlu="Statistici" darkMode={darkMode}>
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
      gap: "16px",
    }}
  >
    {[
      {
  titlu: "Obiectiv",
  valoare: `${Math.round((totalMinute / 420) * 100)}%`,
},
      {
        titlu: "Activități",
        valoare: totalActivitati,
      },
      {
        titlu: "Minute totale",
        valoare: totalMinute,
      },
      {
        titlu: "Medie / activitate",
        valoare: `${mediaMinutePeActivitate} min`,
      },
      {
        titlu: "Zile active",
        valoare: numarZileActive,
      },
      {
        titlu: "Activitatea preferată",
        valoare: activitatePreferata,
      },
    ].map((statistica) => (
      <div
        key={statistica.titlu}
       style={{
  background: darkMode ? "#0f172a" : "#f8fafc",
  border: darkMode
    ? "1px solid #475569"
    : "1px solid #e2e8f0",
  borderRadius: "12px",
  padding: "20px",
  textAlign: "center",
  transition:
    "background 0.3s ease, border 0.3s ease",
}} 
      >
        <div
          style={{
  fontSize: "14px",
  color: darkMode ? "#cbd5e1" : "#64748b",
  marginBottom: "8px",
  transition: "color 0.3s ease",
}}
        >
          {statistica.titlu}
        </div>

        <div
          style={{
  fontSize: "26px",
  fontWeight: "bold",
  color: darkMode ? "#93c5fd" : "#1e3a8a",
  transition: "color 0.3s ease",
}}
        >
          {statistica.valoare}
        </div>
      </div>
        ))}
  </div>
</Card>
  

<Card titlu="Distribuția activităților" darkMode={darkMode}>
  <ResponsiveContainer width="100%" height={320}>
    <PieChart>
      <Pie
  data={dateActivitatiPreferate}
  dataKey="minute"
  nameKey="nume"
  cx="50%"
  cy="50%"
  outerRadius={120}
  label
>
  {dateActivitatiPreferate.map((_, index) => (
    <Cell
      key={`cell-${index}`}
      fill={COLORS[index % COLORS.length]}
    />
  ))}
</Pie>
      <Tooltip />
      <Legend
  wrapperStyle={{
    color: darkMode ? "#e2e8f0" : "#334155",
    fontWeight: 500,
  }}
/>
    </PieChart>
  </ResponsiveContainer>
</Card>
</>
)}
{sectiuneActiva === "acasa" && (
     <Card titlu="Jurnalul activităților" darkMode={darkMode}>
      <button
  onClick={exportaPDF}
  style={{
    background: "#1e3a8a",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "12px 18px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginBottom: "16px",
  }}
>
  Exportă PDF
</button>
     <input
  type="text"
  placeholder="Caută o activitate..."
  value={textCautare}
  onChange={(event) => setTextCautare(event.target.value)}
  style={{
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  border: darkMode
    ? "1px solid #475569"
    : "1px solid #cbd5e1",
  borderRadius: "10px",
  fontSize: "16px",
  boxSizing: "border-box",
  background: darkMode ? "#0f172a" : "#ffffff",
  color: darkMode ? "#e2e8f0" : "#0f172a",
  transition:
    "background 0.3s ease, color 0.3s ease, border 0.3s ease",
}}
/>

<select
  value={filtruPerioada}
  onChange={(event) => setFiltruPerioada(event.target.value)}
  style={{
  width: "100%",
  padding: "10px",
  marginBottom: "20px",
  border: darkMode
    ? "1px solid #475569"
    : "1px solid #cbd5e1",
  borderRadius: "8px",
  fontSize: "16px",
  boxSizing: "border-box",
  background: darkMode ? "#0f172a" : "#ffffff",
  color: darkMode ? "#e2e8f0" : "#0f172a",
  colorScheme: darkMode ? "dark" : "light",
  transition:
    "background 0.3s ease, color 0.3s ease, border 0.3s ease",
}}
>
  <option value="toate">Toate activitățile</option>
  <option value="saptamana">Săptămâna curentă</option>
  <option value="luna">Luna curentă</option>
</select>
{activitatiFiltrate.length === 0 ? (
  <p>Nu există activități înregistrate.</p>
) : (
  <div>
    {dateSortate
  .filter(
    (data) =>
      activitatiGrupate[data].filter((activitate) =>
        activitate.nume
          .toLowerCase()
          .includes(textCautare.toLowerCase())
      ).length > 0
  )
  .map((data) => (
      <div
  key={data}
  style={{
  background: darkMode ? "#0f172a" : "#ffffff",
  color: darkMode ? "#e2e8f0" : "#0f172a",
  borderRadius: "12px",
  padding: "18px",
  marginBottom: "20px",
  boxShadow: darkMode
    ? "0 4px 14px rgba(0,0,0,0.25)"
    : "0 2px 10px rgba(0,0,0,0.08)",
  border: darkMode
    ? "1px solid #334155"
    : "1px solid #e5e7eb",
  transition:
    "background 0.3s ease, color 0.3s ease, border 0.3s ease, box-shadow 0.3s ease",
}}
>
        <h3
  style={{
  marginTop: 0,
  marginBottom: "16px",
  color: darkMode ? "#93c5fd" : "#1e3a8a",
  textAlign: "left",
  transition: "color 0.3s ease",
}}
>
  📅{" "}
  {data === "Fără dată"
    ? data
    : new Date(`${data}T12:00:00`).toLocaleDateString("ro-RO", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })}
</h3>

        <ul style={{ paddingLeft: "20px" }}>
          {activitatiGrupate[data]
  .filter((activitate) =>
    activitate.nume
      .toLowerCase()
      .includes(textCautare.toLowerCase())
  )
  .map((activitate) => (
            <li
              key={activitate.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "20px",
                marginBottom: "10px",
              }}
            >
              <div>
                <strong>{activitate.nume}</strong> — {activitate.durata} minute
              </div>

              <div style={{ display: "flex", gap: "8px" }}>
                <button
  type="button"
  onClick={() => editeazaActivitate(activitate.id)}
  title="Editează activitatea"
  style={{
    background: darkMode ? "#1e3a8a" : "#dbeafe",
    color: darkMode ? "#bfdbfe" : "#2563eb",
    border: darkMode
      ? "1px solid #1d4ed8"
      : "1px solid #bfdbfe",
    borderRadius: "8px",
    width: "34px",
    height: "34px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "transform 0.2s ease, background 0.2s ease",
  }}
>
  <Pencil size={17} />
</button>

                <button
  onClick={() => stergeActivitate(activitate.id)}
  title="Șterge activitatea"
  style={{
    background: darkMode ? "#7f1d1d" : "#fee2e2",
    color: darkMode ? "#fecaca" : "#dc2626",
    border: darkMode
      ? "1px solid #991b1b"
      : "1px solid #fecaca",
    borderRadius: "8px",
    width: "34px",
    height: "34px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "transform 0.2s ease, background 0.2s ease",
  }}
>
  <Trash2 size={17} />
</button>
              </div>
            </li>
          ))}
        </ul>
        <div
 style={{
  marginTop: "12px",
  textAlign: "right",
  fontWeight: "bold",
  color: darkMode ? "#60a5fa" : "#2563eb",
  borderTop: darkMode
    ? "1px solid #334155"
    : "1px solid #e5e7eb",
  paddingTop: "10px",
  transition: "color 0.3s ease, border 0.3s ease",
}}
>
  Total zi:{" "}
  {activitatiGrupate[data].reduce(
    (total, activitate) => total + activitate.durata,
    0
  )}{" "}
  minute
</div>
      </div>
    ))}
  </div>
)}
</Card>
)}
{sectiuneActiva === "setari" && (
  <Settings
    numeInitial={numeUtilizator}
    clasaInitiala={clasaUtilizator}
    onSalvare={(nume, clasa) => {
      setNumeUtilizator(nume);
      setClasaUtilizator(clasa);

      localStorage.setItem("numeUtilizator", nume);
      localStorage.setItem("clasaUtilizator", clasa);
    }}
    darkMode={darkMode}
  />
)}
  </div>
);
}

export default App;
