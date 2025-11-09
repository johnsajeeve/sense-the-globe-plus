import { useEffect, useState } from "react";

export default function LivesTouchedBadge() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const value = parseInt(localStorage.getItem("livesTouched") || "0", 10);
    setCount(value);
  }, []);

  const title =
    count >= 100 ? "🌍 Lifechanger" :
    count >= 40 ? "❤️‍🩹 Community Guardian" :
    count >= 16 ? "✨ Compassionate Pathfinder" :
    count >= 6 ? "🕯 Warm Guide" :
    "🌿 Kind Traveler";

  return (
    <div 
      className="fixed top-4 left-4 px-5 py-3 rounded-xl font-semibold text-white
      backdrop-blur-md border border-white/30 shadow-[0_0_25px_rgba(0,200,255,0.6)]
      bg-[radial-gradient(circle_at_center,hsl(195,85%,55%)_0%,hsl(210,25%,10%)_70%)]
      animate-pulse-glow"
    >
      {title} • Lives Touched: {count}
    </div>
  );
}
