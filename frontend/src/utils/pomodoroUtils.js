export const convertSecondsToMinutesSting = (remainingSeconds) => {
  let min = parseInt(remainingSeconds / 60);
  let sec = parseInt(remainingSeconds % 60);

  if (remainingSeconds < 0) {
    min = '−' + Math.abs(min);
    sec = Math.abs(sec);
  }
  if (sec < 10 && sec > -10) {
    sec = '0' + sec;
  }
  return min + ':' + sec;
};
