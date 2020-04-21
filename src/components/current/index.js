import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { API_URL } from '../../constants/api';

function CurrentPrice() {
  const [bitcoinPrice, setBitcoinPrice] = useState(0);
  const [ethereumPrice, setEthereumPrice] = useState(0);
  const [litecoinPrice, setLitecoinPrice] = useState(0);

  useEffect(() => {
    setInterval(() => {
      if (navigator.onLine) {
        axios
          .get(`${API_URL}multi?fsyms=BTC,ETH,LTC&tsyms=USD`)
          .then((response) => {
            localStorage.setItem('BTC', response.data.BTC.USD);
            setBitcoinPrice(response.data.BTC.USD);
            localStorage.setItem('ETH', response.data.ETH.USD);
            setEthereumPrice(response.data.ETH.USD);
            localStorage.setItem('LTC', response.data.LTC.USD);
            setLitecoinPrice(response.data.LTC.USD);
          })
          .catch((error) => console.log(error));
      } else {
        setBitcoinPrice(localStorage.getItem('BTC') || '-');
        setEthereumPrice(localStorage.getItem('ETH') || '-');
        setLitecoinPrice(localStorage.getItem('LTC') || '-');
      }
    }, 10000);
  }, []);

  return (
    <div className="column center container">
      <h2 className="header self-start">Current Price</h2>
      <div className="row space-between middle prices">
        <div className="column center middle p-horizontal-5 price-container">
          <span className="m-bottom-10">1 - BTC</span>
          <span>{`USD ${bitcoinPrice}`}</span>
        </div>
        <div className="column center middle p-horizontal-5 price-container">
          <span className="m-bottom-10">1 - ETH</span>
          <span>{`USD ${ethereumPrice}`}</span>
        </div>
        <div className="column center middle p-horizontal-5 price-container">
          <span className="m-bottom-10">1 - LTC</span>
          <span>{`USD ${litecoinPrice}`}</span>
        </div>
      </div>
    </div>
  );
}

export default CurrentPrice;
