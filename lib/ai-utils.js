const {GoogleGenerativeAI, SchemaType} = require('@google/generative-ai');

// Define the allowed categories
const categories = ["Watch", "Eat", "Read", "Buy"];

// Initialize AI using the API key
const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY);

// Define the JSON schema for the task
const schema = {
  description: "Structured task format with predefined categories",
  type: SchemaType.OBJECT,
  properties: {
    Title: {
      type: SchemaType.STRING,
      description: "The title of the task",
      nullable: false,
    },
    Details: {
      type: SchemaType.STRING,
      description: "Detailed description of the task",
      nullable: false,
    },
    Category: {
      type: SchemaType.STRING,
      description: "Category of the task",
      enum: categories,
      nullable: false,
    },
  },
  required: ["Title", "Details", "Category"],
};

async function generateTask(userQuery) {
  try {
    // Get the generative model with the specified schema
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    // Define the prompt with instructions
    let prompt = `Convert the following task description into a structured format with Title, Details, and Category.
    The Category should be one of the following: ${categories.join(", ")}.
    Task: ${userQuery}`;
    if (userQuery.trim().length === 0) {
      prompt = `Create a structured format with Title, Details, and Category. Pick those values randomly.
    The Category should be one of the following: ${categories.join(", ")}.
    Task: `;
    }

    // Generate content using the model
    const result = await model.generateContent(prompt);

    // Convert JSON to object
    const taskObj = JSON.parse(result.response.text());

    return {error: null, task: taskObj};

  } catch (error) {
    return {error: error.message, task: null};
  }
}

module.exports = {generateTask, categories};
