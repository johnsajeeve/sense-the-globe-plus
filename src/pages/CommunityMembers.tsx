import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CommunityMembers = () => {
  const { id } = useParams();
  const [members, setMembers] = useState<any[]>([]);
  const [community, setCommunity] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommunityAndMembers = async () => {
      setLoading(true);

      // ✅ Fetch community info
      const { data: comm, error: commError } = await supabase
        .from("communities")
        .select("*")
        .eq("id", id)
        .single();

      if (commError) {
        console.error("❌ Error fetching community:", commError.message);
      } else {
        setCommunity(comm);
      }

      // ✅ Fetch members with profile info via a LEFT JOIN
      const { data: membersData, error: membersError } = await supabase
        .from("community_members")
        .select(`
          user_id,
          profiles!inner (
            id,
            name,
            city,
            country,
            mobility_level
          )
        `)
        .eq("community_id", id);

      if (membersError) {
        console.error("❌ Error fetching members:", membersError.message);
      } else {
        console.log("✅ Members fetched:", membersData);
        setMembers(membersData || []);
      }

      setLoading(false);
    };

    fetchCommunityAndMembers();
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 py-12 px-4">
        <div className="container max-w-4xl mx-auto">
          {community ? (
            <>
              <h1 className="text-3xl font-bold mb-2">{community.name}</h1>
              <p className="text-muted-foreground mb-6">
                {community.description || "No description available."}
              </p>
            </>
          ) : (
            <p className="text-muted-foreground mb-6">Loading community info...</p>
          )}

          {loading ? (
            <p className="text-center text-muted-foreground">Loading members...</p>
          ) : members.length === 0 ? (
            <p className="text-center text-muted-foreground">No members yet.</p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {members.map((m) => (
                <Card key={m.user_id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle>{m.profiles?.name || "Anonymous"}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="flex items-center gap-1 text-sm">
                      <MapPin className="h-4 w-4" /> {m.profiles?.city || "Unknown"},{" "}
                      {m.profiles?.country || "Unknown"}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Mobility: {m.profiles?.mobility_level || "Not specified"}
                    </p>

                    {/* ✅ Message button */}
                    <Link to={`/chat/${m.user_id}`}>
                      <Button className="mt-3 w-full" variant="outline">
                        Message
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CommunityMembers;