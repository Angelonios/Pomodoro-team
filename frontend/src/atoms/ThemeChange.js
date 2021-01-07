import React, { useContext } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness6Icon from '@material-ui/icons/Brightness6';
import { CustomThemeContext } from 'src/utils/ThemeContext';

export function ThemeChange() {
  const { currentTheme, setTheme } = useContext(CustomThemeContext);
  var isDark = currentTheme === 'dark';

  const handleThemeChange = () => {
    if (isDark) {
      setTheme('light');
      isDark = !isDark;
    } else {
      setTheme('dark');
      isDark = !isDark;
    }
  };

  return (
    <Tooltip title="Toggle light/dark theme">
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        style={{ padding: '6px', color: '#fff' }}
        onClick={handleThemeChange}
      >
        {isDark ? <Brightness7Icon /> : <Brightness6Icon />}
      </IconButton>
    </Tooltip>
  );
}
