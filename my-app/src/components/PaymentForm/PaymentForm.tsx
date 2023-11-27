import React, { useState, useImperativeHandle, forwardRef } from 'react';
import type { ForwardedRef } from 'react';

type SendPaymentType = {
  method: string;
  headers: { [x: string]: string };
  body: string;
};

async function sendPayment(paymentData: { cardNumber: string; cardHolderName: string }): Promise<SendPaymentType> {
  const response = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(paymentData),
  };

  return Promise.resolve(response);
}

type Props = {};

export type PaymentFormHandleRef = {
  submit: () => Promise<SendPaymentType>;
};

export function PaymentForm(props: Props, ref: ForwardedRef<PaymentFormHandleRef>) {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(e.target.value);
  };

  const handleCardHolderNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardHolderName(e.target.value);
  };

  useImperativeHandle(ref, () => ({
    submit: () => sendPayment({ cardNumber, cardHolderName }),
  }));

  return (
    <form>
      <input type="text" value={cardNumber} onChange={handleCardNumberChange} placeholder="Card Number" />
      <input
        type="text"
        value={cardHolderName}
        onChange={handleCardHolderNameChange}
        placeholder="Cardholder Name"
      ></input>
    </form>
  );
}

export const ForwardedPaymentForm = forwardRef<PaymentFormHandleRef, Props>(PaymentForm);
