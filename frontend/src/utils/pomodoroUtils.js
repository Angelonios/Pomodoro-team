export const convertSecondsToMinutesSting = (seconds) => {
  let min = parseInt(seconds / 60);
  let sec = parseInt(seconds % 60);

  if (seconds < 0) {
    min = '−' + Math.abs(min);
    sec = Math.abs(sec);
  }
  if (sec < 10 && sec > -10) {
    sec = '0' + sec;
  }
  return min + ':' + sec;
};

export const convertSecondsToHours = (seconds) => {
  const HOUR = 3600;
  return parseInt(seconds) / HOUR;
};
