const { GoogleGenerativeAI } = require('@google/generative-ai')
require('dotenv').config()


const gemini = async (input) => { 

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const prompt = `Coba deskripsikan secara singkat ${input}.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    let text = response.text()

    console.log(text)
    return text
}

module.exports = gemini