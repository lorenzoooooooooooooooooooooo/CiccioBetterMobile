// Funzione per salvare il nome utente e le vincite
function registerUser(userName) {
    // Verifica se il nome utente è valido (non vuoto)
    if (!userName || userName.trim() === "") {
        alert("Per favore, inserisci un nome utente valido.");
        return;
    }

    // Salva il nome utente nel localStorage
    localStorage.setItem("userName", userName);
    alert(`Benvenuto ${userName}! Ora puoi iniziare a giocare.`);
    document.getElementById("registrationSection").style.display = "none"; // Nascondi la sezione di registrazione
}

// Funzione per salvare o aggiornare i dati della classifica nel localStorage
function saveLeaderboardData(userName, winnings) {
    let leaderboardData = JSON.parse(localStorage.getItem("leaderboard")) || [];

    // Cerca se il giocatore è già presente nella classifica
    let player = leaderboardData.find(player => player.name === userName);

    if (player) {
        // Se il giocatore è già nella classifica, aggiorna le sue vincite
        player.winnings += winnings;
    } else {
        // Se il giocatore non è nella classifica, aggiungilo
        leaderboardData.push({ name: userName, winnings: winnings });
    }

    // Ordina la classifica in ordine decrescente di vincite
    leaderboardData.sort((a, b) => b.winnings - a.winnings);

    // Salva la classifica aggiornata nel localStorage
    localStorage.setItem("leaderboard", JSON.stringify(leaderboardData));
}

// Funzione per aggiornare e visualizzare la classifica nella pagina
function updateLeaderboard() {
    let leaderboardData = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboardData.sort((a, b) => b.winnings - a.winnings);

    const leaderboardList = document.getElementById("leaderboardList");
    const leaderboardSection = document.getElementById("leaderboardSection");

    leaderboardSection.style.display = "block";
    leaderboardList.innerHTML = "";

    leaderboardData.forEach(player => {
        const row = document.createElement("tr");
        const nameCell = document.createElement("td");
        const winningsCell = document.createElement("td");

        nameCell.textContent = player.name;
        winningsCell.textContent = `€${player.winnings.toFixed(2)}`;

        row.appendChild(nameCell);
        row.appendChild(winningsCell);
        leaderboardList.appendChild(row);
    });
}

// Funzione per inizializzare la pagina con il pulsante "Vedi Classifica"
function initLeaderboardButton() {
    const leaderboardButton = document.getElementById("viewLeaderboard");
    const closeLeaderboardButton = document.getElementById("closeLeaderboard");

    leaderboardButton.addEventListener("click", function() {
        updateLeaderboard();
    });

    closeLeaderboardButton.addEventListener("click", function() {
        document.getElementById("leaderboardSection").style.display = "none";
    });
}

// Inizializza la registrazione dell'utente
document.getElementById("registerButton").addEventListener("click", function() {
    const userName = document.getElementById("username").value;
    registerUser(userName);
});

// Inizializza la classifica all'inizio
document.addEventListener("DOMContentLoaded", function() {
    initLeaderboardButton();
});
