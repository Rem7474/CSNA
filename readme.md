# CSNA - Certification Stormshield Network Associate

## Description
Le projet **CSNA** est une application web de révision pour la certification **Stormshield Network Associate**. Il s'agit d'un quiz interactif permettant de s'entraîner avec 146 questions couvrant l'ensemble des sujets de la certification.

## Fonctionnalités
- **Quiz personnalisable** : Choisissez le nombre de questions (1 à 146)
- **Questions aléatoires** : Les questions sont mélangées à chaque session pour éviter la mémorisation de l'ordre
- **Correction immédiate** : Affichage des réponses correctes en cas d'erreur
- **Questions à choix multiples** : Support des questions à une ou plusieurs réponses correctes
- **Progression visuelle** : Barre de progression pour suivre votre avancement
- **Score final** : Pourcentage de réussite affiché en fin de quiz

## Installation
1. Clonez le dépôt :
    ```bash
    git clone https://github.com/Rem7474/CSNA.git
    ```
2. Accédez au répertoire du projet :
    ```bash
    cd CSNA
    ```
3. Aucune installation de dépendances n'est nécessaire - C'est une application web vanilla JavaScript !

## Utilisation
1. Ouvrez simplement le fichier `index.html` dans votre navigateur web préféré (Chrome, Firefox, Edge)
2. Ou utilisez un serveur local pour un meilleur support :
    ```bash
    # Avec Python
    python -m http.server 8000
    
    # Avec PHP
    php -S localhost:8000
    ```
3. Sélectionnez le nombre de questions souhaitées
4. Cliquez sur "Commencer le quiz"
5. Répondez aux questions et consultez votre score final !

## Structure du projet
```
CSNA/
├── index.html          # Page principale de l'application
├── script.js           # Logique du quiz (version moderne async/await)
├── style.css           # Styles modernes avec variables CSS
├── questions.json      # Base de données des 146 questions
├── quizz.csv          # Format legacy (conservé pour référence)
└── favicon.svg        # Icône de l'application
```

## Technologies utilisées
- **HTML5** : Structure sémantique
- **CSS3** : Styles modernes avec variables CSS, gradients et animations
- **JavaScript ES6+** : async/await, fetch API, spread operator
- **JSON** : Format de données structuré

## Contribuer
Les contributions sont les bienvenues ! Pour contribuer :
1. Fork le dépôt
2. Créez une nouvelle branche pour votre fonctionnalité :
    ```bash
    git checkout -b feature/amelioration-questions
    ```
3. Committez vos modifications :
    ```bash
    git commit -m "Ajout de nouvelles questions CSNA"
    ```
4. Pushez vers votre branche :
    ```bash
    git push origin feature/amelioration-questions
    ```
5. Créez une Pull Request

## Format des questions (JSON)
Les questions suivent la structure suivante :
```json
{
  "id": 1,
  "question": "Texte de la question",
  "type": "text",
  "answers": ["Réponse 1", "Réponse 2", "Réponse 3"],
  "correctAnswers": [0, 2],
  "image": null
}
```

## Licence
Ce projet est un outil d'entraînement personnel. Les questions sont basées sur le programme officiel de certification CSNA de Stormshield.

## Auteur
- **Rem7474** (Rémy Cuvelier) - [Profil GitHub](https://github.com/Rem7474)

## Remerciements
- Stormshield pour la certification CSNA
- Communauté des administrateurs réseau et sécurité

---

*Dernière mise à jour : 2025 - 146 questions disponibles*