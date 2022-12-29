const { log } = require("console");
const express = require("express");
const app = express();
const cors = require("cors");
const Port = process.env.PORT || 3000;
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

app.use(express.json());
app.use(cors());

const configuration = new Configuration({
  organization: "org-DCot0DYFLH2shoTfRkxU55yw",
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.get("/", async (req, res) => {
  res.json({ greetings: "Greetings From The Anton Ai made by z33l" });
});

app.post("/ask", async (req, res) => {
  // console.log(req.body);
  const { message, utemperature, maxLength } = req.body;
  try {
    // const response = await openai.createCompletion({
    //   model: "text-davinci-003",
    //   prompt: "write about you",
    //   temperature: 0,
    //   max_tokens: 3000,
    //   top_p: 1,
    //   frequency_penalty: 0,
    //   presence_penalty: 0,
    // });

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: message,
      temperature: Number(utemperature) || 0.5, // Higher values means the model will take more risks.
      max_tokens: Number(maxLength) || 2000, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
      top_p: 1, // alternative to sampling with temperature, called nucleus sampling
      frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
      presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
    });
    // console.log(response.data.choices[0].text);
    const ans = response.data.choices[0].text;
    res.status(200).json(ans);
  } catch (e) {
    // console.error(e);
    res.status(500).send(e || "Something went wrong");
  }
});

app.listen(Port, () => {
  console.log("AI server started on http://localhost:3000");
});
