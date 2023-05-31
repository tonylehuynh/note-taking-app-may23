import { Routes, Route } from "react-router-dom";
import Homepage from "./contexts/pages/Homepage";

function App() {
  return (
    <div className="App">
		<Routes>
			<Route path="/" element={<Homepage />} />
			
			<Route path="/notes" element={<h1>ODO</h1>} />
			<Route path="/notes/:noteID" element={<h1>ODO</h1>} />
			<Route path="/notes/:noteID/edit" element={<h1>ODO</h1>} />
			<Route path="/notes/searchByWord/:word" element={<h1>ODO</h1>} />
			<Route path="/notes/sort/duedate" element={<h1>ODO</h1>} />
			<Route path="/notes/sort/createddate" element={<h1>ODO</h1>} />
			<Route path="/notes/filter/overdue" element={<h1>ODO</h1>} />
			<Route path="/notes/filter/done" element={<h1>ODO</h1>} />

		</Routes>
    </div>
  );
}

export default App;
