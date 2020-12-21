import React from 'react';
import { CoursePart } from '../types';
import Part from './Part'


interface ContentProps {
  courseParts: CoursePart[];
}


const Content: React.FC<ContentProps> = ({ courseParts }) => {
  return (
    <div>
      {courseParts.map((course) => (
        <Part key={course.name} part={course} />
      ))}
    </div>
  )
};

export default Content