
localStorage.setItem("quizQuestions", JSON.stringify(quizData));

var storedQuizData = JSON.parse(localStorage.getItem("quizQuestions"));

function displayDataset() {
  var container = document.getElementById("que");
  var htmlContent = "";
  
  
  for (var i = 0; i < storedQuizData.length; i++) {
    var question = storedQuizData[i];
    htmlContent += "<fieldset class='my-3 border border-gray-300 p-4 rounded'>";
    htmlContent += "<legend class='text-left font-bold'>" + (i + 1) + ". " + question.questionText + "</legend>";
    
    
    for (var j = 0; j < question.options.length; j++) {
      
      var option = question.options[j];
      htmlContent += "<label class='flex items-center border rounded-3xl bg-gray-300 hover:bg-gray-200 border-black px-2 py-2 mt-2 cursor-pointer'>";
      htmlContent += "<input type='radio' name='question" + question.id + "' value='" + option.id + "' class='mr-3'>";      
      htmlContent += "<span class='w-full text-left'>" + option.text + "</span>";
      htmlContent += "</label>";
    }
    
    
    htmlContent += "</fieldset>";
  }
  
  container.innerHTML = htmlContent;
}

displayDataset();


document.getElementById("que").addEventListener("change", function (e) {
  
  if (e.target.type === "radio") {
    
    var selectedInput = e.target;
    var questionName = selectedInput.name; 

    var qId = parseInt(questionName.replace("question", ""));

    var question = storedQuizData.find(q => q.id === qId);

    var allOptions = document.getElementsByName(questionName);

    for (var i = 0; i < allOptions.length; i++) {
      var optionInput = allOptions[i];
      var label = optionInput.parentElement;

      var optionData = question.options.find(opt => opt.id === optionInput.value);


      //correct/incorrect

      if (optionInput.checked && optionData.isCorrect) {  
        label.classList.remove("bg-gray-300", "hover:bg-gray-200");
        label.classList.add("bg-green-300");
      }

      if (optionInput.checked && !optionData.isCorrect) {
        label.classList.remove("bg-gray-300", "hover:bg-gray-200");
        label.classList.add("bg-red-300");
      }

      if (!optionInput.checked && optionData.isCorrect) {
        label.classList.remove("bg-gray-300", "hover:bg-gray-200");
        label.classList.add("bg-green-300");
      }

      optionInput.disabled = true;
    }
  }
});


function submitQuiz() {
  var score = 0;

  for (var i = 0; i < storedQuizData.length; i++) {
    var q = storedQuizData[i];

    var selected = document.querySelector(
      "input[name='question" + q.id + "']:checked"
    );

    if (selected) {
      var correctOption = q.options.find(opt => opt.isCorrect);

      if (selected.value === correctOption.id) {
        score += q.points;
      }
    }
  }

  document.getElementById("result").innerText = "Your Score is: " + score + "/50";
  document.getElementById("result").classList.add(
    "border",
    "border-black",
    "text-cyan-600",
    "rounded-2xl",
    "bg-emerald-200",
    "p-2",
    "ml-6"
  );
}

function quitQuiz() {
  document.querySelectorAll("input[type='radio']").forEach(function (input) {
    input.checked = false;
    input.disabled = false;
    

    input.parentElement.classList.remove("bg-green-300", "bg-red-300");
    input.parentElement.classList.add("bg-gray-300", "hover:bg-gray-200");
    
  });
}

