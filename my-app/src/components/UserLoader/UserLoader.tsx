import React, { useReducer, useEffect } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
};

type State = {
  loading: boolean;
  error: string | null;
  user: User | null;
};

type Action = { type: 'LOADING' } | { type: 'SUCCESS'; payload: User } | { type: 'ERROR'; error: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true, error: null };
    case 'SUCCESS':
      return { ...state, loading: false, error: null, user: action.payload };
    case 'ERROR':
      return { ...state, loading: false, error: action.error };
    default:
      throw new Error();
  }
}

const initialState: State = {
  loading: false,
  error: null,
  user: null,
};

export function UserLoader() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const fetchUser = async () => {
      dispatch({ type: 'LOADING' });

      try {
        const response = await fetch('/api/user');
        const user = await response.json();

        dispatch({ type: 'SUCCESS', payload: user });
      } catch (error) {
        dispatch({ type: 'ERROR', error: (error as Error).message });
      }
    };

    fetchUser();
  }, []);

  if (state.loading) return <div>Loading ...</div>;
  if (state.error) return <div>Error: {state.error}</div>;
  if (!state.user) return null;

  return (
    <div>
      <p>{state.user.name}</p>
      <p>{state.user.email}</p>
    </div>
  );
}
