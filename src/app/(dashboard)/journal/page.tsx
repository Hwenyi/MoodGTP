import {prisma} from '@/utils/db'
import { getUserByClerkID } from '@/utils/auth';
import NewEntryCard from '@/components/NewEntryCard';
import EntryCard from '@/components/EntryCard';
import Link from 'next/link';

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
    <div className="p-6 bg-zinc-100/50 min-h-full">
      <h1 className="text-4xl mb-12">Journals</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <NewEntryCard />
        {entries.map((entry) => (
          <div key={entry.id}>
            <Link href={`/journal/${entry.id}`}>
              <EntryCard entry={entry} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default JournalPage;