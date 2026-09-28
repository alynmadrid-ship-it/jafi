import { useState } from "react";

type LoginProps = {
  darkMode: boolean;
  onLogin: (username: string, pin: string) => void;
};
export default function Login({ darkMode, onLogin }: LoginProps) {
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        boxSizing: "border-box",
        background: darkMode ? "#0f172a" : "#f1f5f9",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "32px",
          borderRadius: "20px",
          background: darkMode ? "#1e293b" : "#ffffff",
          boxShadow: "0 12px 35px rgba(15, 23, 42, 0.15)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <h1
            style={{
              margin: "0 0 8px",
              color: darkMode ? "#93c5fd" : "#1e3a8a",
            }}
          >
            JAFI
          </h1>

          <p
            style={{
              margin: 0,
              color: darkMode ? "#cbd5e1" : "#64748b",
            }}
          >
            Jurnalul Activităților Fizice Independente
          </p>
        </div>

        <label
          style={{
            display: "block",
            marginBottom: "18px",
            color: darkMode ? "#e2e8f0" : "#0f172a",
          }}
        >
          <strong>Nume de utilizator</strong>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Introdu numele de utilizator"
            autoComplete="username"
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
            }}
          />
        </label>

        <label
          style={{
            display: "block",
            marginBottom: "22px",
            color: darkMode ? "#e2e8f0" : "#0f172a",
          }}
        >
          <strong>PIN</strong>

          <input
            type="password"
            inputMode="numeric"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="Introdu PIN-ul"
            autoComplete="current-password"
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
            }}
          />
        </label>

        <button
          type="button"
          onClick={() => onLogin(username, pin)}
          style={{
            width: "100%",
            padding: "13px",
            border: "none",
            borderRadius: "10px",
            background: "#2563eb",
            color: "#ffffff",
            fontWeight: 700,
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Intră în JAFI
        </button>
      </div>
    </div>
  );
}