const searchInput = document.getElementById('search');
const searchButton = document.getElementById('searchButton');
const displayDiv = document.getElementById('results');
const searchType = document.getElementById('searchType');
const searchTypeButton = document.getElementById('searchTypeButton');
const typeResults = document.getElementById('typeResults');


const searchPokemon = async (pokemonId) => {
  searchInput.value = "";
  try {
    const { data } = await axios.get(`http://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  
  console.log(data)
  createContainer(data);
  }
  catch(e) {
    alert(e.message)
    return e;
  }
};

//searchPokemon();
searchInput.addEventListener('keydown', (event) => {
  if (event.keyCode == 13){
    displayDiv.innerHTML = "";
    searchPokemon(searchInput.value)}})


searchButton.addEventListener('click', () => {
  displayDiv.innerHTML = "";
  searchPokemon(searchInput.value)})


const createContainer = (data) => {
  const tempPoke = [document.createElement('div') , 
                    document.createElement('div') , 
                    document.createElement('div'), 
                    document.createElement('ul'),
                    document.createElement('img')
                    ];
  tempPoke[0].innerHTML = `name: ${data.name}`; 
  tempPoke[1].innerHTML = `height: ${data.height}`; 
  tempPoke[2].innerHTML = `weight: ${data.weight}`; 
  tempPoke[4].src = data.sprites.front_default;
  tempPoke[4].addEventListener('mouseover', ()=> {tempPoke[4].src = data.sprites.back_default});
  tempPoke[4].addEventListener('mouseleave', ()=> {tempPoke[4].src = data.sprites.front_default});

  //types:
  const types = []
  for (let i = 0; i< data.types.length; i++){
    let temp = document.createElement('li')
    temp.innerHTML = data.types[i].type.name;
    tempPoke[3].appendChild(temp);
  }

  tempPoke.forEach(element => {displayDiv.appendChild(element)});
  
}


