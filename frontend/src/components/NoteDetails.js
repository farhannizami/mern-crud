import { useNoteContext } from "../hooks/useNoteContext";

const NoteDetails = ({ note }) => {

    const {dispatch} = useNoteContext();

    const handleClick = async () => {
        const response = await fetch('http://localhost:4000/api/notes/' + note._id, {
            method: 'DELETE'
        });

        const json = await response.json();
        if (response.ok) {
            dispatch({type: 'DELETE_NOTE', payload: json});
        }
    }

    return (
        <div className="note-details">
            <h4>{note.title}</h4>
            <p>{note.msgbody}</p>
            <p>{note.createdAt}</p>
            <span onClick={handleClick}>Delete</span>
        </div>
    )
}

export default NoteDetails;