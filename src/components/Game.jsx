import React, { useEffect, useState } from "react";

export default function Game({
	puzzle,
	difficulty,
	userPuzzle,
	setUserPuzzle,
	timerMs,
	timerSec,
	timerMin,
	setTimerMs,
	setTimerSec,
	setTimerMin,
	solved,
	setSolved,
	gameover,
	solvedPuzzle,
	checkSolution,
	handleGameover,
	handleNewPuzzle,
}) {
	const [deviceType, setDeviceType] = useState("");

	useEffect(() => {
		let hasTouchScreen = false;
		if ("maxTouchPoints" in navigator) {
			hasTouchScreen = navigator.maxTouchPoints > 0;
		} else if ("msMaxTouchPoints" in navigator) {
			hasTouchScreen = navigator.msMaxTouchPoints > 0;
		} else {
			const mQ = window.matchMedia && matchMedia("(pointer:coarse)");
			if (mQ && mQ.media === "(pointer:coarse)") {
				hasTouchScreen = !!mQ.matches;
			} else if ("orientation" in window) {
				hasTouchScreen = true; // Depreciated Fallback
			} else {
				var UA = navigator.userAgent;
				hasTouchScreen =
					/\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
					/\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
			}
		}
		if (hasTouchScreen) {
			setDeviceType("Mobile");
		} else {
			setDeviceType("Desktop");
		}
	}, []);

	const handleNumberInput = (e, i) => {
		if (e.target.value) {
			let updatedUserPuzzle = [...userPuzzle];
			updatedUserPuzzle.splice(i, 1, e.target.value.toString());
			setUserPuzzle(updatedUserPuzzle);
		} else {
			let updatedUserPuzzle = [...userPuzzle];
			updatedUserPuzzle.splice(i, 1, ".");
			setUserPuzzle(updatedUserPuzzle);
		}
	};
	const handleRestartPuzzle = () => {
		setUserPuzzle(puzzle);
		let boxes = document.querySelectorAll("input");
		for (let i = 0; i < boxes.length; i++) {
			boxes[i].value = "";
		}
	};
	const checkNum = (e) => {
		// Check to use regex for checking validity
		// Current solution:
		let options = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
		if (!options.includes(e.target.value)) {
			e.target.value = "";
		}
	};
	const formatTimer = (value, title) => {
		let val = value.toString();
        if (title === "ms" && val.length < 3) {
            val = "0" + val;
        }
		if (val.length < 2) {
			val = "0" + val;
		}
		return val;
	};

	useEffect(() => {
        if (!gameover && !solved) {
            setTimeout(() => {
                setTimerSec(timerSec + 1);
                // if (timerMs >= 1000) {
                //     setTimerSec(timerSec + 1);
                //     setTimerMs(0);
                // }
                if (timerSec >= 60) {
                    setTimerMin(timerMin + 1);
                    setTimerSec(0);
                }
            }, 1000)
        }
    }, [gameover, solved, timerMs, timerSec, timerMin, setTimerMs, setTimerSec, setTimerMin]);

	return (
		<div className="Game">
			<h3>{difficulty}</h3>
			<div className="timer">
                <span>{formatTimer(timerMin)}</span>:
				<span>{formatTimer(timerSec)}</span>
			</div>
			<div className={solved ? "grid grid-solved" : "grid"}>
				{gameover
					? solvedPuzzle.map((s, i) => (
							<div key={i} className={"box-" + i}>
								<span>{s}</span>
							</div>
					  ))
                    :
                    // So user can have number keypad use Tel if the device is mobile aka no keyboard
					  puzzle.map((s, i) =>
							s === "." ? (
								<input
									key={i}
									type={deviceType === "desktop" ? "text" : "tel"}
									className={solved ? "solved box-" + i : "box-" + i}
									onInput={checkNum}
									maxLength="1"
									onChange={(e) => handleNumberInput(e, i)}
                                    readOnly={solved ? true : false}
								/>
							) : (
								<div key={i} className={solved ? "solved box-" + i : "box-" + i}>
									<span>{s}</span>
								</div>
							)
					  )}
			</div>
			{gameover || solved ? (
				<button className="new-pzl-btn" onClick={handleNewPuzzle}>New puzzle</button>
			) : (
				<div className="game-btns">
					<button onClick={checkSolution}>CHECK</button>
					<button onClick={handleRestartPuzzle}>CLEAR</button>
					<button onClick={handleGameover}>SOLVE</button>
				</div>
			)}
		</div>
	);
}
