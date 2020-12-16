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
    return 1;
  } else if (average >= 2 && average < 3) {
    return 2;
  } else if (average >= 3) {
    return 3;
  }
}

const getRatingDescription = (rating: number): trainingRating => {
  if (rating < 1) {
    return 'bad';
  } else if (rating >= 1 && rating < 2) {
    return 'pretty good';
  } else if (rating >= 2 && rating < 3) {
    return 'good';
  } else if (rating >= 3) {
    return 'very good';
  }
}

interface execiseData {
  target: number;
  trainingData: Array<number>;
}

const parseArguments = (args: Array<string>): execiseData => {

  const data = args.slice(2).map(v => Number(v));
  if (!data.some(isNaN)) {
    return {
      target: data[0],
      trainingData: data.slice(1)
    }
  } else {
    throw new Error('Some provided values were not numbers!');
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

try {
  const { target, trainingData } = parseArguments(process.argv);
  console.log(calculateExercises(trainingData, target));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}