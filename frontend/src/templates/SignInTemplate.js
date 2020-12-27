import React from 'react';

import { TopNavigation, SignInForm } from 'src/organisms';
import { PageTitle } from 'src/utils/userNotification/PageTitle';

export function SignInTemplate() {
  return (
    <>
      <PageTitle pageName={'Sign in'} />
      <TopNavigation />
      <SignInForm />
    </>
  );
}
