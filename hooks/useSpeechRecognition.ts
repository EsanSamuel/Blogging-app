import React from "react";

const useSpeechRecognition = () => {
  const [isListening, setIsListening] = React.useState<boolean>(false);
  const [speechTranscript, setSpeechTranscript] = React.useState<string>("");
  const [input, setInput] = React.useState<any>("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const bodyRef = React.useRef<HTMLInputElement>(null);
  const speechRecognition = new window.webkitSpeechRecognition();

  speechRecognition.continuous = true;
  speechRecognition.interimResults = true;
  speechRecognition.lang = "en-US";

  speechRecognition.onstart = () => {
    setIsListening(true);
  };

  speechRecognition.onend = () => {
    setIsListening(false);
  };

  speechRecognition.onerror = (event: SpeechRecognitionErrorEvent) => {
    console.log("Transcript error:", event.error);
  };

  speechRecognition.onresult = (event: SpeechRecognitionEvent) => {
    const transcript = Array.from(event.results)
      .map((result: SpeechRecognitionResult) => result[0])
      .map((result: SpeechRecognitionAlternative) => result.transcript)
      .join("");

    console.log("Transcript:", transcript);
    setSpeechTranscript(transcript);
  };

  React.useEffect(() => {
    if (inputRef.current && inputRef.current === document.activeElement) {
      inputRef.current.value = speechTranscript;
      setInput(speechTranscript);
    } else if (bodyRef.current && bodyRef.current === document.activeElement) {
      bodyRef.current.value = speechTranscript;
    }
  }, [speechTranscript]);

  const handleToggleListen = () => {
    if (isListening) {
      speechRecognition.stop();
    } else {
      speechRecognition.start();
    }
  };
  return { inputRef, bodyRef, handleToggleListen, isListening, input };
};

export default useSpeechRecognition;
