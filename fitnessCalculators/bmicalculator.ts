
type BMICategory = 'Very severely underweight' |
  'Severely underweight' |
  'Underweight' |
  'Normal (healthy weight)' |
  'Overweight' |
  'Obese Class I (Moderately obese)' |
  'Obese Class II (Severely obese)' |
  'Obese Class III (Very severely obese)';

interface BodyValues {
  height: number;
  weight: number;
}
const parseBMIArguments = (args: Array<string>): BodyValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateBmi = (height: number, weight: number): BMICategory | undefined => {
  const BMI = weight / Math.pow((height / 100), 2);

  if (0 <= BMI && BMI <= 15) {
    return 'Very severely underweight';
  } else if (15 < BMI && BMI <= 16) {
    return 'Severely underweight';
  } else if (16 < BMI && BMI <= 18.5) {
    return 'Underweight';
  } else if (18.5 < BMI && BMI <= 25) {
    return 'Normal (healthy weight)';
  } else if (25 < BMI && BMI <= 30) {
    return 'Overweight';
  } else if (30 < BMI && BMI <= 35) {
    return 'Obese Class I (Moderately obese)';
  } else if (35 < BMI && BMI <= 40) {
    return 'Obese Class II (Severely obese)';
  } else if (40 < BMI) {
    return 'Obese Class III (Very severely obese)';
  }
  return undefined;
}

try {
  const { height, weight } = parseBMIArguments(process.argv);
  console.log(calculateBmi(height, weight))

} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}