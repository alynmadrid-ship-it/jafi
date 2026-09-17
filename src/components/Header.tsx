import type { CSSProperties } from "react";

import {
  House,
  CirclePlus,
  ChartNoAxesColumnIncreasing,
  Trophy,
  Settings2,
  BookOpen,
  Moon,
  Sun,
} from "lucide-react";

type Sectiune =
  | "acasa"
  | "activitate"
  | "statistici"
  | "realizari"
  | "setari";

type HeaderProps = {
  titlu: string;
  subtitlu: string;
  onNavigare: (sectiune: Sectiune) => void;
  sectiuneActiva: Sectiune;
  darkMode: boolean;
onToggleDarkMode: () => void;
};

function Header({
  titlu,
  subtitlu,
  onNavigare,
  sectiuneActiva,
  darkMode,
  onToggleDarkMode,
}: HeaderProps) {
  const stilButon = (activ: boolean): CSSProperties => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    minWidth: "128px",
    padding: "11px 18px",
    background: activ
      ? "#ffffff"
      : "rgba(255, 255, 255, 0.1)",
    color: activ ? "#1e3a8a" : "#ffffff",
    border: activ
      ? "1px solid #ffffff"
      : "1px solid rgba(255, 255, 255, 0.22)",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 700,
    boxShadow: activ
      ? "0 10px 24px rgba(15, 23, 42, 0.18)"
      : "none",
    transform: activ ? "translateY(-2px)" : "translateY(0)",
      transition: "all 0.25s cubic-bezier(.4,0,.2,1)",
  });
const stilHover = (activ: boolean): CSSProperties => ({
  transform: activ ? "translateY(-2px)" : "translateY(-4px) scale(1.03)",
  boxShadow: "0 14px 28px rgba(15,23,42,0.18)",
});
  return (
    <header
      style={{
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(135deg, #0f2f57 0%, #123a6f 45%, #2563eb 100%)",
        color: "#ffffff",
        padding: "44px 24px 28px",
        textAlign: "center",
        borderRadius: "24px",
        marginBottom: "30px",
        boxShadow: "0 18px 40px rgba(37, 99, 235, 0.24)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-90px",
          right: "-70px",
          width: "240px",
          height: "240px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.08)",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: "-120px",
          left: "-80px",
          width: "280px",
          height: "280px",
          borderRadius: "50%",
          background: "rgba(56, 189, 248, 0.1)",
        }}
      />
<button
  type="button"
  onClick={onToggleDarkMode}
  title={darkMode ? "Activează tema luminoasă" : "Activează tema întunecată"}
  aria-label={
    darkMode ? "Activează tema luminoasă" : "Activează tema întunecată"
  }
  style={{
    position: "absolute",
    top: "18px",
    right: "18px",
    zIndex: 2,
    width: "44px",
    height: "44px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "14px",
    border: "1px solid rgba(255, 255, 255, 0.25)",
    background: "rgba(255, 255, 255, 0.12)",
    color: "#ffffff",
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(15, 23, 42, 0.16)",
    transition: "transform 0.25s ease, background 0.25s ease",
  }}
>
  {darkMode ? (
    <Sun size={21} strokeWidth={2.3} />
  ) : (
    <Moon size={21} strokeWidth={2.3} />
  )}
</button>
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "980px",
          margin: "0 auto",
        }}
      >
        <img
          src="/jafi-logo.png"
          alt="Logo JAFI"
          style={{
            width: "112px",
            maxWidth: "100%",
            marginBottom: "14px",
            filter: "drop-shadow(0 8px 16px rgba(15, 23, 42, 0.2))",
          }}
        />

        <h1
          style={{
            margin: 0,
            fontSize: "54px",
            lineHeight: 1,
            fontWeight: 800,
            letterSpacing: "7px",
            color: "#ffffff",
          }}
        >
          JAFI
        </h1>

        <p
          style={{
            marginTop: "12px",
            marginBottom: 0,
            color: "#f8fafc",
            fontSize: "19px",
            fontWeight: 600,
            letterSpacing: "0.3px",
          }}
        >
          {titlu}
        </p>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            marginTop: "12px",
            padding: "8px 14px",
            borderRadius: "999px",
            background: "rgba(255, 255, 255, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.16)",
            color: "#dbeafe",
            fontSize: "14px",
            fontWeight: 500,
          }}
        >
          <BookOpen size={17} strokeWidth={2.2} />
          {subtitlu}
        </div>

        <div
          style={{
            height: "1px",
            maxWidth: "760px",
            margin: "26px auto 0",
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
          }}
        />

        <nav
          aria-label="Navigare principală"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            marginTop: "22px",
            flexWrap: "wrap",
          }}
        >
          <button
  type="button"
  style={stilButon(sectiuneActiva === "acasa")}
  onMouseEnter={(e) =>
    Object.assign(
      e.currentTarget.style,
      stilHover(sectiuneActiva === "acasa")
    )
  }
  onMouseLeave={(e) =>
    Object.assign(
      e.currentTarget.style,
      stilButon(sectiuneActiva === "acasa")
    )
  }
  onClick={() => onNavigare("acasa")}
>
  <House size={19} strokeWidth={2.3} />
  Acasă
</button>

<button
  type="button"
  style={stilButon(sectiuneActiva === "activitate")}
  onMouseEnter={(e) =>
    Object.assign(
      e.currentTarget.style,
      stilHover(sectiuneActiva === "activitate")
    )
  }
  onMouseLeave={(e) =>
    Object.assign(
      e.currentTarget.style,
      stilButon(sectiuneActiva === "activitate")
    )
  }
  onClick={() => onNavigare("activitate")}
>
  <CirclePlus size={19} strokeWidth={2.3} />
  Activitate
</button>

<button
  type="button"
  style={stilButon(sectiuneActiva === "statistici")}
  onMouseEnter={(e) =>
    Object.assign(
      e.currentTarget.style,
      stilHover(sectiuneActiva === "statistici")
    )
  }
  onMouseLeave={(e) =>
    Object.assign(
      e.currentTarget.style,
      stilButon(sectiuneActiva === "statistici")
    )
  }
  onClick={() => onNavigare("statistici")}
>
  <ChartNoAxesColumnIncreasing size={19} strokeWidth={2.3} />
  Statistici
</button>

<button
  type="button"
  style={stilButon(sectiuneActiva === "realizari")}
  onMouseEnter={(e) =>
    Object.assign(
      e.currentTarget.style,
      stilHover(sectiuneActiva === "realizari")
    )
  }
  onMouseLeave={(e) =>
    Object.assign(
      e.currentTarget.style,
      stilButon(sectiuneActiva === "realizari")
    )
  }
  onClick={() => onNavigare("realizari")}
>
  <Trophy size={19} strokeWidth={2.3} />
  Realizări
</button>

<button
  type="button"
  style={stilButon(sectiuneActiva === "setari")}
  onMouseEnter={(e) =>
    Object.assign(
      e.currentTarget.style,
      stilHover(sectiuneActiva === "setari")
    )
  }
  onMouseLeave={(e) =>
    Object.assign(
      e.currentTarget.style,
      stilButon(sectiuneActiva === "setari")
    )
  }
  onClick={() => onNavigare("setari")}
>
  <Settings2 size={19} strokeWidth={2.3} />
  Setări
</button>
        </nav>
      </div>
    </header>
  );
}

export default Header;