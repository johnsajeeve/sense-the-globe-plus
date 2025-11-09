import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Community {
  id: string;
  name: string;
  description: string;
}

const CommunityPage = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [user, setUser] = useState<any>(null);
  const [joinedCommunities, setJoinedCommunities] = useState<string[]>([]);

  // ✅ Get current logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) console.error("❌ Error getting user:", error.message);
      else if (data?.user) setUser(data.user);
    };
    fetchUser();
  }, []);

  // ✅ Auto-create profile if user doesn't have one
  useEffect(() => {
    const ensureProfileExists = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", user.id)
        .maybeSingle();

      if (!data && !error) {
        console.log("🆕 Creating profile for user:", user.id);
        await supabase.from("profiles").insert([{ id: user.id, name: user.email }]);
      }
    };
    ensureProfileExists();
  }, [user]);

  // ✅ Fetch all available communities
  useEffect(() => {
    const fetchCommunities = async () => {
      const { data, error } = await supabase.from("communities").select("*");
      if (error) {
        console.error("❌ Error fetching communities:", error.message);
      } else {
        console.log("✅ Communities fetched:", data);
        setCommunities(data || []);
      }
    };
    fetchCommunities();
  }, []);

  // ✅ Fetch which communities the user already joined
  useEffect(() => {
    const fetchJoined = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from("community_members")
        .select("community_id")
        .eq("user_id", user.id);

      if (error) {
        console.error("❌ Error fetching joined communities:", error.message);
      } else {
        setJoinedCommunities(data.map((row) => row.community_id));
      }
    };
    fetchJoined();
  }, [user]);

  // ✅ Join a community
  const handleJoin = async (communityId: string, name: string) => {
    if (!user) {
      alert("Please sign in to join communities!");
      return;
    }

    console.log("🧠 Joining:", { userId: user.id, communityId });

    const { data, error } = await supabase
      .from("community_members")
      .insert([{ user_id: user.id, community_id: communityId }])
      .select();

    if (error) {
      console.error("❌ Error joining community:", error.message);
      alert("Something went wrong while joining. Please try again.");
    } else {
      console.log("✅ Joined community successfully:", data);
      alert(`✅ Joined ${name}!`);
      setJoinedCommunities((prev) => [...prev, communityId]);
    }
  };

  // ✅ Leave a community
  const handleLeave = async (communityId: string) => {
    if (!user) return;

    const { error } = await supabase
      .from("community_members")
      .delete()
      .eq("user_id", user.id)
      .eq("community_id", communityId);

    if (error) {
      console.error("❌ Error leaving community:", error.message);
      alert("Something went wrong while leaving. Please try again.");
    } else {
      alert("👋 Left community successfully.");
      setJoinedCommunities((prev) => prev.filter((id) => id !== communityId));
    }
  };

  // ✅ Render
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 py-12 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2">Travel Communities 🌍</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join local and global communities to connect with travelers sharing your interests and accessibility needs.
            </p>
          </div>

          {communities.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No communities found. Please add some in Supabase.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {communities.map((community) => (
                <Card
                  key={community.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle>{community.name}</CardTitle>
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <CardDescription>{community.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="flex flex-col gap-2">
                    {joinedCommunities.includes(community.id) ? (
                      <Button
                        variant="destructive"
                        onClick={() => handleLeave(community.id)}
                      >
                        Leave Community
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleJoin(community.id, community.name)}
                      >
                        Join Community
                      </Button>
                    )}

                    {/* ✅ View Members button */}
                    <Link to={`/community/${community.id}/members`}>
  <Button variant="outline">View Members</Button>
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

export default CommunityPage;