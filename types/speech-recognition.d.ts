interface SpeechRecognitionResult {
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}

interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
  readonly interpretation: any;
}

interface SpeechRecognitionErrorEvent extends Event {
  readonly error: SpeechRecognitionError;
}

interface SpeechRecognitionError {
  readonly error: string;
  readonly message: string;
}
