interface BMI {
    height: number
    weight: number
}

const parseArgumentsBmi = (args: Array<string>): BMI => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  return checkNaN(args[2], args[3]);
};

const checkNaN = (height: unknown, weight: unknown) => {
    if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
      return {
          height: Number(height),
          weight: Number(weight)
      };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

const parseArgumentsBmiGet = (values: Record<string, unknown>): BMI => {
    if (!values.height || !values.weight) throw new Error('parameters missing');
    return checkNaN(values.height, values.weight);
};

const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / ((height/100)*(height/100));
    if (bmi < 15) {
        return "Very severely underweight";
    } else if (bmi < 16) {
        return "Severely underweight";
    } else if (bmi < 18.5) {
        return "Underweight";
    } else if (bmi < 25) {
        return "Normal (healthy weight)";
    } else if (bmi < 30) {
        return "Overweight";
    } else if (bmi < 35) {
        return "Obese Class I (Moderately obese)";
    } else if (bmi < 40) {
        return "Obese Class II (Severely obese)";
    }
    return "Obese Class III (Very severely obese)";
    
};

try {
    const { height, weight } = parseArgumentsBmi(process.argv);
    console.log(calculateBmi(height, weight));
} catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
}

export { calculateBmi, parseArgumentsBmiGet };
