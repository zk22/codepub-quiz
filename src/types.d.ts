interface Quiz {
  id: string;
  name: string;
  questions: Question[];
}

interface Question {
  id: string;
  label: string;
  options: Option[];
  correctOption?: string;
  selectedOption?: string;
}

interface Option {
  id: string;
  label: string;
}

interface Result {
  correct?: number;
  total?: number;
}
