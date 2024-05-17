import { useState } from 'react';
import { useNoteContext } from '../hooks/useNoteContext';
import { useAuthContext } from '../hooks/useAuthContext';

const WorkoutForm = () => {
    const { dispatch } = useNoteContext();
    const [title, setTitle] = useState('');
    const [msgbody, setMsgBody] = useState('');
    const [error, setError] = useState(null);
    const [emptyfield, setEmptyfield] = useState([]);
    const { user } = useAuthContext();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setError('You must be logged in');
            return;
        }

        const workout = { title, msgbody };

        const response = await fetch('http://localhost:4000/api/notes', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error);
            setEmptyfield(json.emptyfield);
        }
        if (response.ok) {
            setError(null);
            setTitle('');
            setMsgBody('');
            setEmptyfield([]);
            console.log('new Note added:', json);
            dispatch({ type: 'CREATE_NOTE', payload: json });
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
                className={emptyfield.includes('title') ? 'error' : ''}
            />

            <label>Note Body:</label>
            <input
                type="text"
                onChange={(e) => setMsgBody(e.target.value)}
                value={msgbody}
                className={emptyfield.includes('body') ? 'error' : ''}
            />

            <button>Add Note</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm