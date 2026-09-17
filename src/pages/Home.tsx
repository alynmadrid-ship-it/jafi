import Card from "../components/Card";
import DashboardStatCard from "../components/DashboardStatCard";
import {
  Flame,
  Activity,
  CalendarDays,
  Trophy,
} from "lucide-react";
type HomeProps = {
  numeUtilizator: string;
  clasaUtilizator: string;
  totalMinute: number;
  procentProgres: number;
  serieCurenta: number;
  totalActivitati: number;
  zileActive: number;
  darkMode: boolean;
  nivelRealizare: {
    nume: string;
    culoare: string;
  };
};

export default function Home({
  numeUtilizator,
  clasaUtilizator,
  totalMinute,
  procentProgres,
  serieCurenta,
  totalActivitati,
  zileActive,
   darkMode,
  nivelRealizare,
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
    </>
  );
}