const countriesContainer = document.querySelector(".countries-container");
const filterByRegion = document.querySelector(".filter-by-region");
const searchInput = document.querySelector(".search-container");

const themeChanger = document.querySelector(".theme-changer");

let allCountriesData = [];
let contriesFilter = [];

function afficherTousLesPays() {
  fetch("https://restcountries.com/v3.1/all/")
    .then((res) => res.json())
    .then((data) => {
      renderCountries(data);
      allCountriesData = data;
    });
}
afficherTousLesPays();

function renderCountries(data) {
  countriesContainer.innerHTML = "";
  data.forEach((pays) => {
    const countryCard = document.createElement("a");
    countryCard.classList.add("country-card");
    countryCard.href = `details.html?name=${pays.name.common}`;
    countryCard.innerHTML = `
        <img src="${pays.flags.png}" alt="flag">
        <div class="card-text">
            <h3 class="card-title">${pays.name.common}</h3>
            <p><b>Population: </b>${pays.population.toLocaleString("en-US")}</p>
            <p><b>Region: </b>${pays.region}</p>
            <p><b>Capital: </b>${pays.capital?.[0]}</p>
        </div>
        `;
    countriesContainer.append(countryCard);
  });
}

function paysParContinent() {
  const selectContinent = document.querySelector(".filter-by-region");
  const countrySearch = document.querySelector(".search-country");

  selectContinent.addEventListener("change", updateDisplayedCountries);
  countrySearch.addEventListener("input", updateDisplayedCountries);

  function updateDisplayedCountries() {
    const selectedContinent = selectContinent.value.toLowerCase();
    const searchTerm = countrySearch.value.trim().toLowerCase();

    const filteredCountries = allCountriesData.filter((pays) => {
      return (
        (selectedContinent === "all" ||
          pays.region.toLowerCase() === selectedContinent) &&
        pays.name.common.toLowerCase().includes(searchTerm)
      );
    });
    renderCountries(filteredCountries);
  }
}
paysParContinent();

themeChanger.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
