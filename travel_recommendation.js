let recommendation = false;

function recommendationView() {
    const userSearch = document
        .getElementById("searchBar")
        .value.trim()
        .toLowerCase();

    const keyMap = {
        beach: "beaches",
        beaches: "beaches",
        temple: "temples",
        temples: "temples",
        country: "countries",
        countries: "countries",
    };

    const validKey = keyMap[userSearch];

    if (validKey) {
        getData(validKey);
    } else {
        console.log("No matching category.");
    }
}

function clearRecommended() {
    let clearthis = document.getElementById("recommendationsCardArea");
    clearthis.innerHTML = "<div id='cards'></div>";
    location.reload();
}

async function getData(categoryKey) {
    const url = "travel_recommendation_api.json";

    try {
        const response = await fetch(url);
        if (!response.ok)
            throw new Error(`Response status: ${response.status}`);

        const json = await response.json();
        const container = document.getElementById("recommendationsCardArea");
        container.innerHTML = "";

        const data = json[categoryKey];

        if (!data) {
            console.error(`No data for key: ${categoryKey}`);
            return;
        }

        if (categoryKey === "countries") {
            data.forEach((country) => {
                const card = document.createElement("div");
                card.className = "card";

                const countryTitle = document.createElement("h1");
                country.className = "country-title";
                countryTitle.textContent = country.name;

                card.appendChild(countryTitle);

                country.cities.forEach((city) => {
                    const citySection = document.createElement("div");

                    const img = document.createElement("img");
                    img.src = city.imageUrl;

                    const title = document.createElement("h2");
                    title.textContent = city.name;

                    const desc = document.createElement("p");
                    desc.textContent = city.description;

                    const visitBtn = document.createElement("button");
                    visitBtn.className = "visitBtn";
                    visitBtn.textContent = "Visit";

                    citySection.appendChild(img);
                    citySection.appendChild(title);
                    citySection.appendChild(desc);
                    citySection.appendChild(visitBtn);

                    card.appendChild(citySection);
                });

                container.appendChild(card);
            });
        } else {
            data.forEach((item) => {
                const card = document.createElement("div");
                card.className = "card";

                const img = document.createElement("img");
                img.src = item.imageUrl;

                const title = document.createElement("h2");
                title.textContent = item.name;

                const desc = document.createElement("p");
                desc.textContent = item.description;

                const visitBtn = document.createElement("button");
                visitBtn.className = "visitBtn";
                visitBtn.textContent = "Visit";

                card.appendChild(img);
                card.appendChild(title);
                card.appendChild(desc);
                card.appendChild(visitBtn);

                container.appendChild(card);
            });
        }
    } catch (error) {
        console.error(error.message);
    }
}
