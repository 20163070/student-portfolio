export type Course = {
  id: string;
  name: string;
  englishName?: string;
};

export type CourseworkDocument = {
  label: string;
  url: string;
  description: string;
  role: "solution" | "assignment" | "material" | "other";
  format: "pdf" | "image" | "file";
};

export type Coursework = {
  slug: string;
  title: string;
  courseId?: string;
  semester?: string;
  assignmentNumber?: string;
  /** Confirmed ISO dates only; a partial date belongs in dateLabel. */
  date?: string;
  updatedAt?: string;
  dateLabel?: string;
  summary: string;
  tags: string[];
  background: string;
  myRole: string;
  topics: string[];
  focus: string[];
  notes: string[];
  status: string;
  screenshots: {
    src: string;
    alt: string;
    caption: string;
    width: number;
    height: number;
  }[];
  documentNote?: string;
  documents: CourseworkDocument[];
};
