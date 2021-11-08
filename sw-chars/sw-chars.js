import { people } from '../data/people.js'
import { getLastNumber, removeChildren } from '../utility/index.js'

const main = document.querySelector('#main')

const mainHeader = document.createElement("header")
document.body.insertBefore(mainHeader, main)

const allButton = document.createElement('button')
allButton.textContent = 'All Characters'
allButton.addEventListener('click', () => populateDOM(people))
mainHeader.appendChild(allButton)

const maleButton = document.createElement("button")
maleButton.textContent = 'Male Characters'
maleButton.addEventListener('click', () => populateDOM(maleCharacters))
mainHeader.appendChild(maleButton)

const femaleButton = document.createElement('button')
femaleButton.textContent = 'Female Characters'
femaleButton.addEventListener('click', () => populateDOM(femaleCharacters))
mainHeader.appendChild(femaleButton)

const otherButton = document.createElement("button")
otherButton.textContent = 'Other Characters'
otherButton.addEventListener('click', () => populateDOM(otherCharacters))
mainHeader.appendChild(otherButton)

const greenButton = document.createElement("button")
greenButton.textContent = "Characters for Whom it Ain't Easy Bein'"
greenButton.addEventListener('click', () => populateDOM(greenCharacters))
mainHeader.appendChild(greenButton)

const salamiButton = document.createElement("button")
salamiButton.textContent = "Characters Who Can Have a Little Salami as a Treat"
salamiButton.addEventListener('click', () => populateDOM(salamiCharacters))
mainHeader.appendChild(salamiButton)

const trapButton = document.createElement("button")
trapButton.textContent = "Characters Who Think It's a Trap"
trapButton.addEventListener('click', () => populateDOM(trapCharacters))
mainHeader.appendChild(trapButton)

const notButton = document.createElement("button")
notButton.textContent = "Characters Who are Definitely NOT Robots Why Would You Think That?"
notButton.addEventListener('click', () => populateDOM(notCharacters))
mainHeader.appendChild(notButton)

const GreedoButton = document.createElement("button")
GreedoButton.textContent = "Characters Who Didn't Shoot First"
GreedoButton.addEventListener('click', () => populateDOM(greedo))
mainHeader.appendChild(GreedoButton)

const maleCharacters = people.filter((person) => person.gender === 'male')

const femaleCharacters = people.filter((person) => person.gender === 'female')

const otherCharacters = people.filter((person) => {
  if (
    person.gender === 'n/a' ||
    person.gender === 'hermaphrodite' ||
    person.gender === 'none'
  ) {
    return person
  }
})

const greenCharacters = people.filter((person) => person.skin_color === 'green')

const salamiCharacters = people.filter((person) => person.name === "Wicket Systri Warrick")

const trapCharacters = people.filter((person) => person.name === "Ackbar")

const notCharacters = people.filter((person) => person.name === "Lobot")

const greedo = people.filter((person) => person.name === "Greedo")

function populateDOM(characters) {
  removeChildren(main)
  
characters.forEach((element) => {
  const personFig = document.createElement('figure')
  const personImg = document.createElement('img')
  let charNum = getLastNumber(element.url)
  personImg.src = `https://starwars-visualguide.com/assets/img/characters/${charNum}.jpg`
  const personCaption = document.createElement('figcaption')
  personCaption.textContent = element.name

  personFig.appendChild(personImg)
  personFig.appendChild(personCaption)

  main.appendChild(personFig)
})
}
