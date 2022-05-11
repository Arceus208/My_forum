export const getTime = (timeStamp: number) => {
  const timePass = Date.now() - timeStamp;
  const milisInOneDay = 24 * 60 * 60 * 1000;
  const milisInOneHour = 60 * 60 * 1000;
  const days = Math.floor(timePass / milisInOneDay);
  const hours = Math.floor((timePass - days * milisInOneDay) / milisInOneHour);
  const minutes = Math.round(
    (timePass - days * milisInOneDay - hours * milisInOneHour) / 60000
  );

  if (days === 1) {
    return days + " day";
  } else if (days > 1) {
    return days + " days";
  }

  if (hours === 1) {
    return hours + " hour";
  } else if (hours > 1) {
    return hours + " hours";
  }

  if (minutes === 1) {
    return minutes + " minute";
  }

  return minutes + " minutes ";
};
