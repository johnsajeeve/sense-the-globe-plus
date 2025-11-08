import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe2, Heart, MapPin, Shield } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { countries } from "@/data/mockData";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [countryCode, setCountryCode] = useState("");
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleExplore = () => {
    const upperCode = countryCode.toUpperCase();
    if (countries[upperCode]) {
      navigate(`/destination/${upperCode}`);
    } else {
      alert("Country code not found. Try JP, IN, or FR for demo.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-gradient-to-br from-primary/10 via-accent/5 to-background">
          <div className="container max-w-4xl text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
              Travel the World, Safely
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Personalized travel guidance for everyone. Explore destinations with confidence, 
              knowing your health and accessibility needs are prioritized.
            </p>

            {!user && (
              <div className="mb-8 flex gap-4 justify-center">
                <Button size="lg" onClick={() => navigate("/auth")}>
                  Get Started - Sign Up Free
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate("/auth")}>
                  Sign In
                </Button>
              </div>
            )}
            
            <Card className="max-w-md mx-auto shadow-lg">
              <CardHeader>
                <CardTitle className="text-left">Start Your Journey</CardTitle>
                <CardDescription className="text-left">
                  Enter a country code to explore (e.g., JP, IN, FR)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input
                    placeholder="Country code (JP, IN, FR)"
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleExplore()}
                    className="uppercase"
                    maxLength={2}
                  />
                  <Button onClick={handleExplore} size="lg">
                    Explore
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">
              How SenseTheWorld+ Helps You
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Personalized Risk Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Get tailored safety information based on your unique health and mobility needs.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Find Nearby Healthcare</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Locate hospitals, clinics, and pharmacies wherever you travel.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Accessible Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Discover experiences matched to your accessibility requirements.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Globe2 className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Community Connections</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Connect with fellow travelers who share similar needs and interests.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-accent/30">
          <div className="container max-w-3xl text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Experience the World?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {user 
                ? "Set up your health profile to get personalized travel recommendations."
                : "Create a free account and set up your profile for personalized travel."}
            </p>
            {user ? (
              <Button size="lg" onClick={() => navigate("/profile")}>
                Create My Profile
              </Button>
            ) : (
              <div className="flex gap-4 justify-center">
                <Button size="lg" onClick={() => navigate("/auth")}>
                  Sign Up Free
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate("/auth")}>
                  Sign In
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
