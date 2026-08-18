import { useEffect, useState } from 'react'
import axios from "axios"

const App = () => {
  const [note, setnote] = useState([])

  function fetchNote() {
    axios.get("https://backend-learning-kix5.onrender.com/api/notes")
      .then((res) => {
        setnote(res.data.note)
      })
  }

  function submitHandler(e) {
    e.preventDefault()

    const { title, description } = e.target.elements

    axios.post("https://backend-learning-kix5.onrender.com/api/notes", {
      title: title.value,
      description: description.value
    })
      .then((res) => {
        console.log(res.data);
        fetchNote()
      })

  }

  useEffect(() => {
    fetchNote()
  }, [])

  function deleteHandler(note_id) {
    axios.delete(`https://backend-learning-kix5.onrender.com/api/notes/${note_id}`)
      .then((res) => {
        console.log(res.data);
        fetchNote()
      })
  }

  function updateHandler(e,note_id){
    e.preventDefault()
    const {update}=e.target.elements
    axios.patch(`https://backend-learning-kix5.onrender.com/pi/notes/${note_id}`,{
      description:update.value
    })
    .then((res)=>{
      console.log(res.data);
      fetchNote()
    })
  }


  return (
    <>
      <form className='note-form' onSubmit={submitHandler}>
        <input type='text' name='title' placeholder='Enter title' className='info'></input>
        <input type='text' name='description' placeholder='Enter description' className='info'></input>
        <button className='info'>Submit</button>

      </form>
      <div className='notes'>
        {note.map((note, key) => {
          return <div className='note' key={key}>
            <h1>{note.title}</h1>
            <p>{note.description}</p>
            <button onClick={() => {
              deleteHandler(note._id)
            }}>delete</button>
            <form onSubmit={(e)=>{
              updateHandler(e,note._id)
            }}>
              <input type='text' name='update' placeholder='Update description'></input>
              <button>update</button>
            </form>
          </div>
        })}
      </div>
    </>
  )
}

export default App

