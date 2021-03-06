export const formatTime = (unixTimestamp: number, twelveHour: boolean): string => {
  const date = new Date(unixTimestamp);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const min = minutes < 10 ? `0${minutes}` : minutes;

  if (twelveHour) {
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const strTime = `${hours}:${min} ${ampm}`;
    return strTime;
  } else {
    return `${hours}:${min}`;
  }
};
