import React from 'react';
import { useState } from 'react';

import { SignUpForm, TopNavigation } from 'src/organisms';

export function SignUpTemplate() {
  const [emailError, updateEmailError] = useState(false);
  const [passwordError, updatePasswordError] = useState(false);
  const [rePasswordError, updateRePasswordError] = useState(false);

  return (
    <>
      <TopNavigation />
      <SignUpForm
        emailError={emailError}
        updateEmailError={updateEmailError}
        passwordError={passwordError}
        updatePasswordError={updatePasswordError}
        rePasswordError={rePasswordError}
        updateRePasswordError={updateRePasswordError}
      />
    </>
  );
}
