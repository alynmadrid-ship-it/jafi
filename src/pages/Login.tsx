import { useState } from "react";

type LoginProps = {
  darkMode: boolean;
  onLogin: (username: string, pin: string) => void;
  onCreareCont: (
    nume: string,
    clasa: string,
    username: string,
    pin: string
  ) => void;
};
export default function Login({
  darkMode,
  onLogin,
  onCreareCont,
}: LoginProps) {
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");
  const [modCreareCont, setModCreareCont] = useState(false);
  const [nume, setNume] = useState("");
const [clasa, setClasa] = useState("Clasa a V-a");
const [confirmarePin, setConfirmarePin] = useState("");

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
{modCreareCont && (
  <label
    style={{
      display: "block",
      marginBottom: "18px",
      color: darkMode ? "#e2e8f0" : "#0f172a",
    }}
  >
    <strong>Nume și prenume</strong>

    <input
      type="text"
      value={nume}
      onChange={(e) => setNume(e.target.value)}
      placeholder="Ex.: Andrei Popescu"
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
)}
{modCreareCont && (
  <label
    style={{
      display: "block",
      marginBottom: "18px",
      color: darkMode ? "#e2e8f0" : "#0f172a",
    }}
  >
    <strong>Clasa</strong>

    <select
      value={clasa}
      onChange={(e) => setClasa(e.target.value)}
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
    >
      <option>Clasa a V-a</option>
      <option>Clasa a VI-a</option>
      <option>Clasa a VII-a</option>
      <option>Clasa a VIII-a</option>
    </select>
  </label>
)}
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
{modCreareCont && (
  <label
    style={{
      display: "block",
      marginBottom: "22px",
      color: darkMode ? "#e2e8f0" : "#0f172a",
    }}
  >
    <strong>Confirmă PIN-ul</strong>

    <input
      type="password"
      inputMode="numeric"
      value={confirmarePin}
      onChange={(e) => setConfirmarePin(e.target.value)}
      placeholder="Introdu din nou PIN-ul"
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
)}
        <button
          type="button"
          onClick={() => {
  if (modCreareCont) {
    if (!nume.trim() || !username.trim() || !pin.trim()) {
      alert("Completează toate câmpurile.");
      return;
    }

    if (pin !== confirmarePin) {
      alert("PIN-urile nu coincid.");
      return;
    }

    onCreareCont(
      nume.trim(),
      clasa,
      username.trim(),
      pin.trim()
    );
  } else {
    onLogin(username, pin);
  }
}}
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
          {modCreareCont ? "Creează cont" : "Intră în JAFI"}
        </button>
       <button
  type="button"
  onClick={() => setModCreareCont((valoare) => !valoare)}
  style={{
    width: "100%",
    marginTop: "12px",
    padding: "12px",
    border: "none",
    background: "transparent",
    color: darkMode ? "#93c5fd" : "#2563eb",
    fontWeight: 700,
    cursor: "pointer",
  }}
>
  {modCreareCont
    ? "Ai deja cont? Autentifică-te"
    : "Nu ai cont? Creează cont"}
</button>
      </div>
    </div>
  );
}