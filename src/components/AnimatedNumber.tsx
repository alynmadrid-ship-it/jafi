import { useEffect, useState } from "react";

type AnimatedNumberProps = {
  value: number;
  duration?: number;
};

export default function AnimatedNumber({
  value,
  duration = 800,
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;

    const increment = Math.max(1, Math.ceil(value / (duration / 16)));

    const timer = setInterval(() => {
      start += increment;

      if (start >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <>{displayValue}</>;
}