export function pomodoroReducer(state, props) {
  return props.finalTime - parseInt(Date.now() / 1000);
}
