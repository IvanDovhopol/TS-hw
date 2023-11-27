import React, { useEffect } from 'react';
import { useUserState, useUserActions } from '../UserProvider';

export function UserProfile() {
  const { user } = useUserState();
  const { setUser } = useUserActions();

  useEffect(() => {
    setTimeout(() => {
      setUser({
        name: 'Ivan D',
        email: 'lemon123@gmail.com',
      });
    }, 2000);
  }, [setUser]);

  if (!user) return <p>Loading ...</p>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
