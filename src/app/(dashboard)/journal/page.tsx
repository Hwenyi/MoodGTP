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
    <div className="px-6 py-8 bg-zinc-100/50 h-full">
      <h1 className="text-4xl mb-12">Journals</h1>
      <div className="grid grid-cols-3 gap-4">
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