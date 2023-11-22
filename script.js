let pokemonName;
let pontos = 0;
let imgElement;

const randomPokemonId = Math.floor(Math.random() * 898) + 1;

const apiUrl = `https://pokeapi.co/api/v2/pokemon/${randomPokemonId}/`;
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${randomPokemonId}.png`;
    
    // Nome do Pokémon + Código pra deixar formatado (pikachu -> Pikachu)
    pokemonName = data.name.charAt(0).toUpperCase() + data.name.slice(1).toLowerCase();
    pokemonName = pokemonName.split('-')[0]

    imgElement = document.createElement('img');
    imgElement.src = imageUrl;
    imgElement.style.filter = 'brightness(0)';

    const container = document.getElementById('pokemon-container');
    container.appendChild(imgElement);
  })
  .catch(error => {
    console.error('Erro:', error);
  })

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function verificarTentativa() {
    let tentativaInput = document.getElementById('tentativa');
    let tentativa = capitalizeFirstLetter(tentativaInput.value);
    let resultado;
    document.getElementById('containerTent').style.display = 'none';
    imgElement.style.filter = 'brightness(1)';

    if (tentativa === pokemonName) {
        pontos++
        resultado = `É o... ${pokemonName}!`;
        document.getElementById('new-pokemon-button').style.display = 'block';
    } else {
        resultado = `É o... ${pokemonName}! Game Over - sua pontuação final foi ${pontos}`;
    }

    const resultadoElement = document.getElementById('resultado');
    resultadoElement.textContent = resultado;
    const pontosElement = document.getElementById('pontos');
    pontosElement.textContent = pontos;
}

// Próximo Pokémon
function getNewPokemon() {
    // Deletando jogo anterior
    document.getElementById('resultado').textContent = '';
    document.getElementById('new-pokemon-button').style.display = 'none';
    document.getElementById('containerTent').style.display = 'block';  

    const newRandomPokemonId = Math.floor(Math.random() * 898) + 1;

    const newApiUrl = `https://pokeapi.co/api/v2/pokemon/${newRandomPokemonId}/`;
    fetch(newApiUrl)
        .then(response => response.json())
        .then(data => {
            const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${newRandomPokemonId}.png`;
            pokemonName = data.name.charAt(0).toUpperCase() + data.name.slice(1).toLowerCase();
            pokemonName = pokemonName.split('-')[0]

            imgElement.src = imageUrl;
            imgElement.style.filter = 'brightness(0)';
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}
