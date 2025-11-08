import { Link, useLocation } from "react-router-dom";
import { Globe2, Heart, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const Header = () => {
  const location = useLocation();
  
  const navItems = [
    { path: "/", label: "Explore", icon: Globe2 },
    { path: "/profile", label: "My Profile", icon: Heart },
    { path: "/community", label: "Community", icon: Users },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-semibold text-xl">
          <Globe2 className="h-6 w-6 text-primary" />
          <span className="bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
            SenseTheWorld+
          </span>
        </Link>
        
        <nav className="flex items-center gap-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;
