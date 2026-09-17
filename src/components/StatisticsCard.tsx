import Card from "./Card";

type StatisticsCardProps = {
  totalActivitati: number;
  totalMinute: number;
  mediaMinutePeActivitate: number;
  numarZileActive: number;
  activitatePreferata: string;
};

export default function StatisticsCard({
  totalActivitati,
  totalMinute,
  mediaMinutePeActivitate,
  numarZileActive,
  activitatePreferata,
}: StatisticsCardProps) {
  const statistici = [
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
  ];

  return (
    <Card titlu="Statistici">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "16px",
        }}
      >
        {statistici.map((statistica) => (
          <div
            key={statistica.titlu}
            style={{
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "14px",
                color: "#64748b",
                marginBottom: "8px",
              }}
            >
              {statistica.titlu}
            </div>

            <div
              style={{
                fontSize: "26px",
                fontWeight: "bold",
                color: "#1e3a8a",
              }}
            >
              {statistica.valoare}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}