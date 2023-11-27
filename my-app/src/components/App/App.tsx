import React, { FC, ReactNode, useRef, MouseEvent } from 'react';
import { User } from './App.types';

import { ForwardedPaymentForm } from '../PaymentForm';
import type { PaymentFormHandleRef } from '../PaymentForm';

import { UserProfile } from '../UserProfile';
import { UserProvider } from '../UserProvider';

type Props = {
  user: User;
  children: ReactNode;
};

export const App: FC<Props> = () => {
  const paymentFormRef = useRef<PaymentFormHandleRef>(null);

  const handlePaymentSubmit = async () => {
    const data = await paymentFormRef.current?.submit();
    console.log(data);
  };

  return (
    <div>
      <ForwardedPaymentForm ref={paymentFormRef} />
      <button onClick={handlePaymentSubmit}>Submit</button>

      <UserProvider>
        <UserProfile />
      </UserProvider>
    </div>
  );
};

function ChildComponent() {
  const handleChildClick = (event: MouseEvent<HTMLButtonElement>) => {
    // Зупиняємо спливання події до батьківського компонента
    event.stopPropagation();

    console.log('Клікнуто дитячий компонент');
  };

  return <button onClick={handleChildClick}>Натисни мене</button>;
}

function ParentComponent() {
  const handleParentClick = (event: MouseEvent<HTMLDivElement>) => {
    console.log('Клікнуто батьківський компонент');
  };

  return (
    <div onClick={handleParentClick}>
      <ChildComponent />
    </div>
  );
}

export default ParentComponent;
