import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient();

export default async function fetchText(req, res){
    const link = JSON.parse(req.body).link
    console.log("link: ", link)
    const hello = await fetch(link)
    let text = await hello.text()

    let data = {
        'user': 'public',   
        'url': link,
        'html': text,
    }

    const createdTopic = await prisma.element.create({data})

    
    // console.log(await hello.text())
    // console.log("Who's got the power, the power to be a third message")
    // res.json(hello)
    await prisma.$disconnect();
}



