import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { PrismaClient } from '@prisma/client'
import Link from 'next/link'


const prisma = new PrismaClient();
export default function Element({currentElement}){
  let [showAnswer, setShowAnswer] = useState(false)

  const makeExtract = async () => {
    let selectedText = window.getSelection().toString().replace(/(?:\r\n|\r|\n)/g, '<br />')
    console.log("text: ", selectedText)

    let data = {
        html: selectedText,
        url: currentElement.link
    }

    const response = await fetch("/api/createElement", {
      method: "POST",
      body: JSON.stringify(data),
    });

    console.log(response)
  }

  const makeFlashcard = async () => {
    let selectedText = window.getSelection().toString().replace(/(?:\r\n|\r|\n)/g, '<br />')
    console.log("text: ", selectedText)

    let clozedHTML = currentElement.html.replace(selectedText, '[...]')

    let data = {
        url: currentElement.link,
        cardFront: clozedHTML,
        cardBack: selectedText,
    }

    const response = await fetch("/api/createElement", {
      method: "POST",
      body: JSON.stringify(data),
    });

    console.log(response)
  }

  
  


  return(
    <div> 
      <Link href={`http://localhost:3000/e/${currentElement.id + 1}`}>
        <button> NO NO NO STOP IT RIGHT NOW</button>
      </Link>
      <button onClick={makeExtract}> EXTRACT TEXT </button>
      <button onClick={makeFlashcard}> Create Flashcard </button>
      <button onClick={() => setShowAnswer(!showAnswer)}> Show Answer </button>
      <div dangerouslySetInnerHTML={{__html: currentElement.html}} />
      <div dangerouslySetInnerHTML={{__html: currentElement.cardFront}} />
      <hr />
      {showAnswer && <div dangerouslySetInnerHTML={{__html: currentElement.cardBack}} />}
    </div> 
  )
} 


export async function getServerSideProps(context){
  let slugID = Number(context.query.id)
  console.log("currentElement: ", slugID)

  let currentElement = await prisma.element.findFirst({
    where: {
      id: slugID,
    }
  })
  await prisma.$disconnect()

  if (!currentElement) {
    return {
      redirect: {
        destination: "/e/1",
        permanent: false,
      },
    };
  }

  console.log(currentElement.notes)

  return {
    props: {
      currentElement: currentElement
    }
  }
}