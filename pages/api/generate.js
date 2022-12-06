import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)
const generateAction = async (req, res) => {
  // I build Prompt #2.
  const input = `
  Give me a detailed seven step plan with links (wrapped in html <a> tags) to highly reviewed and reputable free online educational material to completely master the skill defined below, all wrapped in an html p tag. Start from the basics and move towards more advanced topics.

  Skill: ${req.body.userInput}

  Plan:
  `

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${input}`,
    temperature: 0.83,
    max_tokens: 1000,
  })

  // Get the output
  const output = baseCompletion.data.choices.pop()

  res.status(200).json({ output: output })
}

export default generateAction
