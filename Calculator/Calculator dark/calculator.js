var display = document.getElementById("screen");
var buttons = document.getElementsByClassName("button");

// Add an event listener to each button
Array.prototype.forEach.call(buttons, function(button) {
  button.addEventListener("click", function() {
    // Check if the button's text is a valid input
    if (isValidInput(button.textContent)) {
      // Append the button's text to the display
      if (display.value.length < 12) { // Limit the input length
        display.value += button.textContent;
        adjustFontSize(); // Adjust font size after each input
      }
    } else if (button.textContent === "=") {
      // Calculate the result
      calculateResult();
    } else if (button.textContent === "AC") {
      // Clear the display
      clearDisplay();
    }
  });
});

// Function to validate input
function isValidInput(input) {
  // Define allowed characters
  var allowedCharacters = "0123456789.+-*/()";
  // Check if the input is among the allowed characters
  return allowedCharacters.includes(input);
}

// Function to calculate the result
function calculateResult() {
  try {
    // Use eval to evaluate the expression in the display
    var result = eval(display.value);
    // Update the display with the result
    display.value = result;
  } catch (error) {
    // Handle errors such as division by zero or syntax errors
    display.value = "Error";
  }
}

// Function to clear the display
function clearDisplay() {
  display.value = "";
}

// Function to format the display with commas
function formatDisplay() {
  // Remove any non-digit characters and commas from the input
  var sanitizedInput = display.value.replace(/[^0-9.]/g, "");
  // Split the input into integer and decimal parts
  var parts = sanitizedInput.split(".");
  // Format the integer part with commas
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // Update the display with the formatted number
  display.value = parts.join(".");
}

// Function to adjust font size based on input length
function adjustFontSize() {
  var maxLength = 12; // Maximum length of characters
  var currentLength = display.value.length; // Current length of characters
  var baseFontSize = 24; // Base font size
  var scaleFactor = 3.5; // Scaling factor for font size adjustment
  var minimumFontSize = 6; // Minimum font size

  // Calculate the new font size based on the length of the input value
  var newSize = baseFontSize + scaleFactor * (maxLength - currentLength);

  // Ensure the font size doesn't become too small
  newSize = Math.max(newSize, minimumFontSize); // Minimum font size

  // Apply the new font size to the display
  display.style.fontSize = newSize + "px";
}

