import React from 'react';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export function BetaModeSwitch() {
  const [checked, setChecked] = React.useState(true);

  const toggleChecked = () => {
    setChecked((prev) => !prev);
  };

  return (
    <FormControlLabel
      control={
        <Switch checked={checked} onChange={toggleChecked} color="primary" />
      }
      label="Beta mode"
    />
  );
}
