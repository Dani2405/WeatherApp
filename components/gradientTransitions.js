const goodWeatherTransitions = [
  ["#0e244c", "#021527"], // < 5
  ["#677bb5", "#13469c"], // < 6
  ["#A0D3FF", "#edcf9c"], // < 7
  ["#a3defb", "#aee7ff"], // < 8
  ["#70CEFF", "#28bdf3"], // < 17
  ["#B2D7FF", "#FFC0CB"], // < 18
  ["#F2CA88", "#FFB3BB"], // < 19
  ["#ffb3c5", "#8d68ea"], // < 20
  ["#715cb5", "#4845cc"], // < 21
  ["#051923", "#2C7BC2"], // < 22
  ["#0c1835", "#184777"], // <= 23
]

const badWeatherTransitions = [
  ["#242429", "#000000"], // < 5
  ["#B5DFF5", "#759ABB"], // < 13
  ["#7eaec5", "#5484a8"], // < 15
  ["#5c99b3", "#29597e"], // < 17
  ["#265063", "#173a5a"], // < 19
  ["#979797", "#4c4c4c"], // < 21
  ["#4e4e55", "#11171c"], // <= 23
]

export const getGradient = (weatherGroupId, hourOfDay) => {
  let index;

  if(weatherGroupId < 800) {
    if (hourOfDay < 5)
      index = 0;
    else if (hourOfDay < 13)
      index = 1;
    else if (hourOfDay < 15)
      index = 2;
    else if (hourOfDay < 17)
      index = 3;
    else if (hourOfDay < 19)
      index = 4;
    else if (hourOfDay < 21)
      index = 5;
    else if (hourOfDay <= 23)
      index = 6;

    return badWeatherTransitions[index];
  }

  if (hourOfDay < 5)
    index = 0;
  else if (hourOfDay < 6)
    index = 1;
  else if (hourOfDay < 7)
    index = 2;
  else if (hourOfDay < 8)
    index = 3;
  else if (hourOfDay < 17)
    index = 4;
  else if (hourOfDay < 18)
    index = 5;
  else if (hourOfDay < 19)
    index = 6;
  else if (hourOfDay < 20)
    index = 7;
  else if (hourOfDay < 21)
    index = 8;
  else if (hourOfDay < 22)
    index = 9;
  else if (hourOfDay <= 23)
    index = 10;

    return goodWeatherTransitions[index];
}