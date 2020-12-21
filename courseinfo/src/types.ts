export interface Course {
  name: string;
  exerciseCount: number;
}

export interface ContentProps {
  courseParts: Course[];
}

export interface HeaderProps {
  name: string;
}