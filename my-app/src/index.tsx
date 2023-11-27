import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { App } from './components/App';
import { User } from './components/App/App.types';
import ParentComponent from './components/App/App';

const root = createRoot(document.getElementById('root') as HTMLElement);

const user: User = {
  id: 1,
  name: 'Ivan',
  email: 'lemom123@gmail.com',
};

root.render(
  <StrictMode>
    <App user={user} children="children" />
    <ParentComponent />
  </StrictMode>
);
