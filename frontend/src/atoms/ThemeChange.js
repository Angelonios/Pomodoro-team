import React, { useContext } from 'react';
import { IconButton } from '@material-ui/core';
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
    <IconButton
      aria-controls="simple-menu"
      aria-haspopup="true"
      style={{ padding: '6px' }}
      onClick={handleThemeChange}
    >
      {isDark ? (
        <Brightness7Icon color="action" />
      ) : (
        <Brightness6Icon color="action" />
      )}
    </IconButton>
  );
}
