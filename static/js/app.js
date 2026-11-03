const API_URL = "/latest/";

const tempEl = document.getElementById('temp');
const humEl  = document.getElementById('hum');
const timeEl = document.getElementById('time');
const statusEl = document.getElementById('status');
const ageEl = document.getElementById('age');

let dateMesure = new Date(); // Variable globale pour stocker la date de la dernière mesure

async function getData() {
  statusEl.textContent = "Chargement...";
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    // Remplir les cartes (Exercice 3)
    tempEl.textContent = data.temperature;
    humEl.textContent  = data.humidity;

    // Mettre à jour l'horodatage
    dateMesure = new Date(data.timestamp);
    timeEl.textContent = dateMesure.toLocaleString("fr-FR");

    statusEl.textContent = "OK";
    afficherAge(); // Mise à jour immédiate de l'âge
  } catch (e) {
    statusEl.textContent = "Erreur: " + e.message;
  }
}

// Calculer et afficher le temps écoulé (Exercice 4)
function afficherAge() {
  const s = Math.max(0, Math.floor((Date.now() - dateMesure.getTime()) / 1000));

  if (s < 60) {
      ageEl.textContent = s + " secondes";
  } else if (s < 3600) {
      ageEl.textContent = Math.floor(s / 60) + " minutes";
  } else {
      ageEl.textContent = Math.floor(s / 3600) + " heures";
  }
}

document.getElementById('refresh').addEventListener('click', getData);

// Initialisation
getData();

// Le compteur d'âge avance chaque seconde (Exercice 4)
setInterval(afficherAge, 1000);

// L'API est relue automatiquement toutes les 10 secondes (Exercice 4)
setInterval(getData, 10000);