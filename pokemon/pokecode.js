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

const pokeGrid = document.querySelector(".pokeGrid");
const loadButton = document.querySelector(".loadButton");
loadButton.addEventListener("click", () => {
    removeChildren(pokeGrid)
    loadPokemon(100, 5)
}
);

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
  let newPokemon = new Pokemon(pokeName, pokeHeight, pokeWeight, getAbilitiesArray(pokeAbilities))
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
  pokeCaption.textContent = pokemon.name;
  pokeFront.appendChild(pokeImg);
  pokeFront.appendChild(pokeCaption);

  typesBackground(pokemon, pokeFront)
  return pokeFront;
}

function typesBackground(pokemon, card) {
    let pokeType1 = pokemon.types[0].type.name
    let pokeType2 = pokemon.types[1]?.type.name
    card.style.setProperty(
        'background',
        `linear-gradient(${getPokeTypeColor(pokeType1)}, ${getPokeTypeColor(pokeType2)})`)
}

function getPokeTypeColor(pokeType) {
    let color
    switch (pokeType) {
        case 'grass':
            color = '#00FF00'
            break
        case 'fire':
            color = '#FF0000'
            break
        case 'water':
            color = '#0000FF'
            break
        case 'bug':
            color = '#BF7600'
            break
        case 'flying':
            color = '#D1EDE6'
            break
        case 'poison':
            color = '#BFF50D'
            break
        case 'electric':
            color = '#FFEB01'
            break
        case 'psychic':
            color = '#000000'
            break
        case 'normal':
            color = '#D4E6B3'
            break
        case 'default':
            color = '#EEEEEE'
            break
    }
}

function populateCardBack(pokemon) {
  const pokeBack = document.createElement("div");
  pokeBack.className = "cardFace back";
  const label = document.createElement("h4");
  label.textContent = "Abilities:";
  pokeBack.appendChild(label);
  const abilityList = document.createElement("ul");
  pokemon.abilities.forEach((abilityItem) => {
    let listItem = document.createElement("li");
    listItem.textContent = abilityItem.ability.name;
    abilityList.appendChild(listItem);
  });
  pokeBack.appendChild(abilityList);
  return pokeBack;
}
