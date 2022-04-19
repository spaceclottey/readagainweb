import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient();

export default async function fetchText(req, res){
    const data = JSON.parse(req.body)

    const createdElement = await prisma.element.create({data})

    
    await prisma.$disconnect();

    res.json(createdElement)
}



