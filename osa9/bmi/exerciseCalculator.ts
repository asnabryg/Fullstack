
interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercises = (hours: number[], target: number): Result => {
    const average: number = (hours.reduce((sum, a) => sum + a, 0)) / hours.length;
    let rating: number = 0;
    let ratingDescription: string = "bad";
    if (average < target) {
        rating = 2;
        ratingDescription = "not too bad but could be better";
    } else {
        rating = 3;
        ratingDescription = "very good";
    }
    return {
        periodLength: hours.length,
        trainingDays: hours.filter(h => h > 0).length,
        success: average >= target,
        rating,
        ratingDescription,
        target,
        average
    }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));