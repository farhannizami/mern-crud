import { createContext, useReducer } from "react";

export const NoteContext = createContext();

export const noteReducer = (state, action) => {
    switch (action.type) {
        case 'SET_NOTES':
            return {
                notes: action.payload
            }
        case 'CREATE_NOTE':
            return {
                notes: [action.payload, ...state.notes]
            }
        default:
            return state;
    }
};

export const NoteContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(noteReducer, {
        notes: null
    });

    return (
        <NoteContext.Provider value={{ ...state, dispatch }}>
            {children}
        </NoteContext.Provider>
    )
}