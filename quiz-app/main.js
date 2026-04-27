
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





function submitQuiz() {
  
  var allSelected = true;
  for (var i = 0; i < storedQuizData.length; i++) {
    var q = storedQuizData[i];
    var selected = document.querySelector("input[name='question" + q.id + "']:checked");
    
    if (!selected) {
      allSelected = false;

      var fieldset = document.querySelectorAll('#que fieldset')[i];
      
      if (!fieldset.querySelector('.validation-message')) {
        
        fieldset.innerHTML += "<p class='validation-message text-red-500 mt-2 text-center'>Please answer this question.</p>";
      }
    }
  }
  
  if (allSelected) {
    var score = 0;

    for (var i = 0; i < storedQuizData.length; i++) {
      var q = storedQuizData[i];

      var selected = document.querySelector(
        "input[name='question" + q.id + "']:checked"
      );

      var allOptions = document.getElementsByName("question" + q.id);

      var correctOption = q.options.find(opt => opt.isCorrect);

      for (var j = 0; j < allOptions.length; j++) {
        var optionInput = allOptions[j];
        var label = optionInput.parentElement;

        var optionData = q.options.find(opt => opt.id === optionInput.value);

        label.classList.add("bg-gray-300");
        label.classList.remove("hover:bg-gray-200");

        if (optionData.isCorrect) {
          label.classList.add("bg-green-300");
        }

        if (optionInput.checked && !optionData.isCorrect) {
          label.classList.add("bg-red-300");
        }

        optionInput.disabled = true;
      }

      if (selected && selected.value !== correctOption.id) {
        var fieldset = document.querySelectorAll('#que fieldset')[i];
        var explanationDiv = document.createElement('div');
        explanationDiv.textContent = "Explanation: " + q.explanation.text;
        explanationDiv.classList.add('explanation-message', 'text-cyan-900', 'mt-3', 'p-2', 'bg-blue-100', 'rounded-2xl');
        fieldset.appendChild(explanationDiv);
      }

      if (selected) {
        if (selected.value === correctOption.id) {
          score += q.points;
        }
      }
    }

    var resultLabel = document.getElementById("result");
    resultLabel.innerHTML = "<span class= 'border border-black text-cyan-600 rounded-2xl bg-emerald-200 p-2 ml-6' >Your Score is: " + score + "/50 </span>";
  
  }
}

function quitQuiz() {
  document.querySelectorAll("input[type='radio']").forEach(function (input) {
    input.checked = false;
    input.disabled = false;
    

    input.parentElement.classList.remove("bg-green-300", "bg-red-300");
    input.parentElement.classList.add("bg-gray-300", "hover:bg-gray-200");
    
  });
  document.querySelectorAll('#que .validation-message').forEach(div => div.remove());
  document.querySelectorAll('#que .explanation-message').forEach(div => div.remove());
  var resultLabel = document.getElementById("result");
  resultLabel.innerText = "";
  resultLabel.style.display = "none";
}

