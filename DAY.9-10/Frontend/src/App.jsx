import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {

  const [note, setNote] = useState([])

  function fetchNote() {
    axios.get("http://localhost:3000/api/notes")
      .then((res) => {
        setNote(res.data.note)
      })
  }

  function submitHandler(e){
    e.preventDefault()
    const {title,description}=e.target.elements

    axios.post("http://localhost:3000/api/notes",{
      title:title.value,
      description:description.value
    })
    .then((res)=>{
      console.log(res.data);
      fetchNote()
    })
  }

  function deleteHandler(noteId){
    axios.delete(`http://localhost:3000/api/notes/${noteId}`)
    .then((res)=>{
      console.log(res.data);
      fetchNote()
    })
  }

  function updateHandler(e,noteId){
    e.preventDefault()
    const {update}=e.target.elements

    axios.patch(`http://localhost:3000/api/notes/${noteId}`,{
      description:update.value
    })
    .then((res)=>{
      fetchNote()
    })
  }
  useEffect(() => { fetchNote() }, [])
  return (
    <>
    <form className='note-form-submit' onSubmit={submitHandler} >
      <input name='title' type='text' className='input_box' placeholder='Enter title:'></input>
      <input name='description' type='text' className='input_box' placeholder='Enter description:'></input>
      <button>Submit</button>
    </form>

      <div className='notes'>
        {note.map((note) => {
          return <div className='note' key={note._id}>
            <h1>{note.title}</h1>
            <p>{note.description}</p>
            <button onClick={()=>{
              deleteHandler(note._id)
            }}>Delete</button>



            <form onSubmit={(e)=>{
              updateHandler(e,note._id)
            }}>
              <input type='text' name='update' placeholder='update description'></input>
              <button>update</button>
            </form>
          </div>
        })}
      </div>
    </>
  )
}

export default App
