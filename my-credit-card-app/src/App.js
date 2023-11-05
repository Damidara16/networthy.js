import React, { useState } from 'react';
import CreditCardForm from './CreditCardForm';

function App() {
  const [netWorth, setNetWorth] = useState(0);
  console.log(process.env)
  return (
    <div className="App" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <h1>Check Your Net Worth</h1>
      <CreditCardForm setNetWorth={setNetWorth} />
      <h1>You are worth ${netWorth.toLocaleString()}</h1>
    </div>
  );
}

export default App;
