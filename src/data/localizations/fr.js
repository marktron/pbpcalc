const fr = {
  metadata: {
    header: {
      unofficial: "(pas officiel !)",
      title: "Calculateur de parcours Paris–Brest–Paris 2023",
    },
    footer: {
      madeBy: "Créé au Canada par",
      startingWave:
        "(Je démarre dans la vague K, dites bonjour en me dépassant)",
    },
    nav: {
      english: "Anglais",
      french: "Français",
      about: "À propos de nous",
      print: "Imprimer",
      download: "Télécharger",
    },
  },
  chart: {
    xAxisLabel: "Kilomètres",
    yAxisLabel: "Heures",
    night: "Nuit",
    arrivalTime: "Heure d'arrivée",
    departureTime: "Heure de départ",
    timeInHand: "Marge de temps",
    distanceTo: "Distance à",
    projectedTime: "Temps projeté",
    projectedFinishTime: "Heure de fin projetée",
    eightyHourAvg: "Moyenne de 80 heures",
    eightyFourHourAvg: "Moyenne de 84 heures",
    ninetyHourAvg: "Moyenne de 90 heures",
  },
  instructions:
    "Instructions : Commencez par choisir votre vague de départ, votre vitesse moyenne et le temps passé aux contrôles. Ensuite, personnalisez les paramètres pour chaque étape de votre parcours. Passez la souris sur les points du graphique ci-dessus pour voir plus d'informations sur chaque point de contrôle.",
  settings: {
    generalSettings: "Paramètres Généraux",
    startingWave: "Vague",
    speed: "Vitesse (km/h)",
    timeAtCtrl: "Temps aux contrôles (heures)",
    eightyHours: "80 heures",
    eightyFourHours: "84 heures",
    ninetyHours: "90 heures",
  },
  timeTable: {
    distance: "Distance",
    speed: "Vitesse",
    elapsedTime: "Temps écoulé",
    control: "Contrôle",
    arrival: "Arrivée",
    hoursAtCtrl: "Heures au contrôle",
    departure: "Départ",
    controlPoint: "Contrôle",
    foodOnly: "Nourriture et services uniquement, pas de contrôle",
  },
  about: {
    title: "À propos de ce site Web",
    aboutCopy:
      "Ce calculateur est conçu pour vous aider à planifier votre stratégie de temps pour le {0} 2023. À quelle vitesse devez-vous aller ? Où devriez-vous vous arrêter pour dormir ? Combien de temps pouvez-vous vous permettre de passer à manger des pâtisseries aux points de contrôle ? Explorez les différentes options pour tester divers scénarios.{1}En plus de définir des moyennes générales pour la vitesse et le temps aux contrôles, vous pouvez également personnaliser ces paramètres pour chaque segment. Prochainement, vous pourrez télécharger ou imprimer votre plan.{1}Astuce de pro : Passez la souris sur les points de contrôle du graphique pour obtenir un décompte de votre avance sur les concurrents et la distance jusqu'au prochain contrôle.",
    factorsTitle: "Quelques facteurs importants à considérer",
    factorsStart: "Vous commencerez probablement plus rapidement que prévu.",
    factorsNight: "Vous roulerez plus lentement la nuit.",
    factorsWeather:
      "La météo influencera votre vitesse et le temps que vous passerez aux contrôles.",
    factorsPrepared:
      "Beaucoup de choses se passeront sur 1200 km. Bien que ce calculateur puisse vous aider à planifier votre parcours, soyez prêt à vous adapter en fonction des circonstances changeantes.",
    questionsTitle: "Questions et commentaires",
    questionsCopy:
      "C'est à ce moment que je devrais révéler que je n'ai pas encore participé au PBP, donc il se peut que certaines hypothèses faites ici soient complètement erronées ! Veuillez signaler tout problème sur {0}. N'hésitez pas à envoyer vos commentaires sur les plateformes ci-dessous.",
    signOff: "À bientôt sur la route !{0}Mark Allen (90 heures / Vague K)",
  },
};

export default fr;
