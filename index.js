import express from 'express';
import { config } from 'dotenv';
import { OpenAI } from 'openai';
import tools from './tools/index.js';

config();

const app = express();
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/v1/mcp', async (req, res) => {
  const userMessage = req.body.message;
  const toolDefs = tools.map(t => t.functionDef);

  const chat = await openai.chat.completions.create({
    model: process.env.LLM_MODEL,
    messages: [{ role: 'user', content: userMessage }],
    tools: toolDefs,
    tool_choice: 'auto'
  });

  const response = chat.choices[0];
  const toolCall = response.message.tool_calls?.[0];

  if (toolCall) {
    const tool = tools.find(t => t.functionDef.function.name === toolCall.function.name);
    const args = JSON.parse(toolCall.function.arguments);
    const result = await tool.handler(args);
    return res.json({ response: result });
  }

  res.json({ response: response.message.content });
});

app.listen(process.env.PORT, () => {
  console.log(`✅ MCP Server in ascolto sulla porta ${process.env.PORT}`);
});
