//Global Vars
let opponent = "Player 2"
let score = {
    "X": 0,
    "O": 0
}
let playerName = {
    "X": "Player 1",
    "O": opponent
}
let board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
let turn = "X"

let player1_token = 'X'
let player2_token = 'O'

//Initializing the Turn Text
function updateScoreText(id) {
    document.getElementById(id).innerHTML = `
    <div class="X-turn">
    ${playerName["X"]}
    </br>
    ${score["X"]}
    </div>
    &emsp;-&emsp;
    <div class="O-turn">
    ${playerName["O"]}
    </br>
    ${score["O"]}
    </div>
    `
}
updateScoreText("turn")

function listToString(arr) {
    return " [" + arr.map(item => {
        if (typeof item === 'string') {
            return "'" + item + "'";
        } else {
            return item.toString();
        }
    }).join(', ') + "]";
}


function getAiMove() {
    console.log("Board: ", board)
    data = new FormData()
    data.append("turn", turn)
    data.append("board", listToString(board))
    data.append('csrfmiddlewaretoken', csrf);
    return fetch(api_url, {
        method: 'POST',
        body: data
    }).then(
        response => response.text()
    )
}

function played(el) {
    const sqare = parseInt(el.id)
    movePlayed(sqare)
    if (opponent != "Player 2") {
        const resPromise = getAiMove()
        resPromise.then(
            data => {
                movePlayed(data)
            }
        ).catch(
            error => console.log(error)
        )
    }
    // console.log("Result: ")
    // movePlayed(res.toString())
}

function movePlayed(square) {
    //Registering the move
    const token = turn === "X" ? player1_token : player2_token;
    const grid_square = document.getElementById(square)
    grid_square.innerHTML = token
    grid_square.classList.add("disabled")
    board[square - 1] = token
    //Registering Done

    // Checking status of game
    const currResult = getResults()
    if (currResult["result"] != "incomplete") {
        //Updating the scores
        if (currResult["result"] == "draw") {
            score["X"] += 0.5
            score["O"] += 0.5
        } else {
            score[currResult["result"]]++
        }
        // =====

        for (let i = 0; i < currResult["highlight"].length; i++) {
            let id = currResult["highlight"][i]
            const sq = document.getElementById(id + 1);
            sq.classList.add("won")
        }

        document.getElementById("overlay").classList.remove("hidden")
        document.getElementById("result-modal").classList.remove("hidden")
        document.getElementById("modal-title").textContent = currResult["result"] === "draw" ?
            `It's a Draw!` :
            `${playerName[currResult["result"]]} Wins!`
        updateScoreText("modal-body")
        updateScoreText("turn")
    }
    //Status check done

    //Changing the highlight of previous turn
    document.getElementsByClassName(turn + "-turn")[0].classList.remove("active")
    turn = turn === "X" ? "O" : "X"
    document.getElementsByClassName(turn + "-turn")[0].classList.add("active")
    //Updating the turn display

}

function getResults() {
    // Check for draws
    var blanks = 0
    for (let i = 0; i < board.length; i++) {
        if (board[i] == 0)
            blanks++
    }
    if (!blanks) {
        return {
            "result": "draw",
            "highlight": []
        }
    }

    // Check for straight lines
    for (let i = 0; i < 3; i++) {
        if (board[i] != 0) {
            if (board[i] == board[i + 3] && board[i] == board[i + 6])
                return {
                    "result": board[i],
                    "highlight": [i, i + 3, i + 6]
                }
        }
    }
    // Check for Horizontal lines
    for (let i = 0; i < 7; i += 3) {
        if (board[i] != 0) {
            if (board[i] == board[i + 1] && board[i] == board[i + 2])
                return {
                    "result": board[i],
                    "highlight": [i, i + 1, i + 2]
                }
        }
    }

    //Check first diagonal
    if (board[0] != 0 && (board[0] == board[4] && board[0] == board[8])) {
        return {
            "result": board[0],
            "highlight": [0, 4, 8]
        }
    }
    if (board[2] != 0 && (board[2] == board[4] && board[2] == board[6])) {
        return {
            "result": board[2],
            "highlight": [2, 4, 6]
        }
    }
    return {
        "result": "incomplete",
        "highlight": []
    }
}

function reset() {
    for (let i = 1; i <= 9; i++) {
        const el = document.getElementById(i)
        el.innerHTML = ""
        board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
        el.classList.remove("won")
        el.classList.remove("disabled")
    }
    // turn = "X"
    // document.getElementsByClassName('X' + "-turn")[0].classList.add("active")
    // document.getElementsByClassName('O' + "-turn")[0].classList.remove("active")
    document.getElementById("overlay").classList.add("hidden")
    document.getElementById("result-modal").classList.add("hidden")
}

function getOpponent(el) {
    opponent = el.value
    playerName["O"] = opponent
    score = {
        "X": 0,
        "O": 0
    }
    reset()
    updateScoreText("turn")
}