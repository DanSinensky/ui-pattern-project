const baseUrl = "https://restcountries.com/v3.1"
const form = document.querySelector("form")
const button = document.querySelector("button")
const name = document.querySelector(".name")

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

const populate = (name) => {
  const country = new Country(name.flag, name.name.official, name.name.common, name.capital, name.borders, name.continents, name.subregion, name.flags.png, name.languages)
}

form.addEventListener("submit", e => {
  e.preventDefault()
  fetch(`${baseUrl}/name/${e.target.elements.country.value}`)
  .then(res => {
    console.log("success", res)
    return res.json()
  })
  .then(data => {
    console.log(data[0])
    const country = data[0]
    populate(country)
  })
  .catch(error => {
    console.error("Something went wrong...", error)
  })
})

button.addEventListener("click", e => {
  fetch(`${baseUrl}/all`)
  .then(res => {
    console.log("success", res)
    return res.json()
  })
  .then(data => {
    console.log(data)
    const country = data[Math.floor(Math.random()*data.length)]
    console.log(country)
    populate(country)
  })
  .catch(error => {
    console.error("Something went wrong...", error)
  })
})