const Footer = () => {
  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="container py-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-semibold mb-3">About SenseTheWorld+</h3>
            <p className="text-sm text-muted-foreground">
              Making travel inclusive, safe, and social for everyone — regardless of health, accessibility, or background.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Data Sources</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• World Health Organization (WHO)</li>
              <li>• Centers for Disease Control (CDC)</li>
              <li>• OpenStreetMap (OSM)</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Mission</h3>
            <p className="text-sm text-muted-foreground">
              Bridging inclusion and exploration — helping everyone experience the world safely and confidently.
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          © 2024 SenseTheWorld+. Built with care for accessibility and inclusion.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
