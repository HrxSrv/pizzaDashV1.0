// app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { message, context } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

    const prompt = `
${context}

User Question: ${message}

Please provide a helpful, accurate response based on the pizza order data provided above. If the question is about data not available in the context, politely explain what data is available. Keep responses conversational and helpful.
`

    const result = await model.generateContent(prompt)
    const response = await result.response.text()

    return NextResponse.json({ response })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}