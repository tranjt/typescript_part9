import React from 'react';
import { CoursePart } from '../types';

interface ContentProps {
  courseParts: CoursePart[];
}

const Total: React.FC<ContentProps> = ({ courseParts }) => {
  return (
    <div>
      Number of exercises{": "}
      {courseParts.reduce((carry, course) => (
        carry + course.exerciseCount
      ), 0)}
    </div>
  )
};

export default Total

