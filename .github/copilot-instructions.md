# CSNA Quiz Application - AI Agent Instructions

## Project Overview
This is a vanilla JavaScript quiz application for studying the **CSNA (Certified Stormshield Network Associate)** certification. It's a modern single-page application that loads 146 questions from a JSON file and presents a randomized quiz experience.

## Architecture & Data Flow

### Data Format
- **Active Format**: `questions.json` - JSON format with structured question objects (146 questions)
- **Legacy Format**: `quizz.csv` - Semicolon-delimited CSV with ANSI encoding (kept for reference only)
- **Implementation**: `script.js` uses modern async/await pattern to load questions from JSON

**JSON Structure**:
```json
{
  "id": 1,
  "question": "Question text",
  "type": "text",
  "answers": ["Answer 1", "Answer 2"],
  "correctAnswers": [0, 1],  // Zero-indexed
  "image": null
}
```

### Application Flow
1. **Setup Phase**: User selects number of questions (1-146 max from current dataset)
2. **Shuffle**: Questions randomized via Fisher-Yates algorithm - prevents duplicates
3. **Quiz Loop**: One question at a time with immediate validation
4. **Correction Mode**: Wrong answers trigger correction display with "Suivant" button
5. **Scoring**: Final score shown as count and percentage with visual progress bar

### State Management
- Uses component-level variables (no localStorage in modern version):
  - `score`: Current correct answer count
  - `currentQuestionIndex`: Position in shuffled questions array
  - `shuffledQuestions`: Array holding active quiz questions
  - `allQuestions`: All loaded questions from JSON

## Key Conventions

### Multi-Select Logic
- Single correct answer → Radio buttons (`type="radio"`)
- Multiple correct answers → Checkboxes (`type="checkbox"`)
- Determined by `question.correctAnswers.length`

### Answer Validation
- **All correct answers must be selected** - partial credit not supported
- Logic in `checkAnswer()`: compares selected answers against `correctAnswers` array
- Wrong answer → Shows corrections section with highlighted correct answers

### Image Questions
- Type "image" questions display image via `question.image` URL
- Images rendered inline before answer choices
- CSS: `img { max-width: 100%; border-radius: 0.75rem; }`

## Development Notes

### Modern JavaScript Features
- Uses `async/await` for JSON loading (no synchronous XMLHttpRequest)
- ES6+ syntax: template literals, spread operator, arrow functions
- Fisher-Yates shuffle algorithm for randomization
- Event delegation for answer selection

### Styling
- Modern CSS with CSS custom properties (variables)
- Gradient backgrounds and smooth animations
- Card-based layout with glassmorphism effects
- Responsive design with flexbox
- Font: Inter from Google Fonts

### File Roles
- `script.js` / `style.css` = Active production files (modern version)
- `script copy.js` / `style copy.css` = Legacy CSV-based implementation (deprecated)
- **Always modify active files, not copies**

### No Build Process
- Open `index.html` directly in browser (use modern browser for full support)
- No transpilation, bundling, or dev server required
- Uses `defer` attribute on script tag for DOM-ready guarantee
- For best compatibility, use local server: `python -m http.server`

### French Language
- All UI text, questions, and comments in French
- Button labels: "Commencer le quiz", "Valider", "Suivant", "Recommencer"
- Footer attribution: "Site réalisé par Rémy Cuvelier - 2025"

## Common Tasks

### Adding Questions
1. Add to `questions.json` following the structure above
2. Increment max value in `index.html`: `<input type="number" ... max="146">`
3. Questions are automatically loaded via `loadQuestions()` function
4. Use zero-indexed arrays for `correctAnswers`

### Converting CSV to JSON
- Script `convert.ps1` converts `quizz.csv` to JSON format
- Handles 1-indexed to 0-indexed conversion automatically
- Run: `.\convert.ps1` (requires PowerShell)

### Styling Changes
- Edit CSS variables in `:root` selector for global theme changes
- Primary color: `--primary-color: #2563eb`
- Card background: `--card-bg: #ffffff`
- All animations use CSS transitions and keyframes

### Testing Locally
- Direct file opening works but may have CORS issues
- Recommended: Use local server for testing
  - Python: `python -m http.server 8000`
  - PHP: `php -S localhost:8000`
- Test in Chrome, Firefox, or Edge (officially supported)

## Key Files & Their Purpose
- `index.html`: Main HTML structure with setup form and quiz containers
- `script.js`: Modern async quiz logic with ES6+ features
- `style.css`: Modern CSS with variables, animations, and responsive design
- `questions.json`: 146 CSNA certification questions in JSON format
- `convert.ps1`: PowerShell script to convert CSV to JSON
