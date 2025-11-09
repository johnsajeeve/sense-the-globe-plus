import { useEffect, useState } from "react";
import { Mic, MicOff, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useVoiceMode } from "@/hooks/useVoiceMode";
import { useNavigate, useLocation } from "react-router-dom";
import { pageDescriptions } from "@/voice/pageDescription";

export default function VoiceToggle() {
  const {
    supported,
    enabled,
    listening,
    toggle,
    lastTranscript,
    liveRegionProps,
    speak,
    enable,
    disable,
  } = useVoiceMode();

  const navigate = useNavigate();
  const location = useLocation();
  const [showHelp, setShowHelp] = useState(false);

  function handleVoiceCommand(text: string) {
    // --- Controls ---
    if (text.includes("pause voice")) {
      disable();
      return;
    }

    if (text.includes("resume voice") || text.includes("voice on")) {
      enable();
      return;
    }

    if (text.includes("help")) {
      speak("Here are some voice commands: Go home, open profile, open community, open chat, scroll up, scroll down, where am I, pause voice, resume voice.");
      setShowHelp(true);
      return;
    }

    // --- Navigation ---
    if (text.includes("go home") || text.includes("open home")) {
      speak("Going home");
      navigate("/");
    }

    if (text.includes("open profile")) {
      speak("Opening profile");
      navigate("/profile");
    }

    if (text.includes("open community")) {
      speak("Opening community");
      navigate("/community");
    }

    if (text.includes("open chat")) {
      speak("Opening chat");
      navigate("/chat");
    }

    if (text.includes("open destination")) {
      speak("Opening destinations");
      navigate("/destination");
    }

    // --- Page Description ---
    if (text.includes("where am i") || text.includes("describe page")) {
      const description = pageDescriptions[location.pathname] ?? "This page does not have a description yet.";
      speak(description);
    }

    // --- Scrolling ---
    if (text.includes("scroll down")) {
      speak("Scrolling down");
      window.scrollBy({ top: 650, behavior: "smooth" });
    }

    if (text.includes("scroll up")) {
      speak("Scrolling up");
      window.scrollBy({ top: -650, behavior: "smooth" });
    }
  }

  useEffect(() => {
    if (!enabled || !lastTranscript) return;
    const cmd = lastTranscript.toLowerCase().replace(/[^a-z ]/g, "").trim();
    if (!cmd) return;
    handleVoiceCommand(cmd);
  }, [lastTranscript, enabled]);

  if (!supported) return null;

  return (
    <>
      <div {...liveRegionProps} />

      {/* Command Help Panel */}
      {showHelp && (
        <div className="fixed bottom-20 right-4 bg-white dark:bg-gray-900 shadow-xl rounded-lg p-4 text-sm w-64 border">
          <div className="font-semibold mb-2 flex justify-between items-center">
            Voice Commands
            <button onClick={() => setShowHelp(false)}>×</button>
          </div>
          <ul className="space-y-1">
            <li>• Go home</li>
            <li>• Open profile</li>
            <li>• Open community</li>
            <li>• Open chat</li>
            <li>• Scroll down / Scroll up</li>
            <li>• Where am I</li>
            <li>• Pause voice / Resume voice</li>
            <li>• Help (show this panel)</li>
          </ul>
        </div>
      )}

      <div className="fixed bottom-4 right-4 flex items-center gap-3">
        <Button
          onClick={() => setShowHelp((p) => !p)}
          variant="secondary"
          className="rounded-full h-12 w-12 p-0"
          aria-label="Show voice help"
        >
          <Info className="h-5 w-5" />
        </Button>

        <Button
          onClick={toggle}
          variant={enabled ? "default" : "secondary"}
          className="rounded-full h-12 w-12 p-0"
          aria-pressed={enabled}
          aria-label={enabled ? "Turn voice mode off" : "Turn voice mode on"}
        >
          {enabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
        </Button>
      </div>
    </>
  );
}
