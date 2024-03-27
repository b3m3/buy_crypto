document.addEventListener("DOMContentLoaded", () => {
 "use strict"

  const earnings = document.querySelector('#earnings');
  const coins = document.querySelector('#coins');

  const percent = document.querySelector('#percent');
  const capital = document.querySelector('#capital');
  const buy = document.querySelector('#buy');
  const sale = document.querySelector('#sale');

  const resetBtn = document.querySelector('#reset');

  const numberFormat = (num, length) => {
    return `${num}`.indexOf('.') === -1 ? num : num.toFixed(length);
  }

  const inputLengthHandler = (input, length) => {
    if (+input.value.length >= length) {
      input.value = input.value.slice(0, length)
    }
  }

  const resetHandler = () => {
    earnings.textContent = '0.00$';
    coins.textContent = '0.00';
    percent.value = 2.5;
    capital.value = 1;
    buy.value = '';
    buy.placeholder = '0.00';
    sale.value = '';
  }

  buy.addEventListener('input', () => {
    inputLengthHandler(buy, 7);

    sale.value = +buy.value
      ? numberFormat(+buy.value + (+buy.value * (+percent.value / 100)), 3)
      : '';

    coins.textContent = +buy.value
      ? numberFormat(+capital.value / +buy.value, 10)
      : '0.00';

    earnings.textContent = +buy.value
      ? numberFormat((+sale.value * +coins.textContent) - +capital.value, 3) + '$'
      : '0.00$';

    buy.placeholder = !+buy.value && '0.00';
    percent.value = +buy.value ? +percent.value : 2.5;
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
  });

  percent.addEventListener('input', () => {
    inputLengthHandler(percent, 6);

    sale.value = +percent.value
      ? numberFormat(+buy.value + (+buy.value * (+percent.value / 100)), 3)
      : '';

    earnings.textContent = +percent.value
      ? numberFormat((+sale.value * +coins.textContent) - +capital.value, 3) + '$'
      : '0.00$';

    coins.textContent = +percent.value
      ? numberFormat(+capital.value / +buy.value, 10)
      : '0.00';
  });

  capital.addEventListener('input', () => {
    inputLengthHandler(capital, 7);

    coins.textContent = +capital.value
      ? numberFormat(+capital.value / +buy.value, 10)
      : '0.00';

    earnings.textContent = +capital.value
      ? numberFormat((+sale.value * +coins.textContent) - +capital.value, 3) + '$'
      : '0.00$';
  });

  resetBtn.addEventListener('click', resetHandler);
})