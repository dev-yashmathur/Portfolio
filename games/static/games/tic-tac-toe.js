var nextTurn = 'X'
var started = 'X'
var board = [-1, -1, -1, -1, -1, -1, -1, -1, -1]

function played(el) {
    var id = el.id
    board[id - 1] = nextTurn
    el.innerText = nextTurn
    nextTurn = nextTurn == 'X' ? 'O' : 'X'
    el.style.fontSize = '8vw'
    el.onclick = null
    res = checkWin()
    if (res["win"] != -1) {
        for (let i = 0; i < res["highlight"].length; i++) {
            let id = res["highlight"][i]
            console.log("ID from highlight: ", id)
            const sq = document.getElementById(id + 1);
            sq.classList.add("won")
            // sq.style.backgroundColor = 'green';
        }
        for (let i = 1; i <= 9; i++) {
            const el = document.getElementById(i)
            el.classList.add("disabled")
            el.onclick = null
        }
        console.log(res["win"] + "WINS")
    }
}
function checkWin() {
    // Check for straight lines
    for (let i = 0; i < 3; i++) {
        if (board[i] != -1) {
            if (board[i] == board[i + 3] && board[i] == board[i + 6])
                return {
                    "win": board[i],
                    "highlight": [i, i + 3, i + 6]
                }
        }
    }
    // Check for Horizontal lines
    for (let i = 0; i < 7; i += 3) {
        if (board[i] != -1) {
            if (board[i] == board[i + 1] && board[i] == board[i + 2])
                return {
                    "win": board[i],
                    "highlight": [i, i + 1, i + 2]
                }
        }
    }

    //Check first diagonal
    if (board[0] != -1 && (board[0] == board[4] && board[0] == board[8])) {
        return {
            "win": board[0],
            "highlight": [0, 4, 8]
        }
    }
    if (board[2] != -1 && (board[2] == board[4] && board[2] == board[6])) {
        return {
            "win": board[2],
            "highlight": [2, 4, 6]
        }
    }
    return {
        "win": -1,
        "highlight": []
    }
}
function reset() {
    for (let i = 1; i <= 9; i++) {
        const el = document.getElementById(i)
        el.innerText = ""
        board = [-1, -1, -1, -1, -1, -1, -1, -1, -1]
        if (started == 'X') {
            nextTurn = 'O'
            started = 'O'
        } else {
            nextTurn = 'X'
            started = 'X'
        }
        // el.style.backgroundColor = 'lightblue';
        el.classList.remove("won")
        el.classList.remove("disabled")
        el.onclick = () => played(el)
    }
}