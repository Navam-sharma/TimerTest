document.addEventListener('DOMContentLoaded', function () {
const quizData = [
  {
  question: "Which tag is used to create a hyperlink in HTML?",
  options: [
    "link",
    "href",
    "url",
    "a",
  ],
  correct:3,
  },
  {
    question: "What is the purpose of the 'alt' attribute in an HTML image tag?",
    options: [
      "To specify the image source",
      "To provide alternative text for the image",
      "To set the image width and height",
      "To style the image using CSS",
    ],
    correct: 1,
  },
  {  
  question: "What does HTML stand for?",
  options: [
  "Hypertext Markup Language",
  "Hyper Transfer Markup Language",
  "Hypertext Machine Language",
  "Hyperlink and Text Markup Language",
  ],
  correct: 0,
  },
  {
  question: "What is the purpose of the JavaScript 'querySelector' method?",
  options: [
    "To select and manipulate HTML elements",
    "To query a database",
    "To create dynamic CSS styles",
    "To handle form submissions",
  ],
  correct: 0,
}
,
{
question: "Which of the following is not a valid HTML element?",
options: [
  "div",
  "span",
  "section",
  "paragraph",
],
correct: 3,
},
];

const quiz= document.querySelector('#quiz');
const scores= document.querySelector('.scores');
const ansele= document.querySelectorAll(".answer");
const [quesele,option_1, option_2, option_3,option_4 ] = 
    document.querySelectorAll(
    "#ques, #option_1, #option_2, #option_3, #option_4");
const submitb = document.querySelector("#submit");
let currentquiz= 0;
let score=0;
// Set the timer duration in seconds
let timerDuration = 5* 60; // 5 minutes
let ansarray=[];
const timerElement = document.getElementById('timer');
const submitButton = document.getElementById('submitBtn');

  function updateTimerDisplay() {
    const minutes = Math.floor(timerDuration / 60);
    const seconds = timerDuration % 60;
    timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  function submitContest() {
    // Stop the timer
    clearInterval(timerInterval);
    // Store the time taken
    const timeTaken = 5 * 60 - timerDuration;
    // Additional parameters
    const additionalParams = {
      // Add more parameters here
      param1: quizData[0].options[ansarray[0]],
      param2: quizData[1].options[ansarray[1]],
      param3: quizData[2].options[ansarray[2]],
      param4: quizData[3].options[ansarray[3]],
      param5: quizData[4].options[ansarray[4]],
    };

    // Construct the query string
    const queryParams = Object.entries({ timeTaken, ...additionalParams })
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');

    // Redirect to Page 3 with query parameters
    window.location.href = `page3.html?${queryParams}`;
  }

  // Initial display
  updateTimerDisplay();

  // Timer countdown
  const timerInterval = setInterval(function () {
    if (timerDuration > 0) {
      timerDuration--;
      updateTimerDisplay();
    } else {
      // Timer has run out, automatically submit the contest
      submitContest();
    }
  }, 1000);
  
  // Attach click event to the submit button
submitButton.addEventListener('click', function () {
  // Call submitContest when the submit button is clicked
  submitContest();
});

//now  add the above array ques ans to html pg
const loadQuiz = ()=>{
    const {question,options}= quizData[currentquiz] ;
    console.log(question);
   // quesele.innerText= question;
    quesele.innerText=`${currentquiz+1} : ${question}` ; //ques number bhi dikhane ke liyo
// score bhi dikhane ke liye
 scores.innerText=`${score}/${quizData.length} `;

options.forEach(
    (currOption,index)=>(window[`option_${index+1}`].innerText=currOption)
);

};
loadQuiz();

const deselectPreviousOption =()=>{
ansele.forEach((currele)=> currele.checked = false);
};
//get selected answer on clicking submit button
const getSelectedOption = ()=>{
    let ans_index;
    ansele.forEach((currOption,index)=>{ //ansele me har option ka data hoga jisko chuna uski value=1 , bakiyo ki =0
        if(currOption.checked){
            ans_index= index;
            
        }
    });
   
    return ans_index;
    //let se return ki bajae hm sirf niche ki line b likh skte h
    //let anselement= Array.from(ansele)
    //return anselement.findIndex((currelem,index) => currelem.checked);
};

submitb.addEventListener('click',()=>{
    const selectedOptionIndex = getSelectedOption();
    console.log(selectedOptionIndex);
    ansarray.push(selectedOptionIndex);
    console.log(ansarray);
    //ab ek ques submit krene ke bad next ques show krne ke liye:
    if(selectedOptionIndex=== quizData[currentquiz].correct){
     // correct:0 variable hai jo sbse phle array me object me use kiya
    score++;
    }
    currentquiz++;
    if(currentquiz < quizData.length){
        deselectPreviousOption();
        loadQuiz();
    }
    else{
        //else jb chlega jb sare questions khatam ho jaenge
        submitContest();
    };
});

});