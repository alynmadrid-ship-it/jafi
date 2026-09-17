import type { ReactNode } from "react";

type CardProps = {
  titlu: string;
  children: ReactNode;
  darkMode?: boolean;
};

function Card({ titlu, children, darkMode = false }: CardProps) {
  return (
    <section
      className="card-hover"
      style={{
        background: darkMode ? "#1e293b" : "#ffffff",
        color: darkMode ? "#e2e8f0" : "#0f172a",
        padding: "22px",
        borderRadius: "16px",
        marginBottom: "16px",
        boxShadow: darkMode
          ? "0 6px 20px rgba(0, 0, 0, 0.25)"
          : "0 6px 20px rgba(0, 0, 0, 0.08)",
        border: darkMode
          ? "1px solid rgba(255, 255, 255, 0.08)"
          : "1px solid transparent",
        transition:
          "background 0.3s ease, color 0.3s ease, border 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <h2
        style={{
          marginTop: 0,
          color: darkMode ? "#93c5fd" : "#1e3a8a",
          transition: "color 0.3s ease",
        }}
      >
        {titlu}
      </h2>

      <div>{children}</div>
    </section>
  );
}

export default Card;