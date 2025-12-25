const questions = [
  {q:"Nutrition is the science of food and health.",a:true},
  {q:"Proteins are the main energy source.",a:false},
  {q:"Malnutrition includes overnutrition.",a:true}
];

let index=0;
let results=[];
let answered=false;

const qText=document.getElementById("questionText");
const counter=document.getElementById("counter");
const trueBtn=document.getElementById("trueBtn");
const falseBtn=document.getElementById("falseBtn");
const nextBtn=document.getElementById("nextBtn");
const retryBtn=document.getElementById("retryBtn");
const qList=document.getElementById("questionsList");
const qProgress=document.getElementById("qProgress");

/* MENU */
function toggleMenu(){
  const m=document.getElementById("sideMenu");
  const o=document.getElementById("overlay");
  if(m.style.right==="0px"){m.style.right="-250px";o.style.display="none";}
  else{m.style.right="0";o.style.display="block";}
}

/* START */
function startQuiz(){
  index=0;
  results=Array(questions.length).fill(null);
  document.getElementById("home").style.display="none";
  document.getElementById("quiz").style.display="block";
  retryBtn.style.display="none";
  buildQuestions();
  loadQuestion();
}

/* LOAD */
function loadQuestion(){
  answered = results[index]!==null;
  trueBtn.style.background="#3498db";
  falseBtn.style.background="#3498db";

  if(answered){
    const correct=questions[index].a;
    const user=results[index];
    (correct?trueBtn:falseBtn).style.background="#27ae60";
    if(user!==correct){
      (user?trueBtn:falseBtn).style.background="#e74c3c";
    }
  }

  counter.innerText=`Question ${index+1}/${questions.length}`;
  qText.innerText=questions[index].q;
  nextBtn.style.display=answered?"inline-block":"none";
}

/* ANSWER */
function answer(val){
  if(answered) return;
  answered=true;
  const correct=questions[index].a;
  results[index]=(val===correct);

  if(val===correct){
    (val?trueBtn:falseBtn).style.background="#27ae60";
  }else{
    (val?trueBtn:falseBtn).style.background="#e74c3c";
    (correct?trueBtn:falseBtn).style.background="#27ae60";
  }

  updateProgress();
  nextBtn.style.display="inline-block";
}

/* NEXT */
function nextQuestion(){
  if(results.includes(null)){
    index = (index+1)%questions.length;
    loadQuestion();
  }else{
    finishQuiz();
  }
}

/* FINISH */
function finishQuiz(){
  qText.innerText=`✅ Finished\nScore: ${results.filter(r=>r).length}/${questions.length}`;
  counter.innerText="";
  nextBtn.style.display="none";
  retryBtn.style.display="inline-block";
}

/* RETRY */
function retryQuiz(){
  startQuiz();
}

/* QUESTIONS LIST */
function buildQuestions(){
  qList.innerHTML="";
  questions.forEach((_,i)=>{
    const d=document.createElement("div");
    d.className="q-item unanswered";
    d.innerText=i+1;
    d.onclick=()=>{
      index=i;
      loadQuestion();
      qList.style.display="none";
    };
    qList.appendChild(d);
  });
}

function updateProgress(){
  qProgress.innerText=`(${results.filter(r=>r!==null).length}/${questions.length})`;
  document.querySelectorAll(".q-item").forEach((d,i)=>{
    d.className="q-item "+(results[i]===true?"correct":results[i]===false?"wrong":"unanswered");
  });
}

function toggleQuestions(){
  qList.style.display=qList.style.display==="block"?"none":"block";
}