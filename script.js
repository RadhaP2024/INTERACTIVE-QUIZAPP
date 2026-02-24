// Quiz data - array of objects [citation:5]
const questions = [
    {
        question: "What is the capital of France?",
        choices: ["London", "Paris", "Berlin", "Madrid"],
        correct: 1 // index of correct answer (0-based)
    },
    {
        question: "Which planet is known as the Red Planet?",
        choices: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: 1
    },
    {
        question: "What is 2 + 2?",
        choices: ["3", "4", "5", "6"],
        correct: 1
    },
    {
        question: "Which language runs in a web browser?",
        choices: ["Java", "C++", "Python", "JavaScript"],
        correct: 3
    }
];

let currentQuestion = 0;
let score = 0;
let selectedOption = null;

// Get DOM elements
const questionEl = document.getElementById('question-text');
const optionsEl = document.getElementById('options');
const submitBtn = document.getElementById('submit-btn');
const feedbackEl = document.getElementById('feedback');
const scoreEl = document.getElementById('score');

// Initialize the quiz
function showQuestion() {
    const question = questions[currentQuestion];
    questionEl.textContent = question.question;
    
    // Create options dynamically
    optionsEl.innerHTML = '';
    question.choices.forEach((choice, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'choice';
        radio.value = index;
        radio.id = `choice-${index}`;
        
        const label = document.createElement('label');
        label.htmlFor = `choice-${index}`;
        label.textContent = choice;
        
        optionDiv.appendChild(radio);
        optionDiv.appendChild(label);
        
        // Add click event to the entire option div
        optionDiv.addEventListener('click', () => {
            // Remove selected class from all options
            document.querySelectorAll('.option').forEach(opt => {
                opt.classList.remove('selected');
            });
            // Add selected class to clicked option
            optionDiv.classList.add('selected');
            radio.checked = true;
            selectedOption = index;
        });
        
        optionsEl.appendChild(optionDiv);
    });
    
    // Clear feedback and reset selected option
    feedbackEl.textContent = '';
    feedbackEl.className = 'feedback';
    selectedOption = null;
    
    // Enable submit button
    submitBtn.disabled = false;
}

// Check the selected answer [citation:1]
function checkAnswer() {
    if (selectedOption === null) {
        feedbackEl.textContent = 'Please select an answer!';
        feedbackEl.className = 'feedback incorrect';
        return;
    }
    
    const correct = questions[currentQuestion].correct;
    
    if (selectedOption === correct) {
        feedbackEl.textContent = 'Correct! ✅';
        feedbackEl.className = 'feedback correct';
        score++;
    } else {
        const correctAnswer = questions[currentQuestion].choices[correct];
        feedbackEl.textContent = `Incorrect! ❌ The correct answer was: ${correctAnswer}`;
        feedbackEl.className = 'feedback incorrect';
    }
    
    // Disable submit button after answering
    submitBtn.disabled = true;
    
    // Move to next question after delay [citation:5]
    setTimeout(() => {
        currentQuestion++;
        
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            // Show final score
            questionEl.textContent = 'Quiz Complete!';
            optionsEl.innerHTML = '';
            feedbackEl.innerHTML = '';
            scoreEl.textContent = `You scored ${score} out of ${questions.length}!`;
            submitBtn.style.display = 'none';
        }
    }, 2000);
}

// Event listener for submit button
submitBtn.addEventListener('click', checkAnswer);

// Start the quiz
showQuestion();