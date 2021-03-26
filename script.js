const tbody = document.querySelector('tbody');
const totalCases = document.querySelector('.totalcases-p');
const peopledied = document.querySelector('.peopledied-p');
const peoplerecovered = document.querySelector('.peoplerecovered-p');
const updateTime = document.querySelector('.updateTime');

const updateData = function (date) {
  updateTime.innerHTML = `<p class ="newupdate"> The data of this covid tracker will be update in 60 minutes...Last Updated ${date} ago
</p>
`;
};
//Intl num
const intlNum = function (num) {
  return new Intl.NumberFormat('hi-IN').format(num);
};

const updateGlobal = function (global) {
  totalCases.textContent = intlNum(global.TotalConfirmed);
  peopledied.textContent = intlNum(global.TotalDeaths);
  peopledied.style.color = 'red';
  peoplerecovered.textContent = intlNum(global.TotalRecovered);
};

const updateList = function (country) {
  country.forEach((country, i) => {
    const markup = `
    <tr class="allcountries">
    <td class="number">${i + 1}</td>
    <td class="country">${country.Country}</td>
    <td class="newconfirm yellow">${
      country.NewConfirmed == 0 ? 0 : `+${intlNum(country.NewConfirmed)}`
    }</td>
    <td class="newdeaths ${country.NewDeaths !== 0 ? 'red' : ''}">${intlNum(
      country.NewDeaths
    )}</td>
    <td class="newrecovered">${intlNum(country.NewRecovered)}</td>
    <td class="totalconfirm yellow">${intlNum(country.TotalConfirmed)}</td>
    <td class="totaldeaths">${intlNum(country.TotalDeaths)}</td>
    <td class="totalrecovered">${intlNum(country.TotalRecovered)}</td>
  </tr>
      `;
    tbody.insertAdjacentHTML('beforeend', markup);
  });
};

const tracker = async function () {
  try {
    const res = await fetch('https://api.covid19api.com/summary');
    const data = await res.json();
    const { Countries } = data;
    const { Global } = data;
    const date = new Date(data.Date);
    console.log(date);
    updateData(date);
    updateGlobal(Global);
    updateList(Countries);
  } catch (err) {
    console.log(err);
  }
};
tracker();
