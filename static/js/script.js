let finegioco = document.querySelector("#divfinegioco")
let bomba = document.querySelectorAll(".bomba")
let peach = document.querySelectorAll(".peach")
let moltluce = false
let moltiplicato = 0;
let moltiplicatore = document.querySelector("#moltiplicatore")
let menuplay = document.querySelector("#menuplay")
let contgrid = document.querySelector("#cont-grid")
let selectedDifficulty = null;
let talpe = document.querySelectorAll(".mario")
let difficolta = document.querySelectorAll(".dropdown-item")
let punthtml = document.querySelector("#punteggio")
let talpadauscire = 0;
let talpauscita = [];
let bombauscita = [];
let peachuscita = [];
let cliccato = false
let tienitempo = null;
let tempo = 0;
let uscitaTimer = null;
let punteggio = 0;
let sbarra = document.querySelector("#progresso");
let tempistica = 0;
let tipotalpla = 0;
let nvite = 3;
let vite = document.querySelectorAll(".heart")
//contatore secondi
function secondi() {
    tempistica = tempistica + 1;
    sbarra.value = tempistica;
    tienitempo = setTimeout(() => secondi(), 1000);
    //contatore moltiplicatore x2
    if (moltiplicato > 0) {
        moltiplicato = moltiplicato - 1;
    } else if (moltluce) { //controllo se il moltiplicatore è finito ed è acceso il testo lo spegne
        moltiplicatore.classList.replace("moltiplicatore-attivo", "moltiplicatore-spento");
        moltluce = false;
    }
}

//Inizializazzione vettori talpeuscite
for (let i = 0; i < talpe.length; i++) {
    talpauscita[i] = false;
}
console.log(talpauscita);
for (let i = 0; i < bomba.length; i++) {
    bombauscita[i] = false;
}
console.log(bombauscita);
for (let i = 0; i < peach.length; i++) {
    peachuscita[i] = false;
}
console.log(peachuscita);

function generateRandomInteger(min, max) {
    let casualNumber = Math.random()
    casualNumber = casualNumber * (max - min + 1) + min
    casualNumber = parseInt(casualNumber)
    return casualNumber
}

//Funzione per aggiornare la classifica
function aggiornaClassifica(punteggio) {
    //Seleziona gli elementi della classifica
    let classificaElementi = document.querySelectorAll("#punteggi ol li");
    let punteggi = [];

    //Raccogle i punteggi esistenti (evita elementi vuoti)
    for (let i = 0; i < classificaElementi.length; i++) {
        let valore = parseInt(classificaElementi[i].innerText);
        if (!isNaN(valore)) {
            punteggi[i] = valore;
        } else {
            punteggi[i] = 0; // Riempie con 0 se vuoto
        }
    }

    //Inserisce il nuovo punteggio al posto giusto nella classifica
    let inserito = false;
    for (let i = 0; i < punteggi.length; i++) {
        if (punteggio > punteggi[i]) {
            // Sposta gli altri punteggi in basso
            for (let j = punteggi.length - 1; j > i; j--) {
                punteggi[j] = punteggi[j - 1];
            }
            punteggi[i] = punteggio;
            inserito = true;
            break;
        }
    }

    //Se il punteggio non è stato inserito ed è minore di tutti, lo mette in fondo
    if (!inserito && punteggi.length < classificaElementi.length) {
        punteggi[punteggi.length] = punteggio;
    }

    //Aggiorna il contenuto HTML della classifica
    for (let i = 0; i < classificaElementi.length; i++) {
        classificaElementi[i].innerText = punteggi[i] !== 0 ? punteggi[i] : "";
    }

    //Aggiorna l'ultimo punteggio
    document.querySelector("#ultimo").innerText = punteggio;
}

//Funzioni cambio gradiente fine
function cambioOverlayRosso() {
    finegioco.classList.replace("overlayGiallo", "overlayRosso")
    overlayGiallo = setTimeout(() => {
        cambioOverlayGiallo();
    }, 1000);
}
function cambioOverlayGiallo() {
    finegioco.classList.replace("overlayRosso", "overlayGiallo")
    overlayRosso = setTimeout(() => {
        cambioOverlayRosso();
    }, 1000);
}

//Funzione per iniziare il gioco
function startGame() {
    if (!selectedDifficulty) {
        document.querySelector('#difficultyDropdown').classList.remove('is-primary');
        document.querySelector('#difficultyDropdown').classList.add('is-error');
        console.log('Seleziona una difficoltà prima di avviare il gioco!');
    } else {
        console.log('Gioco avviato con difficoltà: ' + selectedDifficulty);
        menuplay.classList.add("hide")
        contgrid.classList.remove("hide")
        if (selectedDifficulty === "Difficile") {
            tempo = 500
        } else if (selectedDifficulty === "Medio") {
            tempo = 1000
        } else {
            tempo = 1500
        }
        uscita()
    }
}

//Funzione per mpostare la difficolta
function setDifficulty(level) {
    selectedDifficulty = level;
    document.querySelector('#difficultyDropdown').classList.remove('btn-danger');
    document.querySelector('#difficultyDropdown').classList.add('btn-secondary');
    document.querySelector('#difficultyDropdown').innerText = 'Difficoltà: ' + level;
}

//Funzione per uscita delle talpe
function uscita() {
    if (tempistica < 30 && nvite > 0) {

        if (uscitaTimer !== null) {
            clearTimeout(uscitaTimer); //Ferma il timer precedente, se esiste
        }
        tipotalpla = generateRandomInteger(0, 100);
        talpadauscire = generateRandomInteger(0, 11);
        if (tipotalpla <= 70) { //Uscita talpa
            talpauscita[talpadauscire] = true;

            talpe[talpadauscire].classList.replace("giu", "torna");
            console.log("Talpa uscita: " + talpadauscire);

            //Dopo un certo tempo, la talpa sparisce di nuovo
            uscitaTimer = setTimeout(() => {
                talpe[talpadauscire].classList.replace("torna", "giu");
                talpauscita[talpadauscire] = false;
                uscita(); // Richiama la funzione per continuare il ciclo
            }, tempo);

            cliccato = false;
        } else if (tipotalpla <= 87) {//uscita bomba
            bombauscita[talpadauscire] = true;

            bomba[talpadauscire].classList.replace("giu", "torna");
            console.log("Bomba uscita: " + talpadauscire);

            // Dopo un certo tempo, la talpa sparisce di nuovo
            uscitaTimer = setTimeout(() => {
                bomba[talpadauscire].classList.replace("torna", "giu");
                bombauscita[talpadauscire] = false;
                uscita(); // Richiama la funzione per continuare il ciclo
            }, tempo);

            cliccato = false;
        } else { //uscita peach
            peachuscita[talpadauscire] = true;

            peach[talpadauscire].classList.replace("giu", "torna");
            console.log("Peach uscita: " + talpadauscire);

            // Dopo un certo tempo, la talpa sparisce di nuovo
            uscitaTimer = setTimeout(() => {
                peach[talpadauscire].classList.replace("torna", "giu");
                peachuscita[talpadauscire] = false;
                uscita(); // Richiama la funzione per continuare il ciclo
            }, tempo);

            cliccato = false;
        }
    } else {//Gioco finito
        clearTimeout(uscitaTimer);
        clearTimeout(tienitempo);
        talpe[talpadauscire].classList.replace("torna", "giu");
        talpauscita[talpadauscire] = false;
        bomba[talpadauscire].classList.replace("torna", "giu");
        bombauscita[talpadauscire] = false;
        peach[talpadauscire].classList.replace("torna", "giu");
        peachuscita[talpadauscire] = false;
        nvite = 3
        for (let i = 0; i < 3; i++) {
            vite[i].classList.remove("is-empty");
        }
        // Aggiorna la classifica con il punteggio finale
        aggiornaClassifica(punteggio);
        //Discesa overlay finegioco
        finegioco.classList.add("overlayRosso", "visible")
        let puntfine = document.querySelector("#finePunteggio")
        puntfine.innerText = "Gioco terminato. Punteggio finale: " + punteggio
        setTimeout(() => {
            cambioOverlayGiallo();
        }, 1000);
        console.log("Gioco terminato. Punteggio finale: " + punteggio);
    }
}

//Eventlistener che avvia il gioco 
document.querySelector('#avviogioco').addEventListener("click", function (event) {
    startGame();
    tienitempo = setTimeout(() => secondi(), 1000);
})

//Per impostare la difficolta
for (let i = 0; i < difficolta.length; i++) {
    difficolta[i].addEventListener("click", function (event) {
        let el = event.currentTarget;
        let difficulty = el.innerText;  //Ottiene il testo dell'elemento
        setDifficulty(difficulty);  //Imposta la difficoltà
        console.log("Difficoltà selezionata: " + difficulty);
    })
}
//Funzione talpa cliccata 
for (let i = 0; i < talpe.length; i++) {
    talpe[i].addEventListener("click", function (event) {
        if (tempistica < 30) {
            let el = event.currentTarget;
            let j = Array.from(talpe).indexOf(el);
            if (talpauscita[j] == true) {
                cliccato = true;
                talpe[talpadauscire].classList.replace("torna", "giu");
                talpauscita[j] = false;
                clearTimeout(uscitaTimer);
                uscita();
                if (moltiplicato > 0) {
                    punteggio = punteggio + 200
                } else {
                    punteggio = punteggio + 100
                }
                punthtml.innerHTML = punteggio
            }
        }
    });
}
//Funzione peach cliccata
for (let i = 0; i < peach.length; i++) {
    peach[i].addEventListener("click", function (event) {
        if (tempistica < 30) {
            let el = event.currentTarget;
            let j = Array.from(peach).indexOf(el);
            if (peachuscita[j] == true) {
                cliccato = true;
                peach[talpadauscire].classList.replace("torna", "giu");
                peachuscita[j] = false;
                clearTimeout(uscitaTimer);
                uscita();
                moltiplicato = moltiplicato + 5;
                punteggio = punteggio + 200
                moltluce = true
                punthtml.innerHTML = punteggio
                moltiplicatore.classList.replace("moltiplicatore-spento", "moltiplicatore-attivo")
                console.log("Peach cliccata")
            }
        }
    });
}
//Funzione bomba cliccata
for (let i = 0; i < bomba.length; i++) {
    bomba[i].addEventListener("click", function (event) {
        if (tempistica < 30) {
            let el = event.currentTarget;
            let j = Array.from(bomba).indexOf(el);
            if (bombauscita[j] == true) {
                cliccato = true;
                bomba[talpadauscire].classList.replace("torna", "giu");
                bombauscita[j] = false;
                clearTimeout(uscitaTimer);
                uscita();
                if (nvite > 0) {
                    nvite = nvite - 1
                    vite[nvite].classList.add("is-empty")
                } else {
                    console.log("Non ci sono più vite disponibili.");
                }
                if (nvite < 1) {
                    uscita()
                }
                console.log("Bomba cliccata")
            }
        }
    });
}

//Listener btn per riniziare
document.querySelector('#btnRinizia').addEventListener('click', function () {
    //Nasconde l'overlay e la griglia di fine gioco e mostra il menu principale
    finegioco.classList.remove("visible");
    menuplay.classList.remove("hide");
    contgrid.classList.add("hide")
    //Reset delle talpe
    for (let i = 0; i < talpe.length; i++) {
        talpe[i].classList.replace("torna", "giu");
        talpauscita[i] = false;
    }
    //Reset delle variabili di gioco
    clearTimeout(tienitempo);
    clearTimeout(uscitaTimer);
    tempistica = 0;
    punteggio = 0;
    sbarra.value = 0;
    selectedDifficulty = null;
    // Ripristina il dropdown delle difficoltà
    document.querySelector('#difficultyDropdown').innerText = 'Scegli Difficoltà';
    document.querySelector('#difficultyDropdown').classList.remove('is-error');
});

document.querySelector('#botreset').addEventListener("click", function () {
    //Nascondi la griglia di gioco e mostra il menu principale
    menuplay.classList.remove("hide");
    contgrid.classList.add("hide");
    //Reset delle talpe
    for (let i = 0; i < 12; i++) {
        talpe[i].classList.replace("torna", "giu");
    }
    //Reset delle variabili 
    clearTimeout(tienitempo);
    clearTimeout(uscitaTimer);
    tempistica = 0;
    punteggio = 0;
    punthtml.innerHTML = punteggio;
    //Resetta la barra di progresso
    sbarra.value = 0;
    console.log("Gioco resettato. Tornato al menu principale.");
});

