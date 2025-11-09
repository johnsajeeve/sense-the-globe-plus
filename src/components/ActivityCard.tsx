import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, MapPin } from "lucide-react";

import type { Activity, Country } from "@/data/mockData";
import type { Tables } from "@/integrations/supabase/types";

import { calculateRisk, RiskAssessment } from "@/utils/riskCalculator";
import RiskBadge from "./RiskBadge";

interface ActivityCardProps {
  activity: Activity;
  country: Country;
  profile: Tables<"profiles"> | null // ✅ profile comes from Supabase
}


const ActivityCard = ({ activity, country, profile }: ActivityCardProps) => {
  const [showRisk, setShowRisk] = useState(false);
  const [assessment, setAssessment] = useState<RiskAssessment | null>(null);

  const handlePersonalizeRisk = () => {
    if (!profile) return;
       
    if (!showRisk) {
      const result = calculateRisk(activity, country, null);
      setAssessment(result);
    }
    setShowRisk(!showRisk);
    
  };
  


  return (
    <Card className="hover:shadow-md transition">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-lg">
          {activity.name}
        </CardTitle>
        <CardDescription className="flex items-center gap-1 text-sm">
          <MapPin className="h-3 w-3" /> {activity.location}
        </CardDescription>
        <p className="text-sm text-muted-foreground">{activity.description}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-1">
          {activity.accessibility.wheelchairAccessible && (
            <Badge variant="secondary" className="text-xs">♿ Wheelchair Accessible</Badge>
          )}
          {activity.accessibility.stepFreeAccess && (
            <Badge variant="secondary" className="text-xs">Step-Free Access</Badge>
          )}
          {activity.accessibility.hasElevator && (
            <Badge variant="secondary" className="text-xs">Elevator Available</Badge>
          )}
        </div>

        <Button 
          onClick={handlePersonalizeRisk}
          variant="outline"
          className="w-full"
        >
          {showRisk ? "Hide Risk" : "Personalize Risk"}
          {showRisk ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
        </Button>

        {showRisk && assessment && (
          <div className="space-y-2 text-sm bg-muted p-3 rounded-lg border">
            <div className="flex justify-between">
              <span className="font-medium">Risk Level:</span>
              <RiskBadge level={assessment.level} />
            </div>
            {assessment.reasons.length > 0 && (
              <>
                <p className="font-semibold">Why:</p>
                <ul className="list-disc pl-5 space-y-1">{assessment.reasons.map((r, i) => <li key={i}>{r}</li>)}</ul>
              </>
            )}
            {assessment.mitigations.length > 0 && (
              <>
                <p className="font-semibold">Suggestions:</p>
                <ul className="list-disc pl-5 space-y-1">{assessment.mitigations.map((m, i) => <li key={i}>{m}</li>)}</ul>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivityCard;
