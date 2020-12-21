import React from 'react';
import { CoursePart } from '../types';

interface ContentProps {
  part: CoursePart;
}

const Part: React.FC<ContentProps> = ({ part }) => {
  /**
 * Helper function for exhaustive type checking
 */
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const renderPart = () => {
    switch (part.name) {
      case 'Fundamentals':
        return <p>Course: {part.name} count: {part.exerciseCount} description: {part.description}</p>
      case 'Using props to pass data':
        return <p>Course: {part.name} count: {part.exerciseCount} groupProjectCount: {part.groupProjectCount}</p>
      case 'Deeper type usage':
        return <p>Course {part.name} count: {part.exerciseCount} description: {part.description} url: {part.exerciseSubmissionLink}</p>
      case 'My part':
        return <p>Course: {part.name} count: {part.exerciseCount} description: {part.description} groupName: {part.groupName} </p>
      default:
        return assertNever(part);
    }
  }

  return (
    <div>
      {renderPart()}
    </div>
  )
};

export default Part