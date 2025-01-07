import Editor from "@/components/Editor";
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
        }
    })

    return entry
}

const EntryPage = async ({params}) => {

    const entry = await getEntry(params.id)

    const analysisDate = [
        {name: 'Summary', value: ''},
        {name: 'Subject', value: ''},
        {name: 'Mood', value: ''},
        {name: 'Negetive', value: 'False'},
    ]

    return (
        <div className="w-full h-full grid grid-cols-3">
            <div className="col-span-2 overflow-hidden">
                <Editor entry={entry}/>
            </div>
            <div className="border-l border-black/10">
            <div className="bg-blue-300 px-6 py-10">
                <h2 className="text-2xl">Analysis</h2>
            </div>
                <div>
                    <ul>
                        {analysisDate.map((data) => (
                            <li key={data.name} 
                                className="flex items-center justify-between border-b border-t border-black/10 px-2 py-4"
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