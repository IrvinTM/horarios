import { Subject } from './components/Subject';
import {subjects} from './horarios.json'
import { Typography } from '@mui/material';
function App() {

  return (
    <>
    <Typography className='text-center' variant='h2'>Horarios ciclo 6</Typography>
    <div className='flex flex-wrap gap-4 justify-center'>
      {subjects.map((subject, index) => (
        <Subject key={index} code={subject.code} subject={subject.name} url={subject.url} />
      ))}
    </div>
    </>
  )
}

export default App
