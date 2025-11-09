import { useEffect, useMemo, useRef, useState } from "react";

export function useVoiceMode(lang = "en-GB") {
  const [enabled, setEnabled] = useState(false);
  const [listening, setListening] = useState(false);
  const [lastTranscript, setLastTranscript] = useState("");
  const [supported, setSupported] = useState(false);

  const recRef = useRef<SpeechRecognition | null>(null);
  const restartingRef = useRef(false);
  const liveRegionRef = useRef<HTMLElement | null>(null);

  // --- Text-to-Speech ---
  function speak(text: string) {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = lang;
    window.speechSynthesis.speak(utter);
    announce(text);
  }

  // --- Screen Reader Announcements ---
  function announce(text: string) {
    if (!liveRegionRef.current) return;
    liveRegionRef.current.textContent = "";
    setTimeout(() => (liveRegionRef.current!.textContent = text), 10);
  }

  // --- Toggle Voice Mode ---
  function enable() {
    setEnabled(true);
    speak("Voice mode on");
  }

  function disable() {
    // ✅ Ensure recognition does NOT restart
    setEnabled(false);

    try {
      recRef.current?.stop();
    } catch {}

    setListening(false);
    speak("Voice mode off");
  }

  function toggle() {
    enabled ? disable() : enable();
  }

  // --- Initialize Speech Recognition ---
  useEffect(() => {
    const SR =
      (window as any).webkitSpeechRecognition ??
      (window as any).SpeechRecognition;

    if (!SR) {
      setSupported(false);
      return;
    }

    setSupported(true);

    const rec: SpeechRecognition = new SR();
    rec.lang = lang;
    rec.continuous = true;
    rec.interimResults = true;

    rec.onresult = (e) => {
      const last = e.results[e.results.length - 1];
      const text = last[0].transcript.trim();
      setLastTranscript(text);
      if (last.isFinal) announce(`Heard: ${text}`);
    };

    rec.onstart = () => {
      setListening(true);
      restartingRef.current = false;
    };

    rec.onend = () => {
      setListening(false);

      // ✅ If paused/disabled, do NOT restart
      if (!enabled) return;

      // ✅ Prevent rapid restart loops
      if (restartingRef.current) return;
      restartingRef.current = true;

      setTimeout(() => {
        try {
          rec.start();
          setListening(true);
        } catch {}
      }, 400);
    };

    recRef.current = rec;

    // ✅ Start only when voice mode is enabled
    if (enabled) {
      try {
        rec.start();
        setListening(true);
      } catch {}
    }

    return () => {
      rec.abort();
      recRef.current = null;
    };
  }, [enabled, lang]);

  // --- Live Region Binding ---
  const liveRegionProps = useMemo(
    () => ({
      role: "status",
      "aria-live": "polite" as const,
      "aria-atomic": "true" as const,
      className: "sr-only",
      ref: (el: HTMLElement | null) => (liveRegionRef.current = el),
    }),
    []
  );

  return {
    supported,
    enabled,
    listening,
    lastTranscript,
    toggle,
    enable,
    disable,
    speak,
    liveRegionProps,
  };
}
