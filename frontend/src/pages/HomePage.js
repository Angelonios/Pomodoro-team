import React from 'react';
import { route } from 'src/Routes';

export function HomePage() {
  return (
    <div className="appWrapper">
      <h1>Home Page</h1>
      <p>
        Hello! Sign-in or <a href={route.signUp()}>create account</a>
      </p>
    </div>
  );
}
