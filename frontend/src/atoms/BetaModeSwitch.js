import React from 'react';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export function BetaModeSwitch() {
  if (!window.localStorage.getItem('beta')) {
    window.localStorage.setItem('beta', false);
  }

  var beta = JSON.parse(window.localStorage.getItem('beta'));

  const [checked, setChecked] = React.useState(beta);

  const toggleChecked = () => {
    if (checked) {
      window.localStorage.setItem('beta', false);
      setChecked(false);
    } else {
      window.localStorage.setItem('beta', true);
      setChecked(true);
    }
  };

  return (
    <FormControlLabel
      control={
        <Switch checked={beta} onChange={toggleChecked} color="primary" />
      }
      label="Beta mode"
    />
  );
}
