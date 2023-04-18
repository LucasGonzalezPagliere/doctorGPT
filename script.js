const submitButton = document.getElementById('submit');

// Set the OpenAI API key
openai.api_key = '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';

// Function to fetch second opinion from the backend API
async function fetchSecondOpinion(prompt) {
  const conversation = [
    {
      role: 'system',
      content: 'You are a doctor',
    },
    {
      role: 'user',
      content: `${prompt}`, // Use template literal syntax
    },
  ];

  const response = await openai.ChatCompletion.create({
    model: 'gpt-4',
    messages: conversation,
    max_tokens: 1000,
    n: 1,
    temperature: 0.6,
  });

  return response.choices[0].message['content'].strip();
}

// Function to handle the click event on the "Get Second Opinion" button
submitButton.addEventListener('click', async () => {
  const inputs = document.querySelectorAll('.input-section input, .input-section select, .input-section textarea');
  let inputJson = {};

  // Iterate over each input field and add the non-blank inputs to the JSON object
  inputs.forEach((input) => {
    if (input.value.trim() !== '') {
      inputJson[input.name] = input.value;
    }
  });

  // Create the user message for the GPT-4 prompt
  const userMessage = JSON.stringify(inputJson);
  const prompt = `Relevant Details: ${userMessage}\n`;

  // Fetch the second opinion from the backend API
  const secondOpinion = await fetchSecondOpinion(prompt);

  // Update the second opinion box with the response
  const outputContent = document.querySelector('.output-content');
  outputContent.innerText = secondOpinion;
});