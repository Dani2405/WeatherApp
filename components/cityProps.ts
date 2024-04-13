export type CityProps = {
  handleCityChange: (newCityName: string) => void,
  weatherData: any,
  setWeatherData?: (value: (((prevState: null) => null) | null)) => void
};

export const getLocalTime = (timezoneOffset: number) => {
  const utcTime = new Date();

  utcTime.setHours(utcTime.getUTCHours() + timezoneOffset / 3600, utcTime.getUTCMinutes(), utcTime.getUTCSeconds())
  return (utcTime.getHours().toString().padStart(2, "0") + ":" + utcTime.getMinutes().toString().padStart(2, "0"));
};

export const getLocalTimeHour = (timezoneOffset: number) => {
  const utcTime = new Date();

  utcTime.setHours(utcTime.getUTCHours() + timezoneOffset / 3600, utcTime.getUTCMinutes(), utcTime.getUTCSeconds())
  return (utcTime.getHours());
};

export const getOffsettedFormattedDate = (timezoneOffset: number) => {
  const utcTime = new Date();
  utcTime.setHours(utcTime.getUTCHours() + timezoneOffset / 3600, utcTime.getUTCMinutes(), utcTime.getUTCSeconds());

  const isPastMidnight = utcTime.getHours() >= 24;

  const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  };

  if (isPastMidnight) utcTime.setDate(utcTime.getDate() - 1);

  // @ts-ignore
  return utcTime.toLocaleString('en-US', options);
};

export const getDayNames = (timezoneOffset: number) => {
  const days: any[] = [];
  const utcTime = new Date();
  utcTime.setHours(utcTime.getUTCHours() + timezoneOffset / 3600, utcTime.getUTCMinutes(), utcTime.getUTCSeconds());

  const isPastMidnight = utcTime.getHours() >= 24;
  const options = {weekday: 'long'};

  if (isPastMidnight) utcTime.setDate(utcTime.getDate() - 1);

  for (let i = 0; i < 4; i++) {
    let date = new Date();
    date.setDate(utcTime.getDate() + i + 1);
    // @ts-ignore
    days[i] = date.toLocaleString('en-US', options);
  }

  return days;
}