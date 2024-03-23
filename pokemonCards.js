// Ideal layout for the Pokemon Cards
// <section class="Pokemon-Cards"></section>
// <div class="Pokemon-Card">
//   <span class="Pokemon-ID">1</span>
//   <span class="Pokemon-Name">Bulbasaur</span>
//   <img class="Pokemon-Image" src="" alt="Bulbasaur" />
//   <div class="Pokemon-Types">
//     <span class="Pokemon-Type">Grass</span>
//     <span class="Pokemon-Type">Poison</span>
//   </div>
// </div>

// Load 30 at a time and then load more when the user scrolls to the bottom of the page
// Once loaded, they should be displayed in the Pokemon-Cards section
// The Pokemon-Card should display the ID, Name, Image, and Types of the Pokemon
// 1 - 1025 is the range of Pokemon IDs that should be displayed
// Later we will implement alternate forms, mega evolutions, and gigantamax forms
// Display card should be it's own function so that it can be reused in other parts of the application (Search, Favorites, etc.)
const cards = document.querySelector(".Pokemon-Cards");

function pokemonCards() {
  let pokemonID = 1;
  let pokemonCount = 40;
  while (pokemonID <= pokemonCount && pokemonID <= 1025) {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonID}/`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let pokemon = {
          id: data.id,
          name: data.name,
          image: data.sprites.other.home.front_default,
          types: data.types,
        };
        displayPokemon(pokemon);
      })
      .catch((error) => console.log(error));
    pokemonID++;
  }
  window.addEventListener("scroll", () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      pokemonID <= 1025
    ) {
      pokemonCount += 20;
      while (pokemonID <= pokemonCount) {
        let url = `https://pokeapi.co/api/v2/pokemon/${pokemonID}/`;
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            let pokemon = {
              id: data.id,
              name: data.name,
              image: data.sprites.other.home.front_default,
              types: data.types,
            };
            displayPokemon(pokemon);
          })
          .catch((error) => console.log(error));
        pokemonID++;
      }
    }
  });
}
function displayPokemon(pokemon) {
  let card = document.createElement("div");
  card.classList.add("Pokemon-Card");
  let idName = document.createElement("div");
  idName.classList.add("Pokemon-ID-Name");
  let id = document.createElement("span");
  id.classList.add("Pokemon-ID");
  id.textContent = pokemon.id;
  idName.appendChild(id);
  let name = document.createElement("span");
  name.classList.add("Pokemon-Name");
  name.textContent =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  idName.appendChild(name);
  let image = document.createElement("img");
  image.classList.add("Pokemon-Image");
  image.src = pokemon.image;
  image.alt = pokemon.name;
  let types = document.createElement("div");
  types.classList.add("Pokemon-Types");
  if (pokemon.types) {
    pokemon.types.forEach((type) => {
      let span = document.createElement("span");
      span.classList.add(type.type.name + "-type");
      span.textContent =
        type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1);
      types.appendChild(span);
    });
  }
  card.appendChild(idName);
  card.appendChild(image);
  card.appendChild(types);
  cards.appendChild(card);
  card.addEventListener("click", () => {
    window.location.href = `${pokemon.name}`;
  });
}

pokemonCards();
