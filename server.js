import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const PORT = 8800 || process.env.PORT;

const configuration = new Configuration({
  organization: "org-HbijweiCAWlYI5LTtfpKd3MT",
  apiKey: process.env.OPEN_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.get("/", async (req, res) => {
  try {
    res.status(200).send({
      message: "helllo",
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/api", async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    res.status(200).send({
      bot: response.data.choices[0].text,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
});

app.listen(PORT, () => {
  console.log(`Server is runing on port http://localhost:${PORT}`);
});
