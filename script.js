const questions = [
  { text: "Com que frequência você sente estresse excessivo no ambiente de trabalho?", options: ["Nunca", "Às vezes", "Frequentemente", "Sempre"] },
  { text: "Você se sente apoiado(a) psicologicamente pela liderança?", options: ["Totalmente", "Parcialmente", "Pouco", "Nada"] },
  // ... (adicione todas as outras perguntas aqui conforme necessário)
];

let currentQuestion = 0;
const responses = new Array(questions.length);
const startBtn = document.getElementById("startBtn");
const quiz = document.getElementById("quiz");
const questionText = document.getElementById("questionText");
const optionsList = document.getElementById("optionsList");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const results = document.getElementById("results");
const summary = document.getElementById("summary");
const restartBtn = document.getElementById("restartBtn");

startBtn.addEventListener("click", () => {
  startBtn.parentElement.classList.add("hidden");
  quiz.classList.remove("hidden");
  showQuestion();
});

function showQuestion() {
  const q = questions[currentQuestion];
  questionText.textContent = `${currentQuestion + 1}. ${q.text}`;
  optionsList.innerHTML = "";
  q.options.forEach((opt, idx) => {
    const li = document.createElement("li");
    li.innerHTML = `<label><input type="radio" name="option" value="${idx}" ${responses[currentQuestion] === idx ? 'checked' : ''}> ${opt}</label>`;
    optionsList.appendChild(li);
  });
}

nextBtn.addEventListener("click", () => {
  saveResponse();
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    showQuestion();
  } else {
    showResults();
  }
});

prevBtn.addEventListener("click", () => {
  saveResponse();
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion();
  }
});

function saveResponse() {
  const selected = document.querySelector("input[name='option']:checked");
  if (selected) {
    responses[currentQuestion] = parseInt(selected.value);
  }
}

function showResults() {
  quiz.classList.add("hidden");
  results.classList.remove("hidden");
  let total = responses.reduce((acc, val) => acc + (val ?? 0), 0);
  summary.innerHTML = `Pontuação total: <strong>${total}</strong> de ${questions.length * 3}`;
}

restartBtn.addEventListener("click", () => {
  location.reload();
});

document.getElementById("exportBtn").addEventListener("click", () => {
  const wb = XLSX.utils.book_new();
  const data = questions.map((q, i) => ({
    Pergunta: q.text,
    Resposta: q.options[responses[i]] || "Não respondida"
  }));
  const ws = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, ws, "Respostas");
  XLSX.writeFile(wb, "avaliacao_ocupacional.xlsx");
});
