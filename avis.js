/* ═══════════════════════════════════════════════════════════════
   AVIS CLIENTS — Abou Photography
   ───────────────────────────────────────────────────────────────

   Les avis ajoutés via la page admin (/admin-avis.html) 
   apparaissent automatiquement sur le site.

   Vous pouvez aussi ajouter des avis manuellement ici.

═══════════════════════════════════════════════════════════════ */

var AVIS = [

  {
    texte:    "Abou est un photographe sérieux, passionné, et vraiment pro !! Il propose des photos de qualité… à la fois naturelles et soignées. Il sait s'adapter au style de la personne mais également à divers décors (extérieur, dans la salle d'un restau etc). Une personne à l'écoute, et qui sait nous mettre en valeur. Je recommande et espère faire plein de nouveaux shoots avec lui !!",
    nom:      "Priscilla",
    occasion: "Séance Portrait"
  },

  {
    texte:    "Mes photos de fiançailles et de mariage ont été réalisées par Abou. Il a fait un travail formidable tout au long des deux jours, et nous sommes absolument ravis du résultat ! Il est très doux, attentif et prend le temps nécessaire pour que chaque séance photo soit à la fois relaxante et agréable. Nous ferons de nouveau appel à lui sans hésiter !",
    nom:      "Francis & Vera",
    occasion: "Séance Mariage"
  },

  {
    texte:    "J'ai eu la chance de faire un shooting avec Abou et l'expérience a été vraiment top. Il sait mettre à l'aise et guider pendant la séance, tout en restant très professionnel. Il a de la créativité et un bon œil pour trouver les bons angles et mettre en valeur sans que ça fasse forcé. Le rendu des photos est de qualité, on sent le travail et l'attention aux détails. Merci encore, hâte de retravailler ensemble !",
    nom:      "Lao",
    occasion: "Séance Portrait"
  },

  /* ← Ajoutez vos nouveaux avis manuels ici si besoin :

  {
    texte:    "Écrivez l'avis du client ici sur une seule ligne.",
    nom:      "Prénom Nom",
    occasion: "Type de séance"
  },

  */

];

/* ═══════════════════════════════════════════════════════════════
   CHARGEMENT AUTOMATIQUE des avis validés via l'admin
   → Aucune modification nécessaire ci-dessous
═══════════════════════════════════════════════════════════════ */

function chargerAvisDynamiques(callback) {
  fetch('/.netlify/functions/get-avis')
    .then(function(res) { return res.json(); })
    .then(function(dynamiques) {
      var tous = dynamiques.map(function(a) {
        return { texte: a.texte, nom: a.nom, occasion: a.occasion };
      }).concat(AVIS);
      callback(tous);
    })
    .catch(function() {
      callback(AVIS);
    });
}
