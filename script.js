const statsUrl = "https://raw.githubusercontent.com/MarioDittrich/SoccerStatisticsLive/main/stats.json";

async function loadStats() {
    const response = await fetch(statsUrl + "?t=" + Date.now());
    const stats = await response.json();

    Object.keys(stats).forEach(key => {
        const element = document.getElementById(key);

        if (element) {
            element.textContent = stats[key];
        }
    });
}

loadStats();