import Card from "../components/Card";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
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
type StatisticsProps = {
  darkMode: boolean;
  totalMinute: number;
  totalActivitati: number;
  mediaMinutePeActivitate: number;
  numarZileActive: number;
  activitatePreferata: string;
  dateActivitatiPreferate: {
  nume: string;
  minute: number;
}[];
};

export default function Statistics({
  darkMode,
  totalMinute,
  totalActivitati,
  mediaMinutePeActivitate,
  numarZileActive,
  activitatePreferata,
  dateActivitatiPreferate,
}: StatisticsProps) {
 return (
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
            transition: "background 0.3s ease, border 0.3s ease",
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
);
}