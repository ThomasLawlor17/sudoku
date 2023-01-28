import { useState } from "react";
import axios from "axios";
import "./App.css";
import Setup from "./components/Setup";
import Game from "./components/Game";

function App() {
	const [loading, setLoading] = useState(false);
	const [difficulty, setDifficulty] = useState();
	const [puzzle, setPuzzle] = useState([]);
	const [solvedPuzzle, setSolvedPuzzle] = useState();
	const [userPuzzle, setUserPuzzle] = useState();
	const [timer, setTimer] = useState(0);
	const [solved, setSolved] = useState(false);
	const [gameover, setGameover] = useState(false);

	const apiKey = process.env.REACT_APP_API_KEY;
	const apiUrl = process.env.REACT_APP_API_URL;
	const solutionApiUrl = process.env.REACT_APP_API_URL_SOLUTION;

	const options = {
		method: "GET",
		url: apiUrl,
		params: { seed: "1337", difficulty: difficulty },
		headers: {
			"X-RapidAPI-Key": apiKey,
			"X-RapidAPI-Host": "sudoku-generator1.p.rapidapi.com",
		},
	};

	const solveOptions = {
		method: "GET",
		url: solutionApiUrl,
		params: {
			puzzle: puzzle.join(""),
		},
		headers: {
			"X-RapidAPI-Key": apiKey,
			"X-RapidAPI-Host": "sudoku-generator1.p.rapidapi.com",
		},
	};

	const fetchPuzzle = async () => {
		const res = await axios.request(options);
		setPuzzle(res.data.puzzle.split(""));
		setUserPuzzle(res.data.puzzle.split(""));
	};
	const fetchSolution = async () => {
		const res = await axios.request(solveOptions);
		setSolvedPuzzle(res.data.solution.split(''));
		setGameover(true);
	};

	return (
		<div className="App">
			{puzzle.length ? (
				<>
					<Game
						puzzle={puzzle}
						difficulty={difficulty}
						userPuzzle={userPuzzle}
						setUserPuzzle={setUserPuzzle}
						timer={timer}
						setTimer={setTimer}
						solved={solved}
						setSolved={setSolved}
						gameover={gameover}
            solvedPuzzle={solvedPuzzle}
					/>
					<button onClick={fetchSolution}>Solve</button>
				</>
			) : (
				<Setup
					difficulty={difficulty}
					setDifficulty={setDifficulty}
					fetchPuzzle={fetchPuzzle}
				/>
			)}
		</div>
	);
}

export default App;
