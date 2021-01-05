import React from "react";
import "./currencyInput.styles.scss";

export default function CurrencyInput(props) {
  const {
    currencyOption,
    selectedCurrency,
    onChangeCurrency,
    amount,
    onChangeAmount,
  } = props;
  return (
    <div className='mainWrap'>
      <input
        type="number"
        name="number"
        className="currency-input"
        value={amount}
        onChange={onChangeAmount}
      />
      <select
        className="currency-select"
        value={selectedCurrency}
        onChange={onChangeCurrency}
      >
        {currencyOption.map((option, index) => (
          <option value={option} key={index}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
