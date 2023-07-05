const baseUrl = "https://restcountries.com/v3.1"
const form = document.querySelector("form")
const randomButton = document.querySelector(".random-button")
const name = document.querySelector(".name")
const main = document.querySelector("main")
const hamburger = document.querySelector(".hamburger")

class Country {
  constructor(flagIcon, officialName, commonName, capital, borders, continents, subregion, flags, languages) {
    this.flagIcon = flagIcon
    this.officialName = officialName
    this.commonName = commonName
    this.capital = capital
    this.borders = borders
    this.continents = continents
    this.subregion = subregion
    this.flags = flags
    this.languages = languages
  }
}

form.addEventListener("submit", e => {
  e.preventDefault()
  fetch(`${baseUrl}/name/${e.target.elements.country.value}`)
  .then(res => {
    console.log("success", res)
    return res.json()
  })
    .then(data => {
      const country = data[0]
      displayUI(country)
    })
  .catch(error => {
    console.error("Something went wrong...", error)
  })
})

randomButton.addEventListener("click", e => {
  fetch(`${baseUrl}/all`)
  .then(res => {
    console.log("success", res)
    return res.json()
  })
  .then(data => {
    const country = data[Math.floor(Math.random()*data.length)]
    displayUI(country)
  })
  .catch(error => {
    console.error("Something went wrong...", error)
  })
})

function displayUI(country) {
  let html = `
      <div class="country">
        <h1>${country.name.common} ${country.flag}</h1>
        <h2>${country.name.official}</h2>
        <img src="${country.flags.png}" alt="Flag of ${country.name.common}">
        <p>${country.capital}</p>
        <p>${country.borders}</p>
        <p>${country.continents}</p>
        <p>${country.subregion}</p>
      </div>`

      main.insertAdjacentHTML("beforeend", html)
}
  
hamburger.addEventListener("click", e => {
  e.target.classList.toggle("change");
})