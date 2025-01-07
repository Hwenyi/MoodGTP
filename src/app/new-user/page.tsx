import { prisma } from "@/utils/db"
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from "next/navigation"

const createNewUser = async() => {

    const user = await currentUser() //从clerk获取当前用户

    const mathch = await prisma.user.findUnique({
        where: {
            clerkId: user.id as string
        }
    })

    if(!mathch) {
        await prisma.user.create({
            data: {
                clerkId: user.id, //clerk分配的id设置为用户的clerkId
                email: user?.emailAddresses[0].emailAddress,
            }
        })
    }

    redirect('/journal')
}

const NewUser = async () => {
    await createNewUser()
    return <div>...loading</div>
}

export default NewUser