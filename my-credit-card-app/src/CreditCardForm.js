import React, { useState } from 'react';
import './index.css';

function CreditCardForm({ setNetWorth }) {
    const [cardData, setCardData] = useState({
        cardNumber: '',
        expiry: '',
        cvv: '',
    });
    const [errors, setErrors] = useState([]);
    const [errorFields, setErrorFields] = useState({
        cardNumber: false,
        expiry: false,
        cvv: false,
    });

    const handleChange = (e) => {
        setCardData({ ...cardData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/submit-credit-card', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cardData),
            });
            const data = await response.json();
            setErrors(data.errors);
            setErrorFields(data.errorFields);
            setNetWorth(data.netWorth);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="cardNumber"
                value={cardData.cardNumber}
                onChange={handleChange}
                placeholder="Card Number"
                className={errorFields.cardNumber ? 'error' : ''}
            />
            <input
                type="month"
                name="expiry"
                value={cardData.expiry}
                onChange={handleChange}
                placeholder="MM/YY"
                className={errorFields.expiry ? 'error' : ''}
            />
            <input
                type="text"
                name="cvv"
                value={cardData.cvv}
                onChange={handleChange}
                placeholder="CVV"
                className={errorFields.cvv ? 'error' : ''}
            />
            <button onClick={handleSubmit} type="submit">Submit</button>

            <ul style={{ color: 'red' }}>
                {errors.map(error => (<li key={error} style={{ marginBottom: '5px' }}>{error}</li>))}
            </ul>

        </form>
    );
}

export default CreditCardForm;
