import { useState } from "react";
import axios from "axios";
import "./App.css";
import Setup from "./components/Setup";
import Game from "./components/Game";
import Nav from "./components/Nav";

function App() {
	const [dark, setDark] = useState(
		window.matchMedia("(prefers-color-scheme: dark)").matches
	);

	// const [loading, setLoading] = useState(false);
	const [difficulty, setDifficulty] = useState();
	const [puzzle, setPuzzle] = useState([]);
	const [solvedPuzzle, setSolvedPuzzle] = useState();
	const [multiple, setMultiple] = useState(false);
	const [userPuzzle, setUserPuzzle] = useState();
	const [timerMs, setTimerMs] = useState(0);
  const [timerSec, setTimerSec] = useState(0)
  const [timerMin, setTimerMin] = useState(0)
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
		console.log(res.data["example-solution"]);
		if (res.data.result !== "unique solution") {
			setSolvedPuzzle(res.data["example-solution"].split(""));
			setMultiple(true);
		} else {
			setSolvedPuzzle(res.data.solution.split(""));
		}
	};
	const handleGameover = async () => {
		await fetchSolution();
		setGameover(true);
	};
	const checkSolution = async () => {
    const res = await axios.request(solveOptions);
		if (res.data.result !== "unique solution") {
			setSolvedPuzzle(res.data["example-solution"].split(""));
			setMultiple(true);
      let up = userPuzzle.join("");
			let sp = res.data['example-solution'].join("");
			if (up === sp) {
				setSolved(true);
			} else {
				alert("THE PUZZLE HAS MULTIPLE SOLUTIONS");
			}
		} else {
			setSolvedPuzzle(res.data.solution.split(""));
      let up = userPuzzle.join("");
			let sp = res.data.solution;
			if (up === sp) {
				setSolved(true);
				alert("DONE!");
			} else {
				alert("THE PUZZLE IS NOT CORRECT!");
        // Clear solved puzzle so people can't look into the state components
        setSolvedPuzzle(null)
			}
		}
	};
	const handleNewPuzzle = () => {
		setPuzzle([]);
		setUserPuzzle([]);
		setSolvedPuzzle([]);
		setDifficulty();
		setTimerMs(0);
    setTimerSec(0)
    setTimerMin(0)
		setGameover(false);
		setSolved(false);
	};

	return (
		<div className={dark ? "App darkmode" : "App"}>
			<Nav dark={dark} />
			{puzzle.length ? (
				<>
					<Game
						puzzle={puzzle}
						difficulty={difficulty}
						userPuzzle={userPuzzle}
						setUserPuzzle={setUserPuzzle}
						timerMs={timerMs}
            timerSec={timerSec}
            timerMin={timerMin}
						setTimerMs={setTimerMs}
            setTimerSec={setTimerSec}
            setTimerMin={setTimerMin}
						solved={solved}
						setSolved={setSolved}
						gameover={gameover}
						solvedPuzzle={solvedPuzzle}
						checkSolution={checkSolution}
						handleGameover={handleGameover}
						handleNewPuzzle={handleNewPuzzle}
					/>
				</>
			) : (
        <>
				<Setup
					difficulty={difficulty}
					setDifficulty={setDifficulty}
					fetchPuzzle={fetchPuzzle}
				/>
        </>
			)}
			{dark ? (
				<input
					type="checkbox"
					name="darkmode-toggle"
					id="darkmode-toggle"
					onChange={() => setDark(!dark)}
					checked
				/>
			) : (
				<input
					type="checkbox"
					name="darkmode-toggle"
					id="darkmode-toggle"
					onChange={() => setDark(!dark)}
				/>
			)}
			<label htmlFor="darkmode-toggle">
				{dark ? (
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="off">
            <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1z"/>
					</svg>
				) : (
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="on">
            <path id="bg" d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13h-5a.5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm3 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1-.5-.5z"/>
						<path id="fg" d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1z"/>
					</svg>
				)}
			</label>
		</div>
	);
}

export default App;
