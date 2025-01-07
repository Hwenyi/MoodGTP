import { ChatOpenAI } from "@langchain/openai";

const template = {
    mood: "the mood of the person who wrote the journal entry",
    subject: "the subject of the journal entry",
    negative: "is the journal entry negative? (true/false)",
    summary: "quick summary of the entire entry",
    color: "hexadecimal color code representing the mood (#XXXXXX)",
    sentimentScore: "number between -10 and 10"
};

const getPrompt = async (content: string) => {
    const format_instructions = JSON.stringify(template, null, 2);
    
    const promptTemplate = 
        'Analyze the following journal entry and provide a response in the exact JSON format shown below:\n\n' +
        `${format_instructions}\n\n` +
        'Journal Entry:\n{entry}';

    const formattedPrompt = promptTemplate.replace('{entry}', content);
    
    return formattedPrompt;
}


export const analyze = async (prompt: string) => {
    try {
        const llm = new ChatOpenAI({
            temperature: 0,
            model: "gpt-4-turbo",
            configuration: {
                baseURL: process.env.NEXT_PUBLIC_BASE_URL,
            }
        }).bind({
            response_format: { type: "json_object" }
        });

        const formattedPrompt = await getPrompt(prompt);
        
        const aiResponse = await llm.invoke(formattedPrompt);
        
        const contentStr = JSON.stringify(aiResponse.content)
            
        const result = JSON.parse(contentStr);

        return result;
    } catch (error) {
        console.error('AI Analysis Error:', error);
        throw error;
    }
}