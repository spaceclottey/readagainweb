import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient();

export default async function fetchText(req, res){
    const link = JSON.parse(req.body);
    const hello = await fetch(link)
    
    // console.log(await hello.text())
    console.log("Who's got the power, the power to be a third message")
    res.json(hello)
}



// await prisma.$disconnect();