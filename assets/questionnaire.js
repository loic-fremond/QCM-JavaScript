// Fonction qui génère un nombre aléatoire inclus dans un intervalle défini par min/max
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
}

// Création d'un tableau de questions qui seront posées lors du jeu
// Ce tableau servira de tableau de référence pour créer des instances de jeu
// La question est toujours posée en index[x][0]
// La bonne réponse est toujours en index[x][1]
const questions = [
    ['Quel groupe est formé par Thomas Bangalter et Guy-Manuel de Homem-Christo ?', 'Daft Punk', 'Pony Pony Run Run', 'Stardust', 'Phoenix'],
    ['De quel pays, les Beatles sont-ils originaires ?', 'Angleterre', 'Allemagne', 'Irlande', 'Pays de Galles'],
    ['Quel groupe a interprété la chanson « C.R.E.A.M. » ?', 'Wu-Tang Clan', 'Cypress Hill', 'Black Eyed Peas', 'Public Enemy'],
    ['Qui interprète le tube "Allumer le feu" ?', 'Johnny Hallyday', 'Yves Montand', 'Dick Rivers', 'Eddy Mitchell'],
    ['Comment surnommait-on Édith Piaf ?', 'La môme', 'La piaf', 'La petite', 'La bougeotte'],
] ;

// Définition des différentes constantes et variables utiles au programme
const startPage = document.querySelector('#start_page');
const startButton = document.querySelector('#start');
const qcmGlobal = document.querySelector("#qcm");
const scorePage = document.querySelector('#score_page');
const scoreFinal = document.querySelector('#score_final');
const timerFinal = document.querySelector('#timer_final');
const restart = document.querySelector('#restart');
const titrequestion = document.querySelector('#titre_question');
const rep1 = document.querySelector('#reponse1');
const rep2 = document.querySelector('#reponse2');
const rep3 = document.querySelector('#reponse3');
const rep4 = document.querySelector('#reponse4');
const score = document.querySelector('#score');
const timer = document.querySelector('#timer');
var scoreInitial = 0;
score.textContent = scoreInitial;
var chrono = 0;
timer.textContent = chrono;

// Définition d'un event listener qui valide une réponsee du qcm au clic sur une des quatre réponses possibles
rep1.addEventListener("click", validationReponse);
rep2.addEventListener("click", validationReponse);
rep3.addEventListener("click", validationReponse);
rep4.addEventListener("click", validationReponse);

// Création d'une variable qcm à l'aide de la fonction creerTableau() ci-après
let qcm = creerTableau();

// Fonction créant un tableau qui est une copie du tableau de référence "questions" contenant les questions originales du qcm
// Cette fonction permet de randomiser l'ordre dans lequel les questions du tableau original seront inclues dans ce nouveau tableau
// C'est ce nouveau tableau avec les questions dans un ordre randomisé qui sera utilisé pour le jeu effectif
function creerTableau() {
    // Création d'un tableau vide
    let questionsPosees = Array();
    let numA = 0;
    // Tant que le tableau "questions" est plus grand que le tableau généré pour le jeu, continuer à remplir le tableau
    while (questions.length > questionsPosees.length) {
        // Génération d'un chiffre aléatoire compris entre 0 et 4, qui servira d'index random pour parcourir le tableau de référence "questions" qui contient 5 places
        numA = getRandomIntInclusive(0, 4);
        // Si le tableau du jeu ne contient pas déjà la question trouvée dans le tableau de référence, on peut l'ajouter
            if(!questionsPosees.includes(questions[numA])) {
                questionsPosees.push(questions[numA]);
            }
    }
    // A la fin, on récupère un tableau qui servira de base au jeu
    return questionsPosees;
}

// Cette fonction sert à placer les réponses sur la page web, dans un ordre randomisé
function placerReponses(indexTab) {
    // Création d'un tableau d'indexs disponibles
    let indexRep = ['1', '2', '3', '4'];
    let j = 1;
    // Pour chaque itération de la boucle, le tableau d'indexs disponibles deviendra de plus en plus petit, jusqu'à avoir une longueur de 0
    // Dès lors qu'il aura une longueur de 0, i sera égal à sa longueur et on sortira de la boucle
    // Donc i n'est pas incrémenté
    for (let i = 0 ; i<indexRep.length ; i) {
      // On récupère un index aléatoire dans la liste des index disponibles 
      let indexRandom = Math.floor(Math.random() * indexRep.length);
      let chiffre = indexRep[indexRandom];
      // Cet index permet d'identifier le numéro d'un bouton de réponse du qcm (les boutons rep1, rep2, rep3, ou rep4)
      // On aura un nombre aléatoire compris entre 1 et 4, donc on peut assigner une question issue du tableau "qcm" à un bouton aléatoire
      (eval('rep'+chiffre)).innerText = qcm[indexTab][j];
      j++;
      // Une fois le bouton "rep4" rempli, on ne souhaite pas le remplir à nouveau, donc on supprime l'index '4' de la liste des indexs dispos
      indexRep.splice(indexRandom, 1);
    }
}

// Création d'un timer pour enregistrer le temps mis à compléter le qcm
let timerInterval;

function startTimer() {
    let seconds = 0;
    timerInterval = setInterval(incrementSeconds, 1000);
    function incrementSeconds() {
        seconds += 1;
        timer.innerText = seconds;
    }
}

function stopTimer() {
    clearInterval(timerInterval);
}

// Lorsque l'on clique sur le bouton "start", la page de départ n'est plus affichée, la page contenant le qcm est affichée, et le timer démarre
start.addEventListener("click", function startGame() {
    startPage.style.display = "none";
    qcmGlobal.style.display = "flex";
    startTimer();
})

// Fonction qui permet de poser des nouvelles questions, et qui termine le jeu s'il n'y a plus de nouvelles questions à poser
function nouvelleQuestionOuTermine() {
    rep1.style.backgroundColor = "#f2f2f2";
    rep2.style.backgroundColor = "#f2f2f2";
    rep3.style.backgroundColor = "#f2f2f2";
    rep4.style.backgroundColor = "#f2f2f2";
    // Si la longueur du tableau de questions est de zéro, il ne reste plus de questions à poser
    // S'il ne reste plus de questions, on passe à l'affichage de la page de score, et on affiche le score final et le chronomètre final
    if (qcm.length === 0) {
        qcmGlobal.style.display = "none";
        scorePage.style.display = "flex";
        scoreFinal.innerText = "Votre score est de : " + score.innerText;
        stopTimer();
        timerFinal.innerText = "Temps écoulé : " + timer.innerText + " secondes";
    // S'il reste encore des questions, on en pose une nouvelle en utilisant la fonction placerReponses()
    // On range l'intitulé de la question dans la bonne "boite"
    // On place les réponses dans un ordre aléatoire
    // Et on retire ce jeu de question/réponses de notre tableau de jeu
    } else {
        let index = getRandomIntInclusive(0, 4);
        while (index >= qcm.length) {
            index = getRandomIntInclusive(0, 4);
        }
        titrequestion.innerText = qcm[index][0];
        placerReponses(index);
        qcm.splice(index, 1);
    }
}

// Appel à la fonction pour qu'elle puisse tourner
nouvelleQuestionOuTermine.call();

// Définition d'un bouton "skip" qui permet de sauter une question en utilisant la fonction nouvelleQuestionOuTermine()
let skipButton = document.getElementById("skip");
skipButton.onclick = function() {
    nouvelleQuestionOuTermine.call();
}

function validationReponse(rep) {
    let elementClicked = rep.srcElement;
    for (let entries in questions) {
        reponseCorrecte = questions[entries[0]];
        if (elementClicked.innerText == reponseCorrecte[1]) {
            elementClicked.style.backgroundColor = "#b2d8d8";
            scoreInitial += 10;
            score.innerText = scoreInitial;
            setTimeout(nouvelleQuestionOuTermine, 500);
        } else if (elementClicked.innerText == reponseCorrecte[2] || elementClicked.innerText == reponseCorrecte[3] || elementClicked.innerText == reponseCorrecte[4]) {
            elementClicked.style.backgroundColor = "#ffbaba";
            setTimeout(nouvelleQuestionOuTermine, 500);
        }
    }
}

restart.addEventListener("click", function startGame() {
    location.reload();
    startPage.style.display = "none";
    qcmGlobal.style.display = "flex";
    scorePage.style.display = "none";
})