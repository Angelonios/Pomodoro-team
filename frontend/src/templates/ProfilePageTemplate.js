import React from 'react';
import { Avatar } from 'src/molecules';
import { TopNavigation } from 'src/organisms';

export function ProfilePageTemplate({ email }) {
  return (
    <>
      <TopNavigation />
      <Avatar email={email} />
    </>
  );
}
