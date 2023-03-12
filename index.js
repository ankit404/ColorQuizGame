//timer for answering questions
let timer=document.getElementsByClassName("timer")[0];
//having questions and answers 
let quizContainer=document.getElementById("container");

let nextButton=document.getElementById("next-button");
//to give us the number
let numOfQuestions=document.getElementsByClassName("number-of-questions")[0];
//to display title of page , quesions and options and timer
let displayContainer=document.getElementById("display-container");
//user score and restart button
let scoreContainer=document.querySelector(".score-container");
let restart=document.getElementById("restart");
let userScore=document.getElementById("user-score");
//to start game container
let startScreen=document.querySelector(".start-screen");
//start button
let startButton=document.getElementById("start-button");
//question count
let questionCount;
let scoreCount=0;
let count=0;
let countDown;
//hex code
let letters=[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

//Questions and Options
let quizArray=[];
const generateRandomValue = (array) =>array[Math.floor(Math.random()*array.length)];
 
//generate hex[6]color  code generation 
const colorGenerator=()=>{
    newColor="#";
    for(let i=0;i<6;i++){
        newColor+=generateRandomValue(letters);
    }
    return newColor;
};
//create options color
const populateOptions=(optionsArray)=>{
    let expectedLength=4;
    while(optionsArray.length < expectedLength){
        let color=colorGenerator();
        if(!optionsArray.includes(color))
        {
            optionsArray.push(color);
        }
    }
    return optionsArray;
};

//Create Quiz object
const populateQuiz=()=>{
    for(let i=0;i<5;i++){
        let currentColor=colorGenerator();
        let allcolors=[];
        allcolors.push(currentColor);
        allcolors=populateOptions(allcolors);
        quizArray.push({
            id:i,
            correct:currentColor,
            options:allcolors,
        });
    }
};

//next button
nextButton.addEventListener("click",
(displayNext=() => {
    //increment quetion count 
    questionCount+=1;
    //if last question
    if(questionCount==quizArray.length){
    //hide question and show score 
    displayContainer.classList.add("hide");
    scoreContainer.classList.remove("hide");

    //user score
    userScore.innerHTML="Your Score is " + scoreCount + " out of " + questionCount;
    }
    else{
        //display questionCount
        numOfQuestions.innerHTML=questionCount + 1 + " of " + quizArray.length + " Question";

        //Display Quiz
        quizDisplay(questionCount);
        //count=11(it will start with 10)
        count=10;
        //clear interval for next question
        clearInterval(countDown);
        //display timer
        timerDisplay();
    }
    nextButton.classList.add("hide");
}));




//Timer
const timerDisplay = () => {
    countDown = setInterval(() => {
      timer.innerHTML = `<span>Time Left: </span> ${count}s`;
      count--;
      if (count == 0) {
        clearInterval(countDown);
        displayNext();
      }
    }, 1000);
  };

//Display Quiz 
const quizDisplay = (questionCount)=>{
    let quizCards= document.querySelectorAll(".container-mid");
    //hide other cards
    quizCards.forEach((card)=>{
        card.classList.add("hide");
    });

    //Display current question card 
    quizCards[questionCount].classList.remove("hide");
};


//Color guess quiz creation
//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //Generate quiz
    for (let i of quizArray) {
      //Randomly sort options
      i.options.sort(() => Math.random() - 0.5);
      //Quiz card creation
      let div = document.createElement("div");
      div.classList.add("container-mid", "hide");
      //Question number
      numOfQuestions.innerHTML = 1 + " of " + quizArray.length + " Question";
      //question
      let questionDiv = document.createElement("p");
      questionDiv.classList.add("question");
      questionDiv.innerHTML = `<div class="question-color">${i.correct}</div>`;
      div.appendChild(questionDiv);
      //Options
      div.innerHTML += `
      <div class="button-container">
      <button class="option-div" onclick="checker(this)" style="background-color: ${i.options[0]}" data-option="${i.options[0]}"></button>
      <button class="option-div" onclick="checker(this)" style="background-color: ${i.options[1]}" data-option="${i.options[1]}"></button>
      <button class="option-div" onclick="checker(this)" style="background-color: ${i.options[2]}" data-option="${i.options[2]}"></button>
      <button class="option-div" onclick="checker(this)" style="background-color: ${i.options[3]}" data-option="${i.options[3]}"></button>
      </div>
      `;
      quizContainer.appendChild(div);
    }
  }

function checker(userOption){
    let userSolution=userOption.getAttribute("data-option");
    let question=document.getElementsByClassName("container-mid")[questionCount];
    let options=question.querySelectorAll(".option-div");

    //if user selected right answer
    if(userSolution===quizArray[questionCount].correct){
        userOption.classList.add("correct");
        scoreCount++;
        //clear interval
        clearInterval(countDown);
        //disable all options
        options.forEach((element)=>{
            element.disabled=true;
        });
        nextButton.classList.remove("hide");
    }
    else{
        userOption.classList.add("incorrect");
        options.forEach((element)=>{
            if(element.getAttribute("data-option")==quizArray[questionCount].correct){
                element.classList.add("correct");
            }
        });
    }
    
    //clear interval
    clearInterval(countDown);
    //disable all options
    options.forEach((element)=>{
        element.disabled=true;
    });
    nextButton.classList.remove("hide");
}

function initial(){
    nextButton.classList.add("hide");
    quizContainer.innerHTML="";
    questionCount=0;
    scoreCount=0;
    clearInterval(countDown);
    count=10;
    timerDisplay()
    quizCreator();
    quizDisplay(questionCount);
}
//Restart Game
restart.addEventListener("click",()=>{
    quizArray=[];
    populateQuiz();
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});


//When Start button is clicked
startButton.addEventListener("click",()=>{
startScreen.classList.add("hide");
displayContainer.classList.remove("hide");
quizArray=[];
populateQuiz();
initial();
});

