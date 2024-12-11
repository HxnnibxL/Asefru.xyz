// Récupérer les citations depuis le fichier Excel via le serveur
async function fetchData() {
  try {
    const response = await fetch("/data", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    return [];
  }
}

const phraseContainer = document.getElementById("phrase-container");
const phraseText = document.getElementById("phrase");
const phraseAuthor = document.getElementById("auteur");

let phrases = [];

// Charger les données au chargement de la page
document.addEventListener("DOMContentLoaded", async () => {
  phrases = await fetchData();
  phrases = phrases.filter(phrase => phrase.Phrase && phrase.Auteur); // Élimine les entrées invalides

});

document.addEventListener("keydown", function (event) {
  if (event.code === "Space" && phrases.length > 0) {
    const index = Math.floor(Math.random() * phrases.length);
    const phrase = phrases[index];
    phraseText.textContent = phrase.Phrase; // Colonne A
    phraseAuthor.textContent = phrase.Auteur; // Colonne B

    // Réinitialiser la traduction
    phraseText.dataset.translation = phrase.Traduction || ""; // Stocker la traduction pour l'utiliser plus tard
  }
});

// Gestionnaire d'événements pour les interactions mobiles
document.addEventListener("touchstart", function (event) {
  if (phrases.length > 0) {
    const index = Math.floor(Math.random() * phrases.length);
    const phrase = phrases[index];
    phraseText.textContent = phrase.Phrase;
    phraseAuthor.textContent = phrase.Auteur;

    // Réinitialiser la traduction
    phraseText.dataset.translation = phrase.Traduction || ""; // Stocker la traduction
  }
});

// Afficher la traduction au survol de la phrase
phraseText.addEventListener("mouseover", function () {
  const translation = phraseText.dataset.translation;
  if (translation) {
    let translationElement = document.getElementById("translation");

    // Si l'élément n'existe pas, on le crée
    if (!translationElement) {
      translationElement = document.createElement("div");
      translationElement.id = "translation";
      document.body.appendChild(translationElement);
    }

    // Mise à jour du contenu
    translationElement.textContent = translation;

    // Positionnement au-dessus de la phrase
    const rect = phraseText.getBoundingClientRect();
    translationElement.style.top = `${rect.top - translationElement.offsetHeight - 20}px`; // 20px au-dessus
    translationElement.style.left = `${rect.left + rect.width / 2}px`; // Centré horizontalement
    translationElement.style.transform = "translateX(-50%)";

    // Affichage progressif via opacity et visibility
    translationElement.style.opacity = "1";
    translationElement.style.visibility = "visible";
  }
});


// Masquer la bulle lorsque la souris quitte la citation
phraseText.addEventListener("mouseout", function () {
  const translationElement = document.getElementById("translation");
  if (translationElement) {
    // Masquage progressif via opacity et visibility
    translationElement.style.opacity = "0";
    translationElement.style.visibility = "hidden"; // Rendre invisible après la transition
  }
});





// Intro disappearing 
function handleInteraction() {
  var phrase1 = document.getElementById("intro");
  var phrase2 = document.getElementById("phrase-container");
  if (phrase1.style.display !== "none") {
    phrase1.style.display = "none";
    phrase1.disabled = true;
    phrase2.style.display = "block";
  } else {
    phrase1.style.display = "none";
    phrase1.disabled = true;
    phrase2.style.display = "block";
  }
}

// Gestion des interactions clavier
document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    handleInteraction();
  }
});

// Gestion des interactions mobiles
document.addEventListener("touchstart", function (event) {
  handleInteraction();
});

// Animation Intro
function selectIntroText() {
  var screenWidth = window.innerWidth;
  var text;

  if (screenWidth > 924) {
    // Texte pour les écrans de plus de 924 pixels de large (ordinateurs)
    text = "Keneḍ ɣef ESPACE iw-akken aḍ i-bdu";
  } else {
    // Texte pour les écrans de moins de 924 pixels de large (téléphones)
    text = "Kkned iw-akken ad i-bdu";
  }

  return text;
}

var text = selectIntroText();

function typeWriter(text, i, fnCallback) {
  if (i < text.length) {
    document.getElementById("intro").innerHTML += text.charAt(i);
    i++;
    setTimeout(function () {
      typeWriter(text, i, fnCallback);
    }, 50);
  } else if (typeof fnCallback == "function") {
    setTimeout(fnCallback, 1000);
  }
}
typeWriter(text, 0, function () {
  console.log("Tfuk tira !");
});
