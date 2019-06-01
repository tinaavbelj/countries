import React from 'react';
import './Countries.scss';

const Countries = ({ countries, currencies, amountToConvert }) => {

    const RATE_SEK = currencies.rates['SEK'];

    const calculateNewAmount = rateNewCurrency =>
        (amountToConvert * rateNewCurrency / RATE_SEK).toFixed(2);

    return (
        <div className="countries">
            {countries.map(country => (
                <div className="country" key={country.name}>
                    <div className="country-header">
                        <div className="country-name">
                            {country.name}
                        </div>
                        <div className="country-currency">
                            <div className="country-currency-name">
                                {country.currencies[0].code}
                            </div>
                            <div>
                                {calculateNewAmount(currencies.rates[country.currencies[0].code])}
                            </div>
                        </div>
                    </div>
                    <div className="country-additional-information">
                        <div className="country-additional-information-element">
                            <div>
                                Capital
                            </div>
                            <div>
                                {country.capital}
                            </div>
                        </div>
                        <div className="country-additional-information-element">
                            <div>
                                Population
                            </div>
                            <div>
                                {country.population.toLocaleString()}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Countries;
