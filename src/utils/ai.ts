import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { console } from "inspector";
import { loadQARefineChain } from "langchain/chains";
import { Document } from "langchain/document";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

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
        '分析以下Journal Entry，并以以下JSON格式提供回复。使用与Journal Entry相同的语言响应。:\n\n' +
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
        
        const result = JSON.parse(aiResponse.content);

        console.log(result)

        return result;

    } catch (error) {

        console.error('AI Analysis Error:', error);

        throw error;
    }
}

export const qa = async(question, entries) => {
    const docs = entries.map((entry) => {
        return new Document({
            pageContent: entry.content,
            metadata: {id: entry.id, createdAt: entry.createdAt}
        })
    })

    const llm = new ChatOpenAI({
        temperature: 0,
        model: "gpt-4-turbo",
        configuration: {
            baseURL: process.env.NEXT_PUBLIC_BASE_URL,
        }
    })

    // const chain = loadQARefineChain(llm)

    const embdeddings = new OpenAIEmbeddings({
        model: "text-embedding-3-small",
        dimensions: 1024,
        configuration: {
            baseURL: process.env.NEXT_PUBLIC_BASE_URL,
        }
    })

    const store = await MemoryVectorStore.fromDocuments(docs, embdeddings)

    const relavantDocs = await store.similaritySearch(question) 

    const context = relavantDocs.map((doc) => {
        const date = new Date(doc.metadata.createdAt).toLocaleDateString('zh-CN');
        return `${date}的记录:\n${doc.pageContent}`;
    }).join('\n\n');

        const promptTemplate = `
    请基于以下日记记录回答问题。
    回答时请使用具体的日期而不是上下文编号来引用信息来源。
    如果记录中没有相关信息，请说明"基于提供的日记记录无法回答该问题"。

    日记记录:
    ${context}

    问题: ${question}

    使用和日记记录相同的语言回答。请提供准确、相关且仅基于上述日记记录的回答，并在引用信息时标注具体日期。`;

    const res = await llm.invoke(promptTemplate)

    return res.content
}