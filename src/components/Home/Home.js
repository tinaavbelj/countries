import React, { useState, useEffect } from 'react';
import './Home.scss';
import Search from '../Search/Search';
import Convert from '../Convert/Convert';
import Countries from '../Countries/Countries';

const Home = () => {

    const COUNTRIES_URL = 'https://restcountries.eu/rest/v2/all';
    const CURRENCIES_URL = 'http://data.fixer.io/api/latest?access_key=71c8d0a059e44a12fb9c2ef52b47fef2';

    const [countries, setCountries] = useState({
        data: [],
        filteredData: [],
        error: null,
        loaded: false
    });

    const [currencies, setCurrencies] = useState({
        data: [],
        error: null,
        loaded: false
    });

    const [amountToConvert, setAmountToConvert] = useState(0);

    useEffect(() => {
        fetch(COUNTRIES_URL)
            .then(res => res.json())
            .then(
                result => {
                    setCountries(prevCountries => ({
                        ...prevCountries,
                        data: result,
                        filteredData: result,
                        loaded: true
                    }));
                },
                error => {
                    setCountries(prevCountries => ({
                        ...prevCountries,
                        error,
                        loaded: true
                    }));
                }
            );

        fetch(CURRENCIES_URL)
            .then(res => res.json())
            .then(
                result => {
                    setCurrencies(prevCurrencies => ({
                        ...prevCurrencies,
                        data: result,
                        loaded: true
                    }));
                },
                error => {
                    setCurrencies(prevCurrencies => ({
                        ...prevCurrencies,
                        error,
                        loaded: true
                    }));
                }
            );
    }, []);

    const handleFilter = filter => {
        const filteredCountries = countries.data.filter(country =>
            country.name.toLowerCase().startsWith(filter.toLowerCase())
        );
        setCountries(prevCountries => ({ ...prevCountries, filteredData: filteredCountries }));
    };

    const handleConvert = amount => setAmountToConvert(amount);

    if (countries.error || currencies.error) {
        return <div className="error-message">Error: {countries.error.message}</div>;
    } else if (!countries.loaded || !currencies.loaded) {
        return <div className="loading">Loading...</div>;
    } else {
        return (
            <div>
                <div className="header">
                    <Search onFilter={ handleFilter } />
                    <Convert onConvert={ handleConvert } />
                </div>
                <div className="content">
                    <Countries countries={ countries.filteredData } currencies={ currencies.data } amountToConvert={ amountToConvert } />
                </div>
            </div>
        );
    }
}

export default Home;
