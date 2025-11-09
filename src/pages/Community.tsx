import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useProfile } from "@/hooks/useProfile";

export default function Community() {
  const { profile: myProfile, loading } = useProfile();
  const [buddies, setBuddies] = useState<any[]>([]);
  const [searching, setSearching] = useState(true);

  useEffect(() => {
    if (!myProfile) return;

    async function loadMatches() {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .neq("id", myProfile.id);

      if (error) {
        console.error(error);
        setSearching(false);
        return;
      }

      const matched = data.filter((p) => {
        const mobilityMatch =
          p.mobility_level && myProfile.mobility_level &&
          p.mobility_level === myProfile.mobility_level;

        const conditionMatch =
          p.conditions && myProfile.conditions &&
          p.conditions.some((c: string) => myProfile.conditions.includes(c));

        const triggerMatch =
          p.triggers && myProfile.triggers &&
          p.triggers.some((t: string) => myProfile.triggers.includes(t));

        return mobilityMatch || conditionMatch || triggerMatch;
      });

      setBuddies(matched);
      setSearching(false);
    }

    loadMatches();
  }, [myProfile]);

  if (loading || searching) {
    return <p className="p-6 text-center">Finding travel buddies with similar needs…</p>;
  }

  if (!myProfile) {
    return (
      <p className="p-6 text-center text-gray-600">
        Please log in to view your community matches.
      </p>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Your Accessibility Travel Buddies</h1>

      {buddies.length === 0 ? (
        <p className="text-gray-500">
          No matches yet — as more travelers join, we’ll match them to you automatically.
        </p>
      ) : (
        <div className="space-y-4">
          {buddies.map((b) => (
            <div key={b.id} className="border border-gray-300 p-4 rounded-lg shadow-sm">
              <h2 className="font-semibold text-lg">{b.full_name || "Traveler"}</h2>
              <p className="text-sm text-gray-600">{b.email}</p>

              <div className="flex flex-wrap gap-2 mt-3 text-sm">
                {b.mobility_level && (
                  <span className="px-2 py-1 bg-blue-100 rounded">
                    Mobility: {b.mobility_level}
                  </span>
                )}

                {b.conditions?.map((c: string) => (
                  <span key={c} className="px-2 py-1 bg-purple-100 rounded">
                    {c}
                  </span>
                ))}

                {b.triggers?.map((t: string) => (
                  <span key={t} className="px-2 py-1 bg-red-100 rounded">
                    Avoids: {t}
                  </span>
                ))}
              </div>

              <button
                className="mt-3 px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                onClick={() => alert(`Message feature would launch chat with ${b.email}`)}
              >
                Connect
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
