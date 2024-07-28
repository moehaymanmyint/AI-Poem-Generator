// Show Poem when user search something
function searchPoem(event) {
  event.preventDefault();
  let inputValue = document.querySelector(".search");
  // console.log(inputValue.value);
  apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${inputValue.value}&context=${context}&key=${apiKey}`

  output.innerHTML = `<div class="output">
        <div class="question">
          <i class="fa-regular fa-user"></i>
          <p class="prompt-question">${inputValue.value}</p>
        </div>
        <div class="answer">
          <i class="fa-solid fa-wand-sparkles"></i>
          <pre class="answer-output">Processing to generate...⌛</pre>
        </div>
      </div>`;

  // To clear value text in search bar after submit
  inputValue.value = '';

  new Typewriter('.answer-output', {
    strings: "Processing to generate...⌛",
    autoStart: true,
    cursor: "",
    delay: 20,
  });

  axios.get(apiUrl).then(showSearchPoem);
}

function showSearchPoem(response) {
  document.querySelector('.answer-output').innerHTML = "";

  new Typewriter('.answer-output', {
    strings: response.data.answer,
    autoStart: true,
    cursor: "",
    delay: 5,
  });
};

// To show Processing
function processingAnswer(event) {
  let clickedQuestion = event.currentTarget;
  console.log(clickedQuestion.id);
  let givenPrompt = "";
  if (clickedQuestion.id === "first-question") {
    givenPrompt += `Write me a poem that expresses feelings of love and separation,
                    portraying the pain of distance and the longing for reunion.`;
  }
  if (clickedQuestion.id === "second-question") {
    givenPrompt += `Create a poem that describes the beauty of nature, highlighting the
                    details of the earth, sky, and seas.`;
  }
  if (clickedQuestion.id === "third-question") {
    givenPrompt += `Compose a poem about courage and heroism, depicting the bravery of
                    ancestors and the struggles of battles.`;
  }

  let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${givenPrompt}&context=${context}&key=${apiKey}`;

  output.innerHTML = `<div class="output">
      <div class="question">
        <i class="fa-regular fa-user"></i>
        <p class="prompt-question">${givenPrompt}</p>
      </div>
      <div class="answer">
        <i class="fa-solid fa-wand-sparkles"></i>
        <pre class="answer-output">Processing to generate...⌛</pre>
      </div>
    </div>`;

  new Typewriter('.answer-output', {
    strings: "Processing to generate...⌛",
    autoStart: true,
    cursor: "",
    delay: 20,
  });

  axios.get(apiUrl).then(showOutput);
}

// Functions for given prompt
function showOutput(response) {
  document.querySelector('.answer-output').innerHTML = "";

  new Typewriter('.answer-output', {
    strings: response.data.answer,
    autoStart: true,
    cursor: "",
    delay: 5,
  });
}

// For Output 
let output = document.querySelector(".container");
let promptQuestion = document.querySelector(".prompt-question")
let answerOutput = document.querySelector(".answer-output");

// Looping for given 3 prompt
let givenQuestion = document.querySelectorAll(".given-question");
givenQuestion.forEach((givenQuestions) => {
  givenQuestions.addEventListener("click", processingAnswer);
});

// API
let apiKey = '03aa5321feb0a48eoca7a4tede1f2bb1';
let context = "Create a short parallel poem text in English and Arabic which is easy to understand.";

// For Searching 
let userInput = document.querySelector(".search-box");
userInput.addEventListener("submit", searchPoem);



