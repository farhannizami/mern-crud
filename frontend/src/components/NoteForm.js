import { useState } from 'react'
import { useNoteContext } from '../hooks/useNoteContext'

const WorkoutForm = () => {
    const {dispatch} = useNoteContext();
    const [title, setTitle] = useState('');
    const [msgbody, setMsgBody] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault()

        const workout = { title, msgbody }

        const response = await fetch('http://localhost:4000/api/notes', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error);
        }
        if (response.ok) {
            setError(null);
            setTitle('');
            setMsgBody('');
            console.log('new Note added:', json);
            dispatch({type: 'CREATE_NOTE', payload: json});
        }

    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Note</h3>

            <label>Note Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />

            <label>Note Body:</label>
            <input
                type="text"
                onChange={(e) => setMsgBody(e.target.value)}
                value={msgbody}
            />

            <button>Add Note</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm