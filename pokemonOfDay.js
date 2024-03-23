// id = "POTD-Card"
// Idea: Each day a random universal pokemon is selected and displayed on the home page under the "Pokemon of the Day" section. This pokemon will be displayed with its image, number, and name. When the user clicks on the card, they will be taken to the pokemon's page.
// We need to set a range of numbers for the random number generator to select from. This range should exlude mega evolutions, alternate forms, and gigantamax forms. We can use the following ranges:
// 1-1025, This range includes all pokemon from generation 1-9

function pokemonOfDay() {
  const today = new Date();
  const seed =
    today.getFullYear() * 10000 +
    (today.getMonth() + 1) * 100 +
    today.getDate();
  const pokemonID = (seed % 1025) + 1;
  let url = `https://pokeapi.co/api/v2/pokemon/${pokemonID}/`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let pokemon = {
        name: data.name,
        number: data.id,
        image: data.sprites.other.home.front_default,
      };
      displayPokemonOfDay(pokemon);
    })
    .catch((error) => console.log(error));
}

function displayPokemonOfDay(pokemon) {
  let card = document.getElementById("POTD-Card");
  let image = document.createElement("img");
  image.src = pokemon.image;
  image.alt = pokemon.name;
  let number = document.createElement("span");
  number.textContent = `#${pokemon.number}`;
  let name = document.createElement("span");
  name.textContent = pokemon.name;
  card.appendChild(image);
  card.appendChild(number);
  card.appendChild(name);
  card.addEventListener("click", () => {
    window.location.href = `${pokemon.name}`;
  });
}

pokemonOfDay();
