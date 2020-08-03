const searchInput = document.getElementById('search');
const searchButton = document.getElementById('searchButton');
const displayDiv = document.getElementById('results');


const searchPokemon = async (pokemonId = 3) => {
  const { data } = await axios.get(`http://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  console.log(data)
};
searchPokemon();

searchButton.addEventListener('click', () => {searchPokemon(parseInt(searchInput.value))})

