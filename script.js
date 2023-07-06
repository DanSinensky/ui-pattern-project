const baseUrl = "https://restcountries.com/v3.1"
const form = document.querySelector("form")
const randomButton = document.querySelector(".random-button")
const name = document.querySelector(".name")
const main = document.querySelector("main")
const bars = document.querySelectorAll(".bar")
const hamburger = document.querySelector(".hamburger")
const aside = document.querySelector("aside")
const flags = document.querySelector(".flags")
const common = document.querySelector(".common")
const official = document.querySelector(".official")
const img = document.querySelector("img")
const capital = document.querySelector(".capital")
const borders = document.querySelector(".borders")
const subregion = document.querySelector(".subregion")
const flagArray = []

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
  e.target.elements.country.value = ""
})

randomButton.addEventListener("click", e => {
  fetch(`${baseUrl}/all`)
    .then(res => {
      console.log("success", res)
      return res.json()
    })
    .then(data => {
      const country = data[Math.floor(Math.random() * data.length)]
      displayUI(country)
    })
    .catch(error => {
      console.error("Something went wrong...", error)
    })
})

function displayUI(country) {
  const print = country => {
    common.innerText = country.name.common
    official.innerText = country.name.official
    img.src = country.flags.png
    img.alt = `Flag of ${country.name.common}`
    capital.innerText = country.capital
    if (country.borders === undefined) {
      borders.innerText = "Island"
    } else {
      borders.innerText = country.borders
    }
    subregion.innerText = country.subregion
  }
  print(country)
  let flag = document.createElement("p")
  flag.classList.add("flag-icon")
  flag.dataset.commonName = country.name.common
  flag.innerText = country.flag
  if (flagArray.includes(country.flag) === false) {
    flags.appendChild(flag)
    flagArray.push(country.flag)
  }
  flag.addEventListener("click", e => {
    fetch(`${baseUrl}/name/${flag.dataset.commonName}`)
    .then(res => {
      console.log("success", res)
      return res.json()
    })
    .then(data => {
      const country = data[0]
      print(country)
    })
    .catch(error => {
      console.error("Something went wrong...", error)
    })
  })
}

bars.forEach(bar => {
  bar.addEventListener("click", e => {
    hamburger.classList.toggle("change");
    aside.classList.toggle("hidden")
  })
})