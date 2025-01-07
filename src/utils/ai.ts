import { ChatOpenAI } from "@langchain/openai";


export const analyze = async (prompt) => {
    try {
        const llm = new ChatOpenAI({
            temperature: 0,
            model: "gpt-4-turbo",
            configuration: {
                baseURL: process.env.NEXT_PUBLIC_BASE_URL,
            }
        })

        const response = (await llm.invoke(prompt)).content
        console.log(response);
        
    } catch (error) {
        console.error('AI Analysis Error:', error);
        throw error;
    }
}
