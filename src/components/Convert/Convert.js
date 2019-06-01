import React, { useState } from 'react';
import './Convert.scss';

const Convert = ({ onConvert }) => {

    const [amount, setAmount] = useState(0);

    const handleChange = event => {
        const currentAmount = event.target.value.replace(/\D/g, "");
        setAmount(currentAmount);
    };

    const handleClick = () => onConvert(amount);

    return (
        <div className="convert">
            <input className="convert-input" placeholder="Amount (SEK)" onChange={ handleChange } />
            <button className="convert-button" onClick={ handleClick } >Convert</button>
        </div>
    );
};

export default Convert;
