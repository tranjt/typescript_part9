type trainingRating = 'bad' | 'pretty good' | 'good' | 'very good';

interface trainingResult {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: trainingRating,
  target: number,
  average: number
}

const reducer = (acc: number, curr: number): number => acc + curr;

const getRating = (days: number, hours: number): number => {
  const average = hours / days
  if (average < 2) {
    return 1
  } else if (average >= 2 && average < 3) {
    return 2
  } else if (average >= 3) {
    return 3
  }
}

const getRatingDescription = (rating: number): trainingRating => {
  if (rating < 1) {
    return 'bad'
  } else if (rating >= 1 && rating < 2) {
    return 'pretty good'
  } else if (rating >= 2 && rating < 3) {
    return 'good'
  } else if (rating >= 3) {
    return 'very good'
  }
}

const calculateExercises = (trainingData: Array<number>, target: number): trainingResult => {
  const totalDays = trainingData.length;
  const trainingDays = trainingData.filter(Number);
  const totalHours = trainingData.reduce(reducer, 0);
  const rating = getRating(totalDays, totalHours);

  return {
    periodLength: totalDays,
    trainingDays: trainingDays.length,
    success: totalHours / totalDays >= target,
    rating,
    ratingDescription: getRatingDescription(rating),
    target,
    average: totalHours / totalDays,
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))