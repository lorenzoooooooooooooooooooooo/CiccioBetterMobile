document.getElementById("play-aviator").addEventListener("click", () => {
    window.open("aviator.html", "_blank", "width=800,height=600");
});

function saveLeaderboardData(userName, winnings) {
    // Recupera i dati della classifica (se esistono) dal localStorage
    let leaderboardData = JSON.parse(localStorage.getItem("leaderboard")) || [];

    // Cerca se il giocatore è già nella classifica
    let player = leaderboardData.find(player => player.name === userName);

    if (player) {
        // Se il giocatore esiste, aggiorna le sue vincite
        player.winnings += winnings; // Aggiunge la vincita attuale a quella precedente
    } else {
        // Se il giocatore non è nella classifica, aggiungilo
        leaderboardData.push({ name: userName, winnings: winnings });
    }

    // Ordina la classifica in ordine decrescente di vincite
    leaderboardData.sort((a, b) => b.winnings - a.winnings);

    // Salva la classifica aggiornata nel localStorage
    localStorage.setItem("leaderboard", JSON.stringify(leaderboardData));
}

function updateLeaderboard() {
    // Recupera i dati della classifica
    let leaderboardData = JSON.parse(localStorage.getItem("leaderboard")) || [];

    // Ordina la classifica in ordine decrescente di vincite
    leaderboardData.sort((a, b) => b.winnings - a.winnings);

    // Seleziona l'elemento della pagina dove vuoi mostrare la classifica (una tabella, lista, ecc.)
    const leaderboardList = document.getElementById("leaderboardList");
    leaderboardList.innerHTML = ""; // Pulisce la lista esistente

    // Crea le righe della classifica e aggiungile alla lista
    leaderboardData.forEach(player => {
        const row = document.createElement("tr");
        const nameCell = document.createElement("td");
        const winningsCell = document.createElement("td");

        nameCell.textContent = player.name; // Nome del giocatore
        winningsCell.textContent = `€${player.winnings.toFixed(2)}`; // Vincita del giocatore (formattata)

        row.appendChild(nameCell);
        row.appendChild(winningsCell);
        leaderboardList.appendChild(row);
    });
}

const cashOutButton = document.getElementById("cashoutButton"); // Supponiamo che tu abbia un pulsante di cashout

cashOutButton.addEventListener("click", function() {
    // Supponiamo che il nome del giocatore e le vincite siano calcolati dal gioco
    let userName = "Giocatore1"; // Nome del giocatore
    let winnings = 150; // Vincita del giocatore (esempio)

    // Salva la vincita nella leaderboard
    saveLeaderboardData(userName, winnings);

    // Mostra la classifica aggiornata
    updateLeaderboard();

    // Messaggio di conferma al giocatore
    alert(`Hai ritirato €${winnings.toFixed(2)}!`);

    // (Opzionale) Resetta il gioco per una nuova partita
    resetGame(); // Funzione che resetta il gioco (da implementare)
});
