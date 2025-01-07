import Editor from "@/components/Editor";
import { analyze } from "@/utils/ai";
import { getUserByClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";

const getEntry = async(id) => {

    const user = await getUserByClerkID()

    const entry = await prisma.journalEntry.findUnique({
        where: {
            userId_id: {
                userId: user.id,
                id,
            }
        },
        include: {
            analysis: true,
        },
    })

    return entry
    
}

const EntryPage = async ({params}) => {

    const entry = await getEntry(params.id)

    const { mood = '', summary = '', subject = '', color = '', sentimentScore = 0, negative = false } =
    entry?.analysis ?? {}

    const analysisDate = [
        {name: 'Mood', value: mood},
        {name: 'Summary', value: summary},
        {name: 'Subject', value: subject},
        {name: 'sentimentScore', value: sentimentScore},
        {name: 'Negetive', value: negative ? 'Yes' : 'No'},
    ]

    return (
        <div className="w-full h-full grid grid-cols-3">
            <div className="col-span-2 overflow-hidden">
                <Editor entry={entry}/>
            </div>
            <div className="border-l border-black/10">
            <div className="px-6 py-10" style={{backgroundColor: color}}>
                <h2 className="text-2xl">Analysis</h2>
            </div>
                <div>
                    <ul>
                        {analysisDate.map((data) => (
                            <li key={data.name} 
                            className="px-2 py-4 border-t border-black/10 flex items-center justify-between"
                            >
                                <span className="text-lg font-semibold">{data.name}</span>
                                <span>{data.value}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
} 

export default EntryPage;