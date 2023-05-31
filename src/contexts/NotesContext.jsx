import { createContext, useContext, useEffect, useReducer } from "react";
import { useLocalStorage } from "react-use";


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

/**
 * Reducer runs automatically when a dispatch function is called.
 * instructions.type determines _how_ we edit the state
 * The reducer must return someting, otherwise state is set to null. 
 * Whatever is returned, is the new state. 
 * 
 * @param instructions Object containing a "type" to be used by the switch, and whatever other property
 * is expected as per the switch statement that matches the type. 
 * @returns New state, edited based on instructions provided.
 */

const notesReducer = (previousState, instructions) => {
	let stateEditable = [...previousState];

	switch (instructions.type){
		case "setup":
			console.log("Apply persistent data to state now");

			// instructions.data is provided when the dispatch function is called
			stateEditable = instructions.data;

			// Whatever is returned is now the newest version of state
			return stateEditable;

		case "create":
			console.log("TODO: Create note and add to state");

			let newNote = instructions.newNote;
			stateEditable.push(newNote);
			
			return stateEditable;

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


// Basically how we make our data globally available
// This is how we make our reducer state and reducer dispatch global
export const NoteDataContext = createContext(null);
export const NoteDispatchContext = createContext(null);


// Custom hooks need the word 'use' at the front
// Custom hooks that just provide direct access to one part of the reducer 
// We can use these in our other components depending on what we want to do to it
// - If we want to list all the notes, we use the useNoteData() hook
// - If we want to change some of the notes, we use the useNoteDispatch() hook

// e.g. read-only data:
export function useNoteData(){
	return useContext(NoteDataContext);
}
// function to modify the data:
export function useNoteDispatch(){
	return useContext(NoteDispatchContext);
}


// Provider
// This component here wraps around the component tree

/**
 * NotesProvider wraps around the component tree. 
 * Any child component has access to this note data via useNoteData and useNoteDispatch.
 * @param {*} props props.children should be a JSX element. This NotesProvider wraps around that element. 
 */
export default function NotesProvider(props){

	//    [readOnlyData, functionToModifyData] = useReducer(functionToModifyData (this is the reducer function), initialDefaultData)
	const [notesData, notesDispatch] = useReducer(notesReducer, initialNotesData)

	//   [readOnlyLocalStorageData. functionToUpdateLocalStorage] = useLocalStorage(keyInLocalStorage, defaultDataIfKeyIsNotFound)
	const [persistentData, setPersistentData] = useLocalStorage('notes', initialNotesData);


	useEffect(() => {
		// On app start, overwrite notesData with persistentData
		notesDispatch({type:"setup", data: persistentData});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Dev: confirm that our local storage is updating 
	useEffect(() => {
		console.log("Local Storage: " + persistentData)
	}, [persistentData]);

	// If something changes our notesData, e.g. if the dispatch function runs
	// then update the copy of data saved in the local storage
	// ** Autosave any changes to notes from reducer state into local storage. 
	// It's pretty much an autosave as opposed to a hardcoded specific save.
	useEffect(() => {
		setPersistentData(notesData);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [notesData]);

	return (
		<NoteDataContext.Provider value={notesData}>
			<NoteDispatchContext.Provider value={notesDispatch}>
				{props.children}
			</NoteDispatchContext.Provider>
		</NoteDataContext.Provider>
	)
}

