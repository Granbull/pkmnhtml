document.addEventListener("DOMContentLoaded", async function () {
    const pokedexContainer = document.getElementById("pokedex");
    const filterInput = document.getElementById("filterInput");
    const filterButton = document.getElementById("filterButton");

    try {
        // Fetch the full list of Pokémon from the API
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=898");
        const data = await response.json();

        // Filter out Pokémon with missing data
        const availablePokemon = data.results.filter(pokemon => pokemon.url.includes("/pokemon/"));

        // Sort Pokémon by numeric ID
        availablePokemon.sort((a, b) => extractNumericId(a.url) - extractNumericId(b.url));

        // Fetch details for each Pokémon
        for (const pokemon of availablePokemon) {
            const response = await fetch(pokemon.url);
            const pokemonData = await response.json();

            // Display Pokémon information
            displayPokemon(pokemonData);
        }
    } catch (error) {
        console.error("Error fetching Pokémon data:", error);
    }

    // Function to extract numeric ID from Pokémon URL
    function extractNumericId(url) {
        return parseInt(url.split("/")[6]);
    }

    // Function to capitalize the first letter of a string
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Function to get color based on Pokémon type
    function getTypeColor(type) {
        switch (type) {
            case 'normal':
                return 'gray';
            case 'fighting':
                return 'red';
            case 'flying':
                return 'skyblue';
            case 'poison':
                return 'purple';
            case 'ground':
                return 'brown';
            case 'rock':
                return 'sienna';
            case 'bug':
                return 'green';
            case 'ghost':
                return 'indigo';
            case 'steel':
                return 'dimgray';
            case 'fire':
                return 'orangered';
            case 'water':
                return 'blue';
            case 'grass':
                return 'forestgreen';
            case 'electric':
                return 'gold';
            case 'psychic':
                return 'violet';
            case 'ice':
                return 'deepskyblue';
            case 'dragon':
                return 'darkslateblue';
            case 'dark':
                return 'black';
            case 'fairy':
                return 'pink';
            // Add more cases for other types
            default:
                return 'black';
        }
    }

    // Function to display Pokémon information
function displayPokemon(pokemonData) {
    const pokemonElement = document.createElement("div");
    pokemonElement.classList.add("pokemon");

    const { id, name, sprites, types, stats } = pokemonData;

    // Find the speed stat among the stats array
    const speedStat = stats.find(stat => stat.stat.name === 'speed').base_stat;

    pokemonElement.innerHTML = `
        <p>${id}</p>
        <img src="${sprites.front_default}" alt="${name}">
        <p>${capitalizeFirstLetter(name)}</p>
        <p>${types.map(type => `<span class="${type.type.name}" style="color: ${getTypeColor(type.type.name)}">${capitalizeFirstLetter(type.type.name)}</span>`).join(", ")}</p>
        <p>Speed: ${speedStat}</p>
    `;

    pokedexContainer.appendChild(pokemonElement);
}
    // Event listener for the filter button
    filterButton.addEventListener("click", function () {
        const filterValue = filterInput.value.toLowerCase();

        // Loop through each Pokémon element and hide/show based on the filter
        const pokemonElements = document.querySelectorAll(".pokemon");
        pokemonElements.forEach(pokemonElement => {
            const pokemonName = pokemonElement.querySelector("p:nth-child(3)").textContent.toLowerCase();
            pokemonElement.style.display = pokemonName.includes(filterValue) ? "flex" : "none";
        });
    });
});