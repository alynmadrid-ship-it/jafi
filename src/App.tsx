import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import Header from "./components/Header";
import Card from "./components/Card";
import Statistics from "./pages/Statistics";
import ActivityForm from "./components/ActivityForm";
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
const [elevId, setElevId] = useState<number | null>(() => {
  const idSalvat = localStorage.getItem("elevId");
  return idSalvat ? Number(idSalvat) : null;
});
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
useEffect(() => {
  if (elevId === null) {
    return;
  }

  const incarcaActivitati = async () => {
    const { data, error } = await supabase
      .from("activitati")
      .select("*")
      .eq("elev_id", elevId)
      .order("data", { ascending: false });

    console.log("ACTIVITATI DIN SUPABASE:", data, error);
 if (!error && data) {
  const activitatiConvertite: Activitate[] = data.map((activitate) => ({
    id: activitate.id,
    nume: activitate.tip_activitate,
    durata: activitate.durata,
    data: activitate.data,
  }));

  setActivitati(activitatiConvertite);
}
  };

  incarcaActivitati();
}, [elevId]);
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
 async function adaugaActivitate(
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
 if (elevId) {
  const { error } = await supabase
    .from("activitati")
    .insert({
      elev_id: elevId,
      tip_activitate: nume,
      durata: durata,
      data: data,
    });

  console.log("SALVARE ACTIVITATE:", error);
}
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
    recordSerie={recordSerie}
    totalActivitati={totalActivitati}
    zileActive={zileActive}
   darkMode={darkMode}
nivelRealizare={nivelRealizare}
urmatorulNivel={urmatorulNivel}
progresNivel={progresNivel}
minuteRamaseNivel={minuteRamaseNivel}
ultimele28Zile={ultimele28Zile}
dateGraficSaptamanal={dateGraficSaptamanal}
zileCalendar={zileCalendar}
anulCurent={anulCurent}
lunaCurenta={lunaCurenta}
minutePeZiCalendar={minutePeZiCalendar}
textCautare={textCautare}
filtruPerioada={filtruPerioada}
activitatiFiltrate={activitatiFiltrate}
dateSortate={dateSortate}
activitatiGrupate={activitatiGrupate}
setTextCautare={setTextCautare}
setFiltruPerioada={setFiltruPerioada}
exportaPDF={exportaPDF}
editeazaActivitate={editeazaActivitate}
stergeActivitate={stergeActivitate}
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
{sectiuneActiva === "statistici" && (
  <Statistics
    darkMode={darkMode}
    totalMinute={totalMinute}
    totalActivitati={totalActivitati}
    mediaMinutePeActivitate={mediaMinutePeActivitate}
    numarZileActive={numarZileActive}
    activitatePreferata={activitatePreferata}
    dateActivitatiPreferate={dateActivitatiPreferate}
  />
)}
  
{sectiuneActiva === "setari" && (
  <Settings
    numeInitial={numeUtilizator}
    clasaInitiala={clasaUtilizator}
    onSalvare={async (nume, clasa) => {
  setNumeUtilizator(nume);
  setClasaUtilizator(clasa);

  localStorage.setItem("numeUtilizator", nume);
  localStorage.setItem("clasaUtilizator", clasa);

  if (elevId) {
    const { error } = await supabase
      .from("elevi")
      .update({
        nume: nume,
        clasa: clasa,
      })
      .eq("id", elevId);

    console.log("ACTUALIZARE ELEV:", error);
  } else {
    const { data, error } = await supabase
      .from("elevi")
      .insert({
        nume: nume,
        clasa: clasa,
      })
      .select("id")
      .single();

    if (data) {
      setElevId(data.id);
      localStorage.setItem("elevId", String(data.id));
    }

    console.log("CREARE ELEV:", data, error);
  }
}}
    darkMode={darkMode}
  />
  )}
  </div>
);
}

export default App;
