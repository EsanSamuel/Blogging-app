import React from "react";

const useSpeechRecognition = () => {
  const [isListening, setIsListening] = React.useState<boolean>(false);
  const [speechTranscript, setSpeechTranscript] = React.useState<string>("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const bodyRef = React.useRef<HTMLInputElement>(null);
  const recognition = new window.webkitSpeechRecognition();

  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "en-US";

  recognition.onstart = () => {
    setIsListening(true);
  };

  recognition.onend = () => {
    setIsListening(false);
  };

  recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
    console.log("Transcript error:", event.error);
  };

  recognition.onresult = (event: SpeechRecognitionEvent) => {
    const transcript = Array.from(event.results)
      .map((result: SpeechRecognitionResult) => result[0])
      .map((result: SpeechRecognitionAlternative) => result.transcript)
      .join("");

    console.log(transcript);
    setSpeechTranscript(transcript);
  };

  React.useEffect(() => {
    if (inputRef.current && inputRef.current === document.activeElement) {
      inputRef.current.value = speechTranscript;
    } else if (bodyRef.current && bodyRef.current === document.activeElement) {
      bodyRef.current.value = speechTranscript;
    }
  }, [speechTranscript]);

  const handleToggleListen = () => {
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };
  return { inputRef, bodyRef, handleToggleListen, isListening };
};

export default useSpeechRecognition;
