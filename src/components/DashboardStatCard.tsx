import type { LucideIcon } from "lucide-react";
import AnimatedNumber from "./AnimatedNumber";

type DashboardStatCardProps = {
  Icon: LucideIcon;
  valoare: string | number;
  eticheta: string;
  culoare: string;
  darkMode?: boolean;
};

export default function DashboardStatCard({
  Icon,
  valoare,
  eticheta,
  culoare,
  darkMode = false,
}: DashboardStatCardProps) {
  return (
    <div
      className="card-hover"
      style={{
        background: darkMode
          ? "linear-gradient(180deg, #1e293b, #172033)"
          : "linear-gradient(180deg, #ffffff, #f8fafc)",
        padding: "24px 20px",
        borderRadius: "18px",
        textAlign: "center",
        border: darkMode
          ? "1px solid rgba(255, 255, 255, 0.08)"
          : "1px solid #e2e8f0",
        boxShadow: darkMode
          ? "0 8px 24px rgba(0, 0, 0, 0.25)"
          : "0 8px 24px rgba(15, 23, 42, 0.08)",
        minHeight: "150px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        transition:
          "transform 0.25s ease, box-shadow 0.25s ease, background 0.3s ease, border 0.3s ease",
      }}
    >
      <div
        style={{
          width: "58px",
          height: "58px",
          margin: "0 auto 12px",
          borderRadius: "16px",
          background: `${culoare}18`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Icon size={30} color={culoare} strokeWidth={2.3} />
      </div>

      <strong
        style={{
          display: "block",
          fontSize: "30px",
          lineHeight: 1.1,
          color: culoare,
          marginBottom: "8px",
        }}
      >
        {typeof valoare === "number" ? (
          <AnimatedNumber value={valoare} />
        ) : (
          valoare
        )}
      </strong>

      <span
        style={{
          color: darkMode ? "#cbd5e1" : "#64748b",
          fontWeight: 600,
          fontSize: "14px",
          transition: "color 0.3s ease",
        }}
      >
        {eticheta}
      </span>
    </div>
  );
}