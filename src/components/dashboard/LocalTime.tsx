"use client";

import { useEffect, useState } from "react";

export default function LocalTime({ isoString }: { isoString: string }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    try {
      const date = new Date(isoString);
      setTime(date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }));
    } catch (e) {
      setTime("");
    }
  }, [isoString]);

  if (!time) return <span className="opacity-0">00:00</span>;

  return <span>{time}</span>;
}
