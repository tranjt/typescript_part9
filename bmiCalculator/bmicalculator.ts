
type BMICategory = 'Very severely underweight' |
  'Severely underweight' |
  'Underweight' |
  'Normal (healthy weight)' |
  'Overweight' |
  'Obese Class I (Moderately obese)' |
  'Obese Class II (Severely obese)' |
  'Obese Class III (Very severely obese)';


const calculateBmi = (height: number, weight: number): BMICategory => {
  const BMI = weight /((height / 100) ^ 2);

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
}

console.log(calculateBmi(180, 74));