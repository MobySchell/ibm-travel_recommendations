const userSearch = document.getElementById("searchBar").value;
let recommendation = false;

function recommendationView() {
    if (
        userSearch.toLowerCase() === "beach" ||
        userSearch.toLowerCase() === "beaches" ||
        userSearch.toLowerCase() === "temple" ||
        userSearch.toLowerCase() === "temples" ||
        userSearch.toLowerCase() === "country" ||
        userSearch.toLowerCase() === "countries"
    ) {
        getData(userSearch);
    }
}

async function getData(userSearch) {
    const url = "travel_recommendation_api.json";
    let userValue = userSearch.toLowerCase();

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json[userValue]);
    } catch (error) {
        console.error(error.message);
    }
}
