import { Subject } from './components/Subject';
import {subjects} from './curatedJson.json'
import { Typography } from '@mui/material';
import ResponsiveAppBar from './components/Bar';
import { useState } from 'react';
import Markdown from 'react-markdown';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [ai, setAI] = useState('false')
  const [result,setResult] = useState("")

  async function requestGpt(){
    await fetch("https://nexra.aryahcr.cc/api/chat/gpt", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          messages: [
              {
                  role: "assistant",
                  content: "Hola! como puedo ayudarte hoy?"
              },
              {
                  role: "user",
                  content: "Hola, actua como un bot que me sugiere horarios para mis clases te enviare los horarios disponible y me sugieres que grupos elejir de manera que no choquen, no respondas mas que el horario en markdown con el nombre de la materia grupo y horario"
              },
              {
                  role: "assistant",
                  content: "Claro que si! Estoy listo!"
              },
              {
                role: "user",
                content: JSON.stringify(subjects)
            },
            {
              role: "assistant",
              content: "¡Perfecto! ¡Déjame revisar los horarios y te sugeriré qué grupos elegir para que no choquen!"
          }
          ],
          prompt: "ok",
          model: "gpt-3.5-turbo",
          markdown: false
      })
  }).then((response) => {
      response.text().then((result) => {
        const finaResponse = handleResponse(result)
        setResult(finaResponse)

      }).catch((err) => {
          console.log(err);
      });
  }).catch((err) => {
      console.log(err);
  })
  }

  async function handleAIClick(){
  await toast.promise(requestGpt(),
  {
    pending: "Generando",
    success: "Horario sugerido",
    error: "error"
  })
    setAI(true)
  }

  function handleResponse(text) {
    text = text.substring(text.indexOf('{'), text.length);
    const obj = JSON.parse(text);
    if (!obj || !obj.gpt) throw new Error("Invalid response.");
    return obj.gpt;
}

  return (
    <>
    <ResponsiveAppBar fun={handleAIClick}></ResponsiveAppBar>
    <div className='text-center mx-10'>
      {ai ? <Markdown>{result}</Markdown>: <span></span>}
    </div>
    <Typography className='text-center px-4 py-4' variant='h2'>Horarios ciclo 6</Typography>
    <div className='flex flex-wrap gap-4 justify-center'>
      {subjects.map((subject, index) => (
        <Subject key={index} code={subject.code} subject={subject.name} url={subject.url} />
      ))}
    </div>
    </>
  )
}

export default App
