import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

export function Link({
  children,
  className,
  noUnderline,
  as: Component = RouterLink,
  ...rest
}) {
  return <Component {...rest}>{children}</Component>;
}
