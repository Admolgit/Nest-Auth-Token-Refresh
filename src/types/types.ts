// Polymorphic Question Types
type Question = FillTheGapQuestion | VideoContentQuestion;

interface VideoContentQuestion {
  instruction: string;
  question: {
    videoUrl: string;
  };
  activityType: 'VideoContentActivity';
  options: VideoContentOption[];
  answer: string;
}

interface VideoContentOption {
  id: string;
  text: string;
  audioUrl: string;
}

interface FillTheGapQuestion {
  instruction: string;
  activityType: 'FillTheGapActivity';
  imageUrl?: string;
  audioUrl?: string;
  question: string;
  options: FillTheGapLessonOption[];
  answer: string[];
}

interface FillTheGapLessonOption {
  id: string;
  text: string;
  audioUrl: string;
}