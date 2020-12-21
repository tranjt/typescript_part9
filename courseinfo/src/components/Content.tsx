import React from 'react';
import { Course, ContentProps } from '../types';


const Content: React.FC<ContentProps> = ({ courseParts }) => {
  return (
    <div>
      {Object.values(courseParts).map((course: Course) => (
        <p key={course.name}>{course.name} { course.exerciseCount}</p>
      ))}
    </div>
  )
};

export default Content