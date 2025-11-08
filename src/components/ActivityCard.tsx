import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Activity, Country } from "@/data/mockData";
import { UserProfile } from "@/types/profile";
import { calculateRisk, RiskAssessment } from "@/utils/riskCalculator";
import RiskBadge from "./RiskBadge";
import { ChevronDown, ChevronUp, MapPin } from "lucide-react";

interface ActivityCardProps {
  activity: Activity;
  country: Country;
  profile: UserProfile;
}

const ActivityCard = ({ activity, country, profile }: ActivityCardProps) => {
  const [showRisk, setShowRisk] = useState(false);
  const [assessment, setAssessment] = useState<RiskAssessment | null>(null);

  const handlePersonalizeRisk = () => {
    if (!showRisk) {
      const result = calculateRisk(activity, country, profile);
      setAssessment(result);
    }
    setShowRisk(!showRisk);
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-1">{activity.name}</CardTitle>
            <CardDescription className="flex items-center gap-1 text-sm">
              <MapPin className="h-3 w-3" />
              {activity.location}
            </CardDescription>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-2">{activity.description}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Accessibility Info */}
        <div className="flex flex-wrap gap-1">
          {activity.accessibility.wheelchairAccessible && (
            <Badge variant="secondary" className="text-xs">♿ Wheelchair Accessible</Badge>
          )}
          {activity.accessibility.stepFreeAccess && (
            <Badge variant="secondary" className="text-xs">Step-free Access</Badge>
          )}
          {activity.accessibility.hasElevator && (
            <Badge variant="secondary" className="text-xs">Elevator Available</Badge>
          )}
        </div>

        {/* Environmental Info */}
        <div className="text-sm text-muted-foreground">
          <div>🌡️ Temperature: {activity.environmental.temperature}</div>
          <div>🔊 Noise Level: {activity.environmental.noiseLevel}</div>
          {activity.environmental.altitude > 0 && (
            <div>⛰️ Altitude: {activity.environmental.altitude}m</div>
          )}
        </div>

        <Button 
          onClick={handlePersonalizeRisk} 
          variant="outline" 
          className="w-full"
        >
          {showRisk ? (
            <>
              Hide Risk Assessment <ChevronUp className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              Personalize Risk <ChevronDown className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>

        {/* Risk Assessment */}
        {showRisk && assessment && (
          <div className="space-y-3 p-4 rounded-lg bg-muted/50">
            <div className="flex items-center justify-between">
              <span className="font-medium">Risk Level</span>
              <RiskBadge level={assessment.level} />
            </div>

            {assessment.reasons.length > 0 && (
              <div>
                <p className="font-medium text-sm mb-2">Reasons:</p>
                <ul className="space-y-1">
                  {assessment.reasons.map((reason, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground">
                      • {reason}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {assessment.mitigations.length > 0 && (
              <div>
                <p className="font-medium text-sm mb-2">Recommendations:</p>
                <ul className="space-y-1">
                  {assessment.mitigations.map((mitigation, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground">
                      ✓ {mitigation}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivityCard;
