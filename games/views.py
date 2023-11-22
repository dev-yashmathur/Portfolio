from django.shortcuts import render
from django.http import HttpResponse
from games.tic_tac_toe_base import Agent
# Create your views here.

def index(request):
    return HttpResponse("Hello from games: index")

def tic_tac_toe(request):
    return render(request, "games/tic-tac-toe.html", {"Game_Name": "Tic-Tac-Toe"})

def api_test(request):
    p1 = Agent("X")
    p1.loadPolicy("games/policies/Policy_player1")
    p2 = Agent("O")
    p2.loadPolicy("games/policies/Policy_player2")
    turn = request.POST['turn']
    board = request.POST['board']
    if(turn == "X"):
        return HttpResponse(p1.chooseBest(str(board)) + 1)
    else:
        return HttpResponse(p2.chooseBest(str(board)) + 1)

def tic_tac_toe_api(request): #Accept request method POST
    p1 = Agent("X")
    p1.loadPolicy("policies/tic_tac_toe_player_1")
    p2 = Agent("O")
    p2.loadPolicy("policies/tic_tac_toe_player_2")
    
    turn = request.POST['turn']
    board = request.POST['board']
    if(turn == "X"):
        return HttpResponse(p1.chooseBest(str(board)) + 1)
    else:
        return HttpResponse(p2.chooseBest(str(board)) + 1)