import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft, Droplet, Syringe } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ActivityCard from "@/components/ActivityCard";
import { countries, activities } from "@/data/mockData";
import { loadProfile } from "@/utils/localStorage";

const Destination = () => {
  const { country } = useParams<{ country: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(loadProfile());

  useEffect(() => {
    setProfile(loadProfile());
  }, []);

  if (!country || !countries[country]) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Country not found</h1>
          <Button onClick={() => navigate("/")}>Go Home</Button>
        </div>
      </div>
    );
  }

  const countryData = countries[country];
  const countryActivities = activities[country] || [];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8 px-4">
        <div className="container max-w-6xl">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>

          {/* Country Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">{countryData.name}</h1>
            <p className="text-muted-foreground">
              Health information and accessible activities
            </p>
          </div>

          {/* Health Snapshot */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Health & Safety Snapshot
              </CardTitle>
              <CardDescription>
                Important health information for {countryData.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Syringe className="h-4 w-4 text-primary" />
                    <span className="font-medium">Recommended Vaccines</span>
                  </div>
                  <div className="space-y-1">
                    {countryData.vaccines.map(vaccine => (
                      <Badge key={vaccine} variant="outline" className="mr-1">
                        {vaccine}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="h-4 w-4 text-warning" />
                    <span className="font-medium">Active Outbreaks</span>
                  </div>
                  {countryData.outbreaks.length > 0 ? (
                    <div className="space-y-1">
                      {countryData.outbreaks.map(outbreak => (
                        <Badge key={outbreak} variant="outline" className="mr-1 border-warning text-warning">
                          {outbreak}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">None reported</p>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Droplet className="h-4 w-4 text-primary" />
                    <span className="font-medium">Water Safety</span>
                  </div>
                  <Badge 
                    variant={countryData.waterSafety === "safe" ? "outline" : "destructive"}
                  >
                    {countryData.waterSafety.charAt(0).toUpperCase() + countryData.waterSafety.slice(1)}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activities Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Accessible Activities</h2>
            {countryActivities.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {countryActivities.map(activity => (
                  <ActivityCard
                    key={activity.id}
                    activity={activity}
                    country={countryData}
                    profile={profile}
                  />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No activities available for this destination yet.
                </CardContent>
              </Card>
            )}
          </div>

          {/* Hospital Finder Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>Nearby Healthcare Facilities</CardTitle>
              <CardDescription>
                Find hospitals, clinics, and pharmacies in {countryData.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">
                  Interactive map will appear here
                </p>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                📍 Location: {countryData.latitude}, {countryData.longitude}
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Destination;
