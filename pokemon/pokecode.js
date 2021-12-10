import { removeChildren } from '../utility/index.js'

function getAPIData(url) {
  try {
    return fetch(url).then((data) => data.json());
  } catch (error) {
    console.error(error);
  }
}

function loadPokemon(offset = 0, limit = 25) {
  getAPIData(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  ).then(async (data) => {
    for (const pokemon of data.results) {
      await getAPIData(pokemon.url).then((pokeData) =>
        populatePokeCard(pokeData)
      );
    }
  });
}

loadPokemon(0, 25)

const pokeGrid = document.querySelector(".pokeGrid");

const moreButton = document.querySelector('.moreButton')
moreButton.addEventListener('click', () => {
    let limit = prompt('How many more Pokemon should I load?')
    let offset = prompt('At which Pokemon ID should I start loading?')
    loadPokemon(offset, limit)
})

const createButton = document.querySelector(".createButton");
createButton.addEventListener("click", () => {
  let pokeName = prompt("What is the name of your new Pokemon?");
  let pokeHeight = prompt("How tall is this Pokemon?");
  let pokeWeight = prompt("How heavy is this Pokemon?");
  let pokeAbilities = prompt ("What are your Pokemon's abilities? (use a comma separated list)")
  let pokeTypes = prompt ("Which type(s) is your Pokemon? (one or two, separated by a space)")
  let newPokemon = new Pokemon(pokeName, pokeHeight, pokeWeight, getAbilitiesArray(pokeAbilities), getTypesArray(pokeTypes))
  populatePokeCard(newPokemon)
});

function getAbilitiesArray(commaString) {
    let tempArray = commaString.split(',')
    return tempArray.map((abilityName) => {
        return {
            ability: {
                name: abilityName
            }
        }
    })
}

function getTypesArray(spacedString) {
  let tempArray = spacedString.split(' ')
  return tempArray.map((typeName) => {
    return {
      type: {
        name: typeName
      },
    }
  })
}

class Pokemon {
  constructor(name, height, weight, abilities) {
    (this.id = 100), (this.name = name), (this.height = height), (this.weight = weight), this.abilities = abilities;
  }
}

function populatePokeCard(singlePokemon) {
  const pokeScene = document.createElement("div");
  pokeScene.className = "scene";
  const pokeCard = document.createElement("div");
  pokeCard.className = "card";
  pokeCard.addEventListener("click", () =>
    pokeCard.classList.toggle("is-flipped")
  );

  const front = populateCardFront(singlePokemon);
  const back = populateCardBack(singlePokemon);

  pokeCard.appendChild(front);
  pokeCard.appendChild(back);
  pokeScene.appendChild(pokeCard);
  pokeGrid.appendChild(pokeScene);
}

function populateCardFront(pokemon) {
  const pokeFront = document.createElement("figure");
  pokeFront.className = "cardFace front";
  const pokeImg = document.createElement("img");
  pokeImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

  const pokeCaption = document.createElement("figcaption");
  pokeCaption.textContent = `${pokemon.name.toUpperCase()}`;
  pokeFront.appendChild(pokeImg);
  pokeFront.appendChild(pokeCaption);

  typesBackground(pokemon, pokeFront)
  return pokeFront;
}

function typesBackground(pokemon, card) {
    let pokeType1 = pokemon.types[0].type.name
    let pokeType2 = pokemon.types[1]?.type.name
    if (!pokeType2) {
      card.style.setProperty('background', getPokeTypeColor(pokeType1))
    } else {
      card.style.setProperty(
          'background',
          `linear-gradient(${getPokeTypeColor(pokeType1)}, ${getPokeTypeColor(pokeType2)})`)
    }
}

function populateCardBack(pokemon) {
  const pokeBack = document.createElement("div");
  pokeBack.className = "cardFace back";
  
  const abilDiv = document.createElement("div");
  pokeBack.appendChild(abilDiv);
  abilDiv.className = "abilDiv";

  const typeDiv = document.createElement("div");
  pokeBack.appendChild(typeDiv);
  typeDiv.className = "typeDiv";

  const typeLabel = document.createElement('h4')
  typeLabel.textContent = "Types:";
  typeDiv.appendChild(typeLabel);

  const label = document.createElement("h4");
  label.textContent = "Abilities:";
  abilDiv.appendChild(label);

  const abilityList = document.createElement("ul");
  pokemon.abilities.forEach((abilityItem) => {
    let listItem = document.createElement("li");
    listItem.textContent = `${abilityItem.ability.name[0].toUpperCase()}${abilityItem.ability.name.slice(1)}`;
    abilityList.appendChild(listItem);
  });
  const typesList = document.createElement('ul')
  pokemon.types.forEach((pokeType) => {

    let typeItem = document.createElement('li')
    typeItem.textContent = pokeType.type.name
    typesList.appendChild(typeItem)
  })
  typeDiv.appendChild(typesList)
  abilDiv.appendChild(abilityList);
  return pokeBack;
}

function getPokeTypeColor(pokeType) {
  let color
  switch (pokeType) {
      case 'grass':
          color = '#67F70A'
          break
      case 'fire':
          color = '#FC0C0B'
          break
      case 'water':
          color = '#08517A'
          break
      case 'ground':
          color = '#BFAC21'
          break
      case 'bug':
          color = '#085764'
          break
      case 'flying':
          color = '#085764'
          break
      case 'poison':
          color = '#1D0728'
          break
      case 'electric':
          color = '#969101'
          break
      case 'psychic':
          color = '#8A0532'
          break
      case 'fighting':
          color = '#800B11'
          break
      case 'normal':
          color = '#ACA974'
          break
      case 'rock':
          color = '#474026'
          break
      case 'ice':
          color = '#103D43'
          break
      case 'ghost':
          color = '#472B53'
          break
      case 'dragon':
          color = '#29036A'
          break
      case 'dark':
          color = '##2D221C'
          break
      case 'steel':
          color = '#454545'
          break
      case 'fairy':
          color = '#F87EA7'
          break
      case 'default':
          color = '#EEEEEE'
          break
  }
  return color
}
