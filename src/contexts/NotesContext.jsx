import { createContext, useContext, useReducer } from "react";


const initialNotesData = [
	{
		id: 1,
		title: "Welcome to the Note Taker!",
		description: "Make your notes here!",
		isCompleted: false,
		duedate: new Date().setDate(new Date().getDate() + 1), // Current date but one day in the future
		createdAtDate: Date.now()
	}
]

// Anything complex you want to do to state (act upon or change the state data)
// should be done through a reducer

// Goal of a reducer is to have all of state management happen in a single place

const notesReducer = (previousState, instructions) => {
	let stateEditable = [...previousState];

	switch (instructions.type){
		case "create":
			console.log("TODO: Create note and add to state");
			break;
		case "update":
			console.log("TODO: Update specific note and overwrite it in state");
			break;
		case "delete":
			console.log("TODO: Delete note from state");
			break;
		case "sortByDueDate":
			console.log("Sorted state data by due date");
			break;
		case "sortByCreatedAtDate":
			console.log("Sorted by created at date");
			break;
		case "sortById":
			console.log("Sort by ID, this is the default order");
			break;
		default:
			console.log("Invalid instruction type provided, it was: " + instructions.type);
			return previousState;
			// If nothing happens or if we provided invalid instructions
			// then return the original/previous state that we had so that we
			// still have some data to work with
	}
}



export const NoteDataContext = createContext(null);
export const NoteDispatchContext = createContext(null);


// Custom hooks need the word use at the front
export function useNoteData(){
	return useContext(NoteDataContext);
}

export function useNoteDispatch(){
	return useContext(NoteDispatchContext);
}

// Provider
export default function NotesProvider(props){
	const [notesData, notesDispatch] = useReducer(notesReducer, initialNotesData)

	return (
		<NoteDataContext.Provider value={notesData}>
			<NoteDispatchContext.Provider value={notesDispatch}>
				{props.children}
			</NoteDispatchContext.Provider>
		</NoteDataContext.Provider>
	)
}

