import { useEffect } from 'react'
import { useNoteContext } from '../hooks/useNoteContext';
import { useAuthContext } from '../hooks/useAuthContext';


//components 
import NoteDetails from '../components/NoteDetails';
import NoteForm from '../components/NoteForm';


const Home = () => {

    const { notes, dispatch } = useNoteContext();
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchNotes = async () => {
            const response = await fetch("http://localhost:4000/api/notes",{
                headers:{
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();

            if (response.ok) {
                dispatch({ type: 'SET_NOTES', payload: json });
            }
        }

        if (user) {
            fetchNotes();
        }
    }, [dispatch, user]);

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