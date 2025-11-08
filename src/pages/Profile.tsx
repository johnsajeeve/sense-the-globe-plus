import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { UserProfile, mobilityOptions, commonConditions, commonTriggers } from "@/types/profile";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile>({
    mobilityLevel: "none",
    conditions: [],
    triggers: [],
  });

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/auth");
      return;
    }

    // Load profile from database
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single();

    if (data) {
      setProfile({
        mobilityLevel: data.mobility_level as any,
        conditions: data.conditions || [],
        triggers: data.triggers || [],
      });
    }

    setLoading(false);
  };

  const handleSave = async () => {
    setLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      toast.error("Please sign in to save your profile");
      navigate("/auth");
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        mobility_level: profile.mobilityLevel,
        conditions: profile.conditions,
        triggers: profile.triggers,
      })
      .eq("id", session.user.id);

    if (error) {
      toast.error("Failed to save profile");
    } else {
      toast.success("Profile saved successfully!");
    }
    
    setLoading(false);
  };

  const toggleCondition = (condition: string) => {
    setProfile(prev => ({
      ...prev,
      conditions: prev.conditions.includes(condition)
        ? prev.conditions.filter(c => c !== condition)
        : [...prev.conditions, condition]
    }));
  };

  const toggleTrigger = (trigger: string) => {
    setProfile(prev => ({
      ...prev,
      triggers: prev.triggers.includes(trigger)
        ? prev.triggers.filter(t => t !== trigger)
        : [...prev.triggers, trigger]
    }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12 px-4">
        <div className="container max-w-3xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Your Health Profile</h1>
            <p className="text-muted-foreground">
              Help us personalize your travel experience. Your data stays private on your device.
            </p>
          </div>

          <div className="space-y-6">
            {/* Mobility Level */}
            <Card>
              <CardHeader>
                <CardTitle>Mobility Level</CardTitle>
                <CardDescription>
                  Select the option that best describes your mobility needs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={profile.mobilityLevel}
                  onValueChange={(value: any) => 
                    setProfile(prev => ({ ...prev, mobilityLevel: value }))
                  }
                >
                  {mobilityOptions.map(option => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label htmlFor={option.value} className="cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Health Conditions */}
            <Card>
              <CardHeader>
                <CardTitle>Health Conditions</CardTitle>
                <CardDescription>
                  Select any conditions that may affect your travel
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {commonConditions.map(condition => (
                    <div key={condition} className="flex items-center space-x-2">
                      <Checkbox
                        id={condition}
                        checked={profile.conditions.includes(condition)}
                        onCheckedChange={() => toggleCondition(condition)}
                      />
                      <Label htmlFor={condition} className="cursor-pointer">
                        {condition}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Environmental Triggers */}
            <Card>
              <CardHeader>
                <CardTitle>Environmental Triggers</CardTitle>
                <CardDescription>
                  Select environmental factors that may affect you
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {commonTriggers.map(trigger => (
                    <div key={trigger} className="flex items-center space-x-2">
                      <Checkbox
                        id={trigger}
                        checked={profile.triggers.includes(trigger)}
                        onCheckedChange={() => toggleTrigger(trigger)}
                      />
                      <Label htmlFor={trigger} className="cursor-pointer">
                        {trigger}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button onClick={handleSave} size="lg" disabled={loading}>
                {loading ? "Saving..." : "Save Profile"}
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
