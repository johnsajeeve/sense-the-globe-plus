import { cn } from "@/lib/utils";
import { AlertCircle, AlertTriangle, CheckCircle } from "lucide-react";

interface RiskBadgeProps {
  level: "low" | "moderate" | "high";
  className?: string;
}

const RiskBadge = ({ level, className }: RiskBadgeProps) => {
  const config = {
    low: {
      icon: CheckCircle,
      label: "Low Risk",
      bgColor: "bg-success/10",
      textColor: "text-success",
      borderColor: "border-success/20",
    },
    moderate: {
      icon: AlertTriangle,
      label: "Moderate Risk",
      bgColor: "bg-warning/10",
      textColor: "text-warning",
      borderColor: "border-warning/20",
    },
    high: {
      icon: AlertCircle,
      label: "High Risk",
      bgColor: "bg-destructive/10",
      textColor: "text-destructive",
      borderColor: "border-destructive/20",
    },
  };

  const { icon: Icon, label, bgColor, textColor, borderColor } = config[level];

  return (
    <div className={cn("inline-flex items-center gap-2 px-3 py-1 rounded-full border", bgColor, borderColor, className)}>
      <Icon className={cn("h-4 w-4", textColor)} />
      <span className={cn("text-sm font-medium", textColor)}>{label}</span>
    </div>
  );
};

export default RiskBadge;
