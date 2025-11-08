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
      alert("Country code not found. Available countries: JP, US, GB, ES, IT, TH, AU, BR, CA, DE, MX, AE, SG, IN, FR");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 px-4 overflow-hidden bg-gradient-hero">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-glow/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          <div className="container max-w-6xl relative z-10">
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent leading-tight">
                Travel the World,<br />Safely & Confidently
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                Personalized travel guidance for everyone. Explore destinations with confidence, 
                knowing your health and accessibility needs are prioritized.
              </p>

              {!user && (
                <div className="mb-12 flex gap-4 justify-center flex-wrap">
                  <Button size="lg" onClick={() => navigate("/auth")} className="text-lg px-8 py-6 shadow-glow hover:shadow-elegant transition-all duration-300 hover:scale-105">
                    Get Started - Sign Up Free
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => navigate("/auth")} className="text-lg px-8 py-6 hover:shadow-elegant transition-all duration-300 hover:scale-105">
                    Sign In
                  </Button>
                </div>
              )}
            </div>
            
            <Card className="max-w-2xl mx-auto shadow-elegant hover:shadow-glow transition-all duration-300 border-2 animate-scale-in backdrop-blur-sm bg-card/95">
              <CardHeader className="pb-4">
                <CardTitle className="text-left text-2xl">🌍 Start Your Journey</CardTitle>
                <CardDescription className="text-left text-base">
                  Enter a country code to explore destinations worldwide
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <Input
                    placeholder="e.g., JP, US, GB, ES, IT..."
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleExplore()}
                    className="uppercase text-lg py-6 focus:shadow-glow transition-all duration-300"
                    maxLength={2}
                  />
                  <Button onClick={handleExplore} size="lg" className="px-8 py-6 text-lg hover:shadow-elegant transition-all duration-300 hover:scale-105">
                    Explore
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-3 text-center">
                  Available: JP, US, GB, ES, IT, TH, AU, BR, CA, DE, MX, AE, SG, IN, FR
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-gradient-feature">
          <div className="container">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              How SenseTheWorld+ Helps You
            </h2>
            <p className="text-center text-muted-foreground mb-16 text-lg max-w-2xl mx-auto">
              Empowering every traveler with personalized insights and accessible experiences
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center hover:shadow-elegant transition-all duration-300 hover:scale-105 hover:-translate-y-1 border-border/50 backdrop-blur-sm bg-card/50">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary-glow/20 flex items-center justify-center mb-4 shadow-glow">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Personalized Risk Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Get tailored safety information based on your unique health and mobility needs.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-elegant transition-all duration-300 hover:scale-105 hover:-translate-y-1 border-border/50 backdrop-blur-sm bg-card/50">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary-glow/20 flex items-center justify-center mb-4 shadow-glow">
                    <MapPin className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Find Nearby Healthcare</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Locate hospitals, clinics, and pharmacies wherever you travel.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-elegant transition-all duration-300 hover:scale-105 hover:-translate-y-1 border-border/50 backdrop-blur-sm bg-card/50">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary-glow/20 flex items-center justify-center mb-4 shadow-glow">
                    <Heart className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Accessible Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Discover experiences matched to your accessibility requirements.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-elegant transition-all duration-300 hover:scale-105 hover:-translate-y-1 border-border/50 backdrop-blur-sm bg-card/50">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary-glow/20 flex items-center justify-center mb-4 shadow-glow">
                    <Globe2 className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Community Connections</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Connect with fellow travelers who share similar needs and interests.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 bg-gradient-hero relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container max-w-4xl text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
              Ready to Experience the World?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              {user 
                ? "Set up your health profile to get personalized travel recommendations tailored just for you."
                : "Create a free account and set up your profile for personalized travel experiences."}
            </p>
            {user ? (
              <Button size="lg" onClick={() => navigate("/profile")} className="text-lg px-8 py-6 shadow-glow hover:shadow-elegant transition-all duration-300 hover:scale-105">
                Create My Profile
              </Button>
            ) : (
              <div className="flex gap-4 justify-center flex-wrap">
                <Button size="lg" onClick={() => navigate("/auth")} className="text-lg px-8 py-6 shadow-glow hover:shadow-elegant transition-all duration-300 hover:scale-105">
                  Sign Up Free
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate("/auth")} className="text-lg px-8 py-6 hover:shadow-elegant transition-all duration-300 hover:scale-105">
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
