document.addEventListener("DOMContentLoaded", () => {
 "use strict"

  const earnings = document.querySelector('#earnings');
  const coins = document.querySelector('#coins');

  const percent = document.querySelector('#percent');
  const capital = document.querySelector('#capital');
  const buy = document.querySelector('#buy');
  const sale = document.querySelector('#sale');
  const total = document.querySelector('#total');

  const resetBtn = document.querySelector('#reset');

  const getData = () => {
    const data = JSON.parse(localStorage.getItem('data'));

    if (data) {
      earnings.textContent = `${data.earnings}$`;
      coins.textContent = data.coins;
      total.textContent = `${data.total}$`;
      percent.value = data.percent;
      capital.value = data.capital;
      buy.value = data.buy;
      sale.value = data.sale;
    }
  }

  getData();

  const setData = () => {
    const data = {
      earnings: earnings.textContent.slice(0, -1),
      coins: coins.textContent,
      percent: percent.value,
      capital: capital.value,
      buy: buy.value,
      sale: sale.value,
      total: total.textContent.slice(0, -1)
    }

    localStorage.setItem('data', JSON.stringify(data));
  }

  const numberFormat = (num, length) => {
    return `${num}`.indexOf('.') === -1 ? num : parseFloat(num.toFixed(length));
  }

  const inputLengthHandler = (input, length) => {
    if (+input.value.length >= length) {
      input.value = input.value.slice(0, length);
    }
  }

  const resetHandler = () => {
    earnings.textContent = '0.00$';
    coins.textContent = '0.00';
    total.textContent = '0.00$';
    percent.value = 2.5;
    capital.value = 1;
    buy.value = '';
    buy.placeholder = '0.00';
    sale.value = '';
  }

  const saleHandler = (input) => {
    return sale.value = +input.value
      ? numberFormat(+buy.value + (+buy.value * (+percent.value / 100)), 3)
      : '';
  }

  const coinsHandler = (input) => {
    return coins.textContent = +input.value
      ? numberFormat(+capital.value / +buy.value, 10)
      : '0.00';
  }

  const earningsHandler = (input) => {
    return earnings.textContent = +input.value
      ? numberFormat((+sale.value * +coins.textContent) - +capital.value, 3) + '$'
      : '0.00$';
  }

  const totalHandler = (input) => {
    return total.textContent = +input.value
      ? numberFormat(+coins.textContent * +sale.value, 3)  + '$'
      : '0.00$';
  }

  buy.addEventListener('input', () => {
    inputLengthHandler(buy, 7);
    saleHandler(buy);
    coinsHandler(buy);
    earningsHandler(buy);
    totalHandler(buy);

    buy.placeholder = !+buy.value && '0.00';
    percent.value = +buy.value ? +percent.value : 2.5;

    setData();
  });

  sale.addEventListener('input', () => {
    inputLengthHandler(sale, 7);

    percent.value = +sale.value && +buy.value
      ? numberFormat((((+sale.value * +coins.textContent) - +capital.value) / +capital.value) * 100, 2)
      : 2.5;

    buy.placeholder = !+buy.value
      ? (+sale.value - (+sale.value * (+percent.value / 100))).toFixed(2)
      : '0.00';

    earnings.textContent = +sale.value && +buy.value
      ? numberFormat((+sale.value * +coins.textContent) - +capital.value, 3) + '$'
      : '0.00$';

    totalHandler(sale);
    setData();
  });

  percent.addEventListener('input', () => {
    inputLengthHandler(percent, 6);

    sale.value = +buy.value
      ? numberFormat(+buy.value + (+buy.value * (+percent.value / 100)), 3)
      : '';

    earnings.textContent = +sale.value && +buy.value
      ? numberFormat((+sale.value * +coins.textContent) - +capital.value, 3) + '$'
      : '0.00$';

    coins.textContent = +buy.value
      ? numberFormat(+capital.value / +buy.value, 10)
      : '0.00';

    total.textContent = +buy.value && +sale.value
      ? numberFormat(+coins.textContent * +sale.value, 3)  + '$'
      : '0.00$';

    setData();
  });

  capital.addEventListener('input', () => {
    inputLengthHandler(capital, 7);

    coins.textContent = +capital.value && +buy.value
      ? numberFormat(+capital.value / +buy.value, 10)
      : '0.00';

    earnings.textContent = +capital.value && +buy.value
      ? numberFormat((+sale.value * +coins.textContent) - +capital.value, 3) + '$'
      : '0.00$';

    total.textContent = +capital.value && +buy.value && +sale.value
      ? numberFormat(+coins.textContent * +sale.value, 3)  + '$'
      : '0.00$';

    setData();
  });

  resetBtn.addEventListener('click', () => {
    resetHandler();
    localStorage.removeItem('data');
  });
})