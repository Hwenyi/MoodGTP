import {prisma} from '@/utils/db'
import { getUserByClerkID } from '@/utils/auth';
import NewEntryCard from '@/components/NewEntryCard';
import EntryCard from '@/components/EntryCard';

const getEntries = async () => {
    const user = await getUserByClerkID()
    const data = await prisma.journalEntry.findMany({
        where: {
            userId: user.id
        },
        orderBy: {
            createdAt: 'desc'
        },
    })

    return data
}

const JournalPage = async () => {

    const entries = await getEntries()

    return (
        <div className='px-6 py-8 bg-zinc-100/50 h-hull'>
            <h1 className='text-4xl font-bold mb-12'>Journal</h1>
            <div className='grid grid-cols-3 gap-4'>
                <NewEntryCard />
                    {entries.map((entry) => (
                <EntryCard key={entry.id} 
                    entry={entry}
                />
            ))}
            </div>
        </div>
    );
}

export default JournalPage;