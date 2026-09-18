import Card from "../components/Card";
import DashboardStatCard from "../components/DashboardStatCard";
import {
  Flame,
  Activity,
  CalendarDays,
  Trophy,
  Pencil,
  Trash2,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";
type Activitate = {
  id: number;
  nume: string;
  durata: number;
  data: string;
};
type HomeProps = {
  numeUtilizator: string;
  clasaUtilizator: string;
  totalMinute: number;
  procentProgres: number;
  serieCurenta: number;
  recordSerie: number;
  totalActivitati: number;
  zileActive: number;
  darkMode: boolean;
  nivelRealizare: {
  nume: string;
  culoare: string;
  ultimele28Zile: {
  data: string;
  minute: number;
  dateGraficSaptamanal: {
  zi: string;
  minute: number;
  zileCalendar: (number | null)[];
anulCurent: number;
lunaCurenta: number;
minutePeZiCalendar: Record<string, number>;
textCautare: string;
filtruPerioada: string;
activitatiFiltrate: Activitate[];
dateSortate: string[];
activitatiGrupate: Record<string, Activitate[]>;
setTextCautare: (text: string) => void;
setFiltruPerioada: (perioada: string) => void;
exportaPDF: () => void;
editeazaActivitate: (id: number) => void;
stergeActivitate: (id: number) => void;
}[];
}[];
};
urmatorulNivel: number | null;
progresNivel: number;
minuteRamaseNivel: number;
};

export default function Home({
  numeUtilizator,
  clasaUtilizator,
  totalMinute,
  procentProgres,
  serieCurenta,
  recordSerie,
  totalActivitati,
  zileActive,
   darkMode,
nivelRealizare,
urmatorulNivel,
progresNivel,
minuteRamaseNivel,
ultimele28Zile,
dateGraficSaptamanal,
zileCalendar,
anulCurent,
lunaCurenta,
minutePeZiCalendar,
textCautare,
filtruPerioada,
activitatiFiltrate,
dateSortate,
activitatiGrupate,
setTextCautare,
setFiltruPerioada,
exportaPDF,
editeazaActivitate,
stergeActivitate,
}: HomeProps) {
  return (
    <>
      <Card titlu="Bun venit în JAFI" darkMode={darkMode}>
        <div
          style={{
            padding: "10px",
          }}
        >
          <h2
            style={{
              marginTop: 0,
              marginBottom: "6px",
              color: "#123A6F",
            }}
          >
            👋 Bun venit, {numeUtilizator || "utilizator"}!
          </h2>

          <p
            style={{
              marginTop: 0,
              color: "#64748b",
              fontWeight: 600,
            }}
          >
            {clasaUtilizator}
          </p>
        </div>
      </Card>

      <Card titlu="Progres săptămânal" darkMode={darkMode}>
        <h3
          style={{
            marginTop: 0,
            color: "#1e3a8a",
          }}
        >
          {totalMinute} / 420 minute
        </h3>

        <div
  style={{
    width: "100%",
    maxWidth: "700px",
    height: "12px",
    margin: "16px auto 0",
    background: "#e2e8f0",
    borderRadius: "999px",
    overflow: "hidden",
  }}
>
  <div
    style={{
      width: `${procentProgres}%`,
      height: "100%",
      background: "linear-gradient(90deg, #2563eb, #38bdf8)",
      borderRadius: "999px",
      transition: "width 0.6s ease",
    }}
  />
</div>

        <p
          style={{
            marginBottom: 0,
            fontWeight: "bold",
            color: "#334155",
          }}
        >
          🎯 {procentProgres}% din obiectiv
        </p>
      </Card>

      <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "16px",
    marginBottom: "16px",
  }}
>
  <DashboardStatCard
  Icon={Flame}
  valoare={serieCurenta}
  eticheta="Zile consecutive"
  culoare="#ea580c"
  darkMode={darkMode}
/>

  <DashboardStatCard
    Icon={Activity}
    valoare={totalActivitati}
    eticheta="Activități"
    culoare="#1e3a8a"
    darkMode={darkMode}
  />

  <DashboardStatCard
  Icon={CalendarDays}
    valoare={zileActive}
    eticheta="Zile active"
    culoare="#16a34a"
    darkMode={darkMode}
  />

  <DashboardStatCard
    Icon={Trophy}
    valoare={nivelRealizare.nume.replace(/^[^\p{L}\p{N}]+/u, "")}
    eticheta="Nivel actual"
    culoare={nivelRealizare.culoare}
    darkMode={darkMode}
  />
</div>
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
            color:
              minuteZi > 0
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
    </>
  );
}