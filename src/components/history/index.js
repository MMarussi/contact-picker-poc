import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

import { API_URL } from '../../constants/api';

import DatePrices from './components/datePrice';

const COINS = ['BTC', 'ETH', 'LTC'];

const times = {
  today: moment(),
  yesterday: moment().subtract(1, 'days'),
  twodays: moment().subtract(2, 'days')
};

const getCryptoPrices = (date) =>
  Promise.all(COINS.map((coin) => axios.get(`${API_URL}historical?fsym=${coin}&tsyms=USD&ts=${date}`)));

function History() {
  const [todayPrices, setTodayPrices] = useState([]);
  const [yesterdayPrices, setYesterdayPrices] = useState([]);
  const [twodaysPrices, setTwodaysPrices] = useState([]);

  useEffect(() => {
    getCryptoPrices(times.today.unix()).then((prices) => setTodayPrices(prices.map((price) => price.data)));
    getCryptoPrices(times.yesterday.unix()).then((prices) =>
      setYesterdayPrices(prices.map((price) => price.data))
    );
    getCryptoPrices(times.twodays.unix()).then((prices) =>
      setTwodaysPrices(prices.map((price) => price.data))
    );
  }, []);

  return (
    <div className="column center container">
      <h2 className="header self-start">Prices history</h2>
      <DatePrices datePrices={todayPrices} date={times.today.format('MMMM Do YYYY')} />
      <DatePrices datePrices={yesterdayPrices} date={times.yesterday.format('MMMM Do YYYY')} />
      <DatePrices datePrices={twodaysPrices} date={times.twodays.format('MMMM Do YYYY')} />
    </div>
  );
}

export default History;
