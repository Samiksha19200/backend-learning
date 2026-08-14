import { useState } from 'react'
import axios from 'axios'



function App() {

  
  const [notes, setNotes] = useState([
    {
      title: "title1",
      description: "description1"
    },
    {
      title: "title2",
      description: "description2"
    },
    {
      title: "title3",
      description: "description3"
    },
    {
      title: "title4",
      description: "description4"
    }
  ])
  axios.get("http://localhost:3000/api/notes")
    .then((res) => {
      console.log(res.data);

    })

  return (
    <>
      <div className='notes'>

        {notes.map((note, key) => {
          return (
            <div className='note' key={key}>
              <h1>{note.title}</h1>
              <p>{note.description}</p>
            </div>)
        })}
      </div>
    </>
  )
}
export default App
