import { useState, useEffect } from 'react'


//components 
import NoteDetails from '../components/NoteDetails';
import NoteForm from '../components/NoteForm';


const Home = () => {

    const [notes, setNotes] = useState(null);

    useEffect(() => {
        const fetchNotes = async () => {
            const response = await fetch("http://localhost:4000/api/notes");

            if (response.ok) {
                const json = await response.json();
                setNotes(json);
            }
        }

        fetchNotes();
    }, []);

    return (
        <div className="home">
            <div className='notes'>
                {notes && notes.map((note) => (
                    <NoteDetails key={note._id} note={note}></NoteDetails>
                ))}
            </div>

            <NoteForm></NoteForm>
        </div>
    )
}

export default Home;