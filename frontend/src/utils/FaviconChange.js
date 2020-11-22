import React from 'react';
function getFaviconEl() {
  return document.getElementById('favicon');
}
export function FaviconChange({ color }) {
  const favicon = getFaviconEl();
  if ((color = 'red')) {
    favicon.href = '/red-tomato.svg';
  }
  if ((color = 'grey')) {
    favicon.href = '/grey-tomato.svg';
  }
  if ((color = 'yellow')) {
    favicon.href = '/yellow-tomato.svg';
  }
  if ((color = 'green')) {
    favicon.href = '/green-tomato.svg';
  }
}
