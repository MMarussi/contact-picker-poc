import React from 'react';

function DatePrices({ datePrices, date }) {
  return (
    datePrices.length > 0 && (
      <div className="column center m-bottom-20 container">
        <span className="self-start m-bottom-10">{date}</span>
        <div className="row space-between middle prices">
          {datePrices.map((price) => {
            const [coin] = Object.keys(price);
            return (
              <div key={`${date}-${coin}`} className="column center middle p-horizontal-10 price-container">
                <span className="m-bottom-10">{`1 - ${coin}`}</span>
                <span>{`USD ${price[coin].USD}`}</span>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
}
export default DatePrices;
