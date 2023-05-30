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


const notesReducer = (previousState, instructions) => {
	
}