import React, { useEffect, useState } from "react";
import "./dashboard.styles.scss";
import CurrencyInput from "../currencyInput/currencyInput.index";

const BASE_URL = "https://api.exchangeratesapi.io/latest";

export default function Dashboard() {
  const [currencyOption, setCurrencyOption] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRates, setExchangeRates] = useState();
  const [amount, setAmount] = useState(1);
  const [amountFromCurrency, setAmountFromCurrency] = useState(true);

  let toAmount, fromAmount;
  if (amountFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRates;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRates;
  }

  useEffect(() => {
    fetch(BASE_URL)
      .then((response) => response.json())
      .then((data) => {
        const firstCurrency = Object.keys(data.rates)[0];
        setCurrencyOption([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);
        setExchangeRates(data.rates[firstCurrency]);
      });
  }, []);

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then((res) => res.json())
        .then((data) => setExchangeRates(data.rates[toCurrency]));
    }
  }, [fromCurrency, toCurrency]);

  const handleFromAmount = (e) => {
    setAmount(e.target.value);
    setAmountFromCurrency(true);
  };

  const handleToAmount = (e) => {
    setAmount(e.target.value);
    setAmountFromCurrency(false);
  };
  return (
    <div>
      <h2>Convert your currency</h2>
      <CurrencyInput
        currencyOption={currencyOption}
        selectedCurrency={fromCurrency}
        onChangeCurrency={(e) => setFromCurrency(e.target.value)}
        amount={fromAmount}
        onChangeAmount={handleFromAmount}
      />
      <div className="equalsTo"> = </div>
      <CurrencyInput
        currencyOption={currencyOption}
        selectedCurrency={toCurrency}
        onChangeCurrency={(e) => setToCurrency(e.target.value)}
        amount={toAmount}
        onChangeAmount={handleToAmount}
      />
    </div>
  );
}
