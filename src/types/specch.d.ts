// Minimal typings so TS stops complaining
interface SpeechRecognition extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start(): void;
  stop(): void;
  abort(): void;
  onaudiostart?: (ev: Event) => void;
  onaudioend?: (ev: Event) => void;
  onend?: (ev: Event) => void;
  onerror?: (ev: SpeechRecognitionErrorEvent) => void;
  onresult?: (ev: SpeechRecognitionEvent) => void;
  onstart?: (ev: Event) => void;
}
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}
interface Window {
  webkitSpeechRecognition?: { new(): SpeechRecognition };
}
