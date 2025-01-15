import HistoryChart from '@/components/HistoryChart'
import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'

const getData = async () => {

  const user = await  getUserByClerkID()

  const analyses = await prisma.analysis.findMany({
    where: {
        userId: user.id,
    },
    select: {
        sentimentScore: true,
        createdAt: true,
        mood: true,
        color: true,
    },
    orderBy: {
        createdAt: 'desc',
    },
  })

  const total = analyses.reduce((acc, curr) => {
    return acc + curr.sentimentScore
  }, 0)

  const average = analyses.length ? Number(total.toFixed(2)) : 0  // 保留两位小数

  return { analyses, average }

}

const HistoryPage = async () => {

  const { analyses, average } = await getData()

  return (
    <div className="h-full px-6 py-8">
      <div>
        <h1 className="text-2xl mb-4">{`Avg. Sentiment: ${average}`}</h1>
      </div>
      <div className="h-full w-full">
        <HistoryChart data={analyses} />
      </div>
    </div>
  )
}

export default HistoryPage