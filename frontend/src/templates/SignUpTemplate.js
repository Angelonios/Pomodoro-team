import React from 'react';
import { useState } from 'react';

import { SignUpForm, TopNavigation } from 'src/organisms';
import { PageTitle } from 'src/utils/userNotification/PageTitle';

export function SignUpTemplate() {
  const [emailError, updateEmailError] = useState(false);
  const [passwordError, updatePasswordError] = useState(false);
  const [rePasswordError, updateRePasswordError] = useState(false);

  return (
    <>
      <PageTitle pageName="Sign up" />
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
