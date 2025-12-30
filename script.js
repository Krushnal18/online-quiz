const questions = [
  {
    q: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Home Tool Markup Language",
      "Hyperlinks Text Mark Language"
    ],
    answer: "Hyper Text Markup Language"
  },
  {
    q: "Which language styles web pages?",
    options: ["HTML", "CSS", "JavaScript", "Python"],
    answer: "CSS"
  },
  {
    q: "Which is not a JavaScript framework?",
    options: ["React", "Angular", "Vue", "Django"],
    answer: "Django"
  },
  {
    q: "Which keyword declares a constant?",
    options: ["var", "let", "const", "define"],
    answer: "const"
  },
  {
    q: "Which tag is used for JavaScript?",
    options: ["<script>", "<js>", "<javascript>", "<code>"],
    answer: "<script>"
  },
  {
    q: "Which company created JavaScript?",
    options: ["Google", "Microsoft", "Netscape", "Apple"],
    answer: "Netscape"
  },
  {
    q: "Which operator checks value and type?",
    options: ["==", "=", "===", "!="],
    answer: "==="
  },
  {
    q: "Which method prints to console?",
    options: ["print()", "console.log()", "log()", "echo()"],
    answer: "console.log()"
  },
  {
    q: "Which CSS property sets text size?",
    options: ["text-size", "font-size", "size", "text-style"],
    answer: "font-size"
  },
  {
    q: "JavaScript runs on which side?",
    options: ["Server", "Client", "Database", "OS"],
    answer: "Client"
  }
];
let current = 0;
let answers = new Array(questions.length).fill(null);
let time = 10;
let timer;

const authBox = document.getElementById("authBox");
const quizBox = document.getElementById("quizBox");
const resultBox = document.getElementById("resultBox");

function signup() {
  const e = prompt("Enter your email:");
  const p = prompt("Create password:");

  if (!e || !p) {
    alert("Signup cancelled");
    return;
  }

  if (localStorage.getItem(e)) {
    alert("User already exists");
    return;
  }

  localStorage.setItem(e, p);
  alert("Signup successful. Now login.");
}


function login() {
  if (localStorage.getItem(email.value) !== password.value) {
    alert("Invalid login");
    return;
  }
  authBox.classList.add("hidden");
  quizBox.classList.remove("hidden");
  loadQuestion();
}

function loadQuestion() {
  clearInterval(timer);
  time = 10;
  timer = setInterval(() => {
    timerEl.innerText = `Time: ${time--}s`;
    if (time < 0) nextQuestion();
  }, 1000);

  progress.innerText = `${current + 1}/${questions.length}`;
  question.innerText = questions[current].q;
  options.innerHTML = "";

  questions[current].options.forEach(opt => {
    const li = document.createElement("li");
    li.innerText = opt;
    if (answers[current] === opt) li.classList.add("selected");
    li.onclick = () => {
      answers[current] = opt;
      loadQuestion();
    };
    options.appendChild(li);
  });
}

function nextQuestion() {
  if (current < questions.length - 1) {
    current++;
    loadQuestion();
  }
}

function prevQuestion() {
  if (current > 0) {
    current--;
    loadQuestion();
  }
}

function submitQuiz() {
  clearInterval(timer);
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");

  let score = 0;
  answersReview.innerHTML = "";

  questions.forEach((q, i) => {
    if (answers[i] === q.answer) score++;

    const div = document.createElement("div");
    div.innerHTML = `<strong>${q.q}</strong>`;
    q.options.forEach(opt => {
      const p = document.createElement("p");
      p.innerText = opt;
      if (opt === q.answer) p.classList.add("correct");
      if (answers[i] === opt && opt !== q.answer) p.classList.add("wrong");
      div.appendChild(p);
    });
    answersReview.appendChild(div);
  });

  scoreEl.innerText = `Score: ${score} / ${questions.length}`;
}

function restart() {
  location.reload();
}


