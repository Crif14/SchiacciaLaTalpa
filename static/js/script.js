let selectedDifficulty = null;

function startGame() {
    if (!selectedDifficulty) {
        document.getElementById('difficultyDropdown').classList.remove('btn-secondary');
        document.getElementById('difficultyDropdown').classList.add('btn-danger');
        alert('Seleziona una difficoltà prima di avviare il gioco!');
    } else {
        alert('Gioco avviato con difficoltà: ' + selectedDifficulty);
    }
}

function setDifficulty(level) {
    selectedDifficulty = level;
    document.getElementById('difficultyDropdown').classList.remove('btn-danger');
    document.getElementById('difficultyDropdown').classList.add('btn-secondary');
    document.getElementById('difficultyDropdown').innerText = 'Difficoltà: ' + level;
    alert('Difficoltà impostata su: ' + level);
}