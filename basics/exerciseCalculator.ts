interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

interface Input {
    hours: number[],
    target: number
}

const parseArguments = (args: Array<string>): Input => {
  if (args.length < 4) throw new Error('Not enough arguments');
  let i = 3;
  const hours = [];
  if (!isNaN(Number(args[2])))
  while(args[i]) {
    if (!isNaN(Number(args[i]))) {
        hours.push(Number(args[i]));
    } else {
        throw new Error('Provided values were not numbers');
    }
    i++;
  }
  
  const target = Number(args[2]);
  return {
      hours,
      target
  };
};

const parseArgumentsPost = (exercises: string[], target: string): Input => {
  if (typeof exercises === 'string' || exercises.length < 1) throw new Error('malformatted parameters');
  if (isNaN(Number(target))) throw new Error('Provided values were not numbers');
  exercises.forEach(e => { if (isNaN(Number(e))) {
    throw new Error('Provided values were not numbers');
  }});
  return {
    target: Number(target),
    hours: exercises.map(e => Number(e))
  };
};

const calculateExercises = (hours: number[], target: number) : Result => {
  const periodLength = hours.length;
  const trainingDays = hours.filter(hour => hour !== 0 ).length;
  const average = hours.reduce((a, b) => a+b,0) / periodLength;
  const success = average >= target;

  let rating = 1;
  let ratingDescription = 'awful';
  if (target - average > 0 && target - average < 0.5) {
      rating = 2;
    ratingDescription = 'average';
    
  } else if (target - average <= 0) {
    rating = 3;
    ratingDescription = 'awesome';
  }

  return { periodLength, trainingDays, success, rating, ratingDescription, target, average };
};

try {
    const { hours, target } = parseArguments(process.argv);
    console.log(calculateExercises(hours, target));
} catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log('Error, something bad happened, message: ', e.message);
}

export { calculateExercises, parseArgumentsPost };