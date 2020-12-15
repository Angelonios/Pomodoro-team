import React from 'react';
import { ProfilePageTemplate } from 'src/templates/ProfilePageTemplate';
import { useAuth } from 'src/utils/auth';
import { ForbiddenPage } from './ForbiddenPage';

export function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return <ForbiddenPage />;
  } else {
    return <ProfilePageTemplate email={user.email} />;
  }
}
