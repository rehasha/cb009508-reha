var orders;
var currentData;
var totalCost = 0;
orders = [];

function formHandler(event) {
  event.preventDefault();

  let activity;
  let passType;
  let duration;
  let adults;
  let children;
  let date;
  let tokens;
  let cost;
  let currentOrder;
  var formData;
  let data;
  let obj;
  // define

  currentOrder = [];

  formData = new FormData(event.target.form);

  data = Object.fromEntries(formData.entries());

  // data from obj

  activity = data.activity;
  passType = data.passes;
  duration = data.duratiom;
  adults = data.noOfAdult;
  children = data.noOfChild;
  date = data.date;
  tokens = data.noOfTokens;

  // disabling elements

  if (passType == 2 || passType == 3) {
    form.elements['duratiom'].disabled = true;
    form.elements['noOfTokens'].disabled = true;
  }

  // passType compare

  if (passType == 0) {
    // foreign

    cost = adults * 5000 + children * 2500;
    data['passes'] = 'Foreign Pass';
  } else if (passType == 1) {
    // local

    cost = adults * 1000 + children * 500;
    data['passes'] = 'Local Pass';
  } else if (passType == 2) {
    // f annual

    cost = (adults + children) * 15000;
    data['passes'] = 'Foreign Annual Pass';
  } else {
    // l annual

    cost = (adults + children) * 4500;
    data['passes'] = 'Local Annual Pass';
  }

  // duration logic

  // 1/2 day
  if (duration == 1) {
    // l or f
    if (passType == 1) {
      let temp = (adults + children) * 250;
      cost += temp;
    }
    if (passType == 0) {
      let temp = (adults + children) * 500;
      cost += temp;
    }
  }

  // full day
  if (duration == 2) {
    if (passType == 1) {
      let temp = (adults + children) * 500;
      cost += temp;
    }
    if (passType == 0) {
      let temp = (adults + children) * 1000;

      cost += temp;
    }
  }

  // tokens
  if (!tokens == 0) {
    let temp = tokens * 500;
    cost += temp;
  }

  let spaner = form.querySelector('#spCost');

  spaner.textContent = cost;

  // key to obj
  data['cost'] = cost;

  currentData = data;
}

const form = document.querySelector('form');

form.addEventListener('change', formHandler);

function addOrder(event) {
  totalCost = 0;
  console.log(orders);

  // checking if current order's cost > 0
  if (!currentData['cost'] == 0) {
    orders.push(currentData);

    let spanner2 = form.querySelector('#overallGtotal');

    for (let i of orders) {
      totalCost += i['cost'];
      spanner2.textContent = totalCost;
    }

    // clear da form
    form.reset();

    // assigning 0 to clear
    currentData = {
      cost: 0,
    };

    // generating a table

    let table = document.getElementById('table');

    table.innerHTML = '';

    let header = table.createTHead();

    // headers

    let titles = [
      'Activity',
      'Pass Type',
      'No of Adults',
      'No of Children',
      'No of Tokens',
      'Date',
      'Duration',
      'Cost',
    ];

    for (let i of titles) {
      let index = titles.indexOf(i);

      header
        .appendChild(document.createElement('th'))
        .appendChild(document.createTextNode(i));

      console.log(i);
    }

    // looper

    for (let obj of orders) {
      let row = document.createElement('tr');
      for (let val of Object.values(obj)) {
        let col = document.createElement('td');
        col.textContent = val;
        row.appendChild(col);
      }
      table.appendChild(row);
    }
  } else {
    alert('No Order');
  }
}

const addOrderBtn = form.elements['AddOrder'];

addOrderBtn.addEventListener('click', addOrder);

function placeOrder(event) {
  event.preventDefault();

  alert('Thank You for your Order');

  // clearing orders
  orders = [];

  totalCost = 0;

  let table = document.getElementById('table');

  table.innerHTML = '';
}

const placeOrderBtn = form.elements['placeOrder'];

placeOrderBtn.addEventListener('click', placeOrder);
