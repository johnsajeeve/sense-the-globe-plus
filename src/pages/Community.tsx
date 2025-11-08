import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, MapPin, Heart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { communityMembers } from "@/data/mockData";

const Community = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12 px-4">
        <div className="container max-w-6xl">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2">Travel Community</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Connect with fellow travelers who share similar accessibility needs and interests. 
              Share experiences, tips, and plan inclusive adventures together.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communityMembers.map(member => (
              <Card key={member.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1">{member.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1 text-sm">
                        <MapPin className="h-3 w-3" />
                        {member.city}, {member.country}
                      </CardDescription>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2 flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      Interests
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {member.interests.map(interest => (
                        <Badge key={interest} variant="secondary" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-1">Accessibility</p>
                    <p className="text-sm text-muted-foreground">{member.mobilityLevel}</p>
                  </div>

                  <Button className="w-full" variant="outline">
                    Connect
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Card className="max-w-2xl mx-auto bg-accent/30">
              <CardHeader>
                <CardTitle>Share Your Story</CardTitle>
                <CardDescription>
                  Have travel tips or experiences to share with the community?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button>Join the Community</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Community;
