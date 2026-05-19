/*
const GITHUB_TOKEN = "DEIN_GITHUB_TOKEN";
const OWNER = "DEINNAME";
const REPO = "football-overlay";
*/
const stats = {
    homeCorners: 0,
    awayCorners: 0,
    yellowCards: 0,
    redCards: 0,
    freeKicks: 0,
    penalties: 0,
    offsides: 0,
    fouls: 0
};

const labels = {
    homeCorners: "Ecken Heim",
    awayCorners: "Ecken Gast",
    yellowCards: "Gelbe Karten",
    redCards: "Rote Karten",
    freeKicks: "Freistöße",
    penalties: "Elfmeter",
    offsides: "Abseits",
    fouls: "Fouls"
};

async function loadStats() {
    const response = await fetch("stats.json?t=" + Date.now());
    const data = await response.json();

    Object.assign(stats, data);

    render();
}

function render() {
    const grid = document.getElementById("grid");

    grid.innerHTML = "";

    Object.keys(stats).forEach(key => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h2>${labels[key]}</h2>
            <div class="counter">${stats[key]}</div>

            <div class="buttons">
                <button class="plus" onclick="changeValue('${key}', 1)">+1</button>
                <button class="minus" onclick="changeValue('${key}', -1)">-1</button>
            </div>
        `;

        grid.appendChild(card);
    });
}

function changeValue(key, amount) {
    stats[key] += amount;

    if (stats[key] < 0) {
        stats[key] = 0;
    }

    render();
}

async function saveStats() {
    const apiUrl = `https://api.github.com/repos/${OWNER}/${REPO}/contents/stats.json`;

    const currentFile = await fetch(apiUrl, {
        headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            Accept: "application/vnd.github+json"
        }
    });

    const currentData = await currentFile.json();

    const updatedContent = btoa(JSON.stringify(stats, null, 2));

    await fetch(apiUrl, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            Accept: "application/vnd.github+json"
        },
        body: JSON.stringify({
            message: "Update football stats",
            content: updatedContent,
            sha: currentData.sha
        })
    });

    alert("Gespeichert!");
}

loadStats();