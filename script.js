// Application de quiz CSNA - Certification Stormshield Network Associate
let allQuestions = [];
let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;

// Initialisation au chargement de la page
document.addEventListener("DOMContentLoaded", init);

async function init() {
    await loadQuestions();
    setupEventListeners();
}

// Charger les questions depuis le fichier JSON
async function loadQuestions() {
    try {
        const response = await fetch('questions.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        allQuestions = data.questions;
        
        // Mise à jour de l'interface de configuration avec le nombre total de questions
        const totalCountSpan = document.getElementById('total-questions-count');
        const numInput = document.getElementById('numQuestions');
        if (totalCountSpan && numInput) {
            totalCountSpan.textContent = allQuestions.length;
            numInput.max = allQuestions.length;
        }
    } catch (error) {
        console.error('Erreur lors du chargement des questions:', error);
        alert('Erreur lors du chargement des questions. Veuillez rafraîchir la page.');
    }
}

// Configuration des écouteurs d'événements
function setupEventListeners() {
    const form = document.getElementById('quiz-setup-form');
    if (form) {
        form.addEventListener('submit', startQuiz);
    }

    // Clic sur le label "Max" pour sélectionner toutes les questions
    const totalLabel = document.getElementById('total-questions-label');
    if (totalLabel) {
        totalLabel.addEventListener('click', () => {
            const numInput = document.getElementById('numQuestions');
            if (numInput && allQuestions.length > 0) {
                numInput.value = allQuestions.length;
            }
        });
    }
}


// Démarrer le quiz
function startQuiz(event) {
    event.preventDefault();
    
    const numQuestions = parseInt(document.getElementById('numQuestions').value);
    
    // Validation
    if (numQuestions < 1 || numQuestions > allQuestions.length) {
        alert(`Veuillez choisir entre 1 et ${allQuestions.length} questions.`);
        return;
    }
    
    // Réinitialiser l'état
    currentQuestionIndex = 0;
    score = 0;
    
    // Mélanger et sélectionner les questions
    shuffledQuestions = shuffleArray([...allQuestions]).slice(0, numQuestions);
    
    // Afficher la section quiz et masquer la configuration
    document.getElementById('setup').style.display = 'none';
    document.getElementById('questions').style.display = 'block';
    document.getElementById('corrections').style.display = 'none';
    // Afficher la première question
    displayQuestion();
}

// Mélanger un tableau (algorithme Fisher-Yates)
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Afficher la question actuelle
function displayQuestion() {
    const question = shuffledQuestions[currentQuestionIndex];
    const quizContainer = document.getElementById('quizz');
    
    // Mise à jour de la barre de progression
    updateProgress();
    
    // Construire le HTML de la question
    const html = `
        <div class="question-header">
            <span class="question-number">Question ${currentQuestionIndex + 1} / ${shuffledQuestions.length}</span>
        </div>
        
        <div class="question-text">
            ${question.question}
        </div>
        
        ${question.image ? `<img src="${question.image}" alt="Question image">` : ''}
        
        <div class="answers-container">
            ${question.answers.map((answer, index) => `
                <div class="answer-option" data-index="${index}">
                    <input 
                        type="${question.correctAnswers.length === 1 ? 'radio' : 'checkbox'}" 
                        name="answer" 
                        id="answer-${index}" 
                        value="${index}">
                    <label for="answer-${index}">${answer}</label>
                </div>
            `).join('')}
        </div>
        
        <div class="button-group">
            <button class="btn-primary" onclick="checkAnswer()">Valider</button>
        </div>
    `;
    
    quizContainer.innerHTML = html;
    
    // Ajouter les événements de clic après le rendu
    attachAnswerClickEvents();
}

// Attacher les événements de clic sur les réponses
function attachAnswerClickEvents() {
    const answerOptions = document.querySelectorAll('.answer-option');
    const question = shuffledQuestions[currentQuestionIndex];
    const isMultiple = question.correctAnswers.length > 1;
    
    answerOptions.forEach((option) => {
        option.addEventListener('click', function(e) {
            // Ne pas traiter si on clique directement sur l'input ou le label
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'LABEL') {
                return;
            }
            
            const index = this.dataset.index;
            const input = document.getElementById(`answer-${index}`);
            
            if (isMultiple) {
                // Checkbox - toggle
                input.checked = !input.checked;
            } else {
                // Radio button - sélectionner celui-ci
                input.checked = true;
            }
        });
    });
}

// Mettre à jour la barre de progression
function updateProgress() {
    const progress = document.getElementById('progress');
    const percentage = ((currentQuestionIndex) / shuffledQuestions.length) * 100;
    progress.style.width = `${percentage}%`;
}

// Vérifier la réponse
function checkAnswer() {
    const question = shuffledQuestions[currentQuestionIndex];
    const selectedAnswers = Array.from(document.querySelectorAll('input[name="answer"]:checked'))
        .map(input => parseInt(input.value));
    
    // Vérifier si des réponses ont été sélectionnées
    if (selectedAnswers.length === 0) {
        alert('Veuillez sélectionner au moins une réponse.');
        return;
    }
    
    // Vérifier si la réponse est correcte
    const isCorrect = arraysEqual(selectedAnswers.sort(), question.correctAnswers.sort());
    
    if (isCorrect) {
        score++;
        nextQuestion();
    } else {
        showCorrectAnswers(question);
    }
}

// Comparer deux tableaux
function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    return arr1.every((value, index) => value === arr2[index]);
}

// Afficher les bonnes réponses
function showCorrectAnswers(question) {
    const correctionsSection = document.getElementById('corrections');
    const correctAnswersDiv = document.getElementById('correct-answers');
    
    const correctAnswersText = question.correctAnswers
        .map(index => question.answers[index])
        .join(', ');
    
    correctAnswersDiv.innerHTML = `
        <p><strong>Les bonnes réponses sont :</strong></p>
        <p>${correctAnswersText}</p>
        <div class="button-group">
            <button class="btn-secondary" onclick="nextQuestion()">Continuer</button>
        </div>
    `;
    
    correctionsSection.style.display = 'block';
    document.getElementById('questions').style.display = 'none';
}

// Passer à la question suivante
function nextQuestion() {
    // Masquer les corrections
    document.getElementById('corrections').style.display = 'none';
    
    // Passer à la question suivante
    currentQuestionIndex++;
    
    // Vérifier si le quiz est terminé
    if (currentQuestionIndex >= shuffledQuestions.length) {
        // S'assurer que la section questions est visible pour afficher les résultats
        document.getElementById('questions').style.display = 'block';
        showResults();
    } else {
        // Afficher la prochaine question
        document.getElementById('questions').style.display = 'block';
        displayQuestion();
    }
}

// Afficher les résultats finaux
function showResults() {
    const quizContainer = document.getElementById('quizz');
    const percentage = ((score / shuffledQuestions.length) * 100).toFixed(1);
    
    // Déterminer le message en fonction du score
    let message = '';
    let emoji = '';
    if (percentage >= 90) {
        message = 'Excellent ! 🎉';
        emoji = '🏆';
    } else if (percentage >= 75) {
        message = 'Très bien ! 👏';
        emoji = '⭐';
    } else if (percentage >= 60) {
        message = 'Bien joué ! 👍';
        emoji = '✅';
    } else {
        message = 'Continuez à réviser ! 📚';
        emoji = '💪';
    }
    
    const html = `
        <div class="score-display">
            <div class="score-value">${emoji}</div>
            <h2 style="color: var(--text-primary); margin-bottom: 2rem;">${message}</h2>
            <div class="score-label">Votre score</div>
            <div class="score-value">${score} / ${shuffledQuestions.length}</div>
            <div class="percentage" style="margin-top: 1rem; color: var(--primary-color);">${percentage}%</div>
            <div class="button-group" style="margin-top: 3rem;">
                <button class="btn-primary" onclick="restartQuiz()">Recommencer</button>
            </div>
        </div>
    `;
    
    quizContainer.innerHTML = html;
    
    // Mettre à jour la barre de progression à 100%
    const progress = document.getElementById('progress');
    if (progress) {
        progress.style.width = '100%';
    }
}

// Recommencer le quiz
function restartQuiz() {
    // Réinitialiser
    currentQuestionIndex = 0;
    score = 0;
    shuffledQuestions = [];
    
    // Afficher la page de configuration
    document.getElementById('setup').style.display = 'block';
    document.getElementById('questions').style.display = 'none';
    document.getElementById('corrections').style.display = 'none';
    
    // Réinitialiser la barre de progression
    document.getElementById('progress').style.width = '0%';
}