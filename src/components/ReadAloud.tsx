import { useState } from "react";

const ReadAloud = () => {
  const [isReading, setIsReading] = useState(false);
  const synth = window.speechSynthesis;

  const handleRead = () => {
    if (synth.speaking) {
      synth.cancel();
      setIsReading(false);
    } else {
      const text = document.body.innerText; // you could refine this later
      const utterance = new SpeechSynthesisUtterance(text);
      synth.speak(utterance);
      setIsReading(true);

      utterance.onend = () => setIsReading(false);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <button
        onClick={handleRead}
        className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
      >
        {isReading ? "Stop" : "Read Page"}
      </button>
    </div>
  );
};

export default ReadAloud;