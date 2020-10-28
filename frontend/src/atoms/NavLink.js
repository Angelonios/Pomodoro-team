import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';

import { Link } from './Link';

export function NavLink({ className, ...rest }) {
  return <Link as={RouterNavLink} {...rest} />;
}
