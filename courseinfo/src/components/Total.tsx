import React from 'react';
import { Course, ContentProps } from '../types';


const Total: React.FC<ContentProps> = ({ courseParts }) => {
  return (
    <div>
      Number of exercises{": "}
      {Object.values(courseParts).reduce((carry: number, course: Course) => (
        carry + course.exerciseCount
      ), 0)}
    </div>
  )
};

export default Total

