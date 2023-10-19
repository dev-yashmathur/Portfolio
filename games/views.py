from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def index(request):
    return HttpResponse("Hello from games: index")

def tic_tac_toe(request):
    return render(request, "games/tic-tac-toe.html", {"Game_Name": "Tic-tac-toe"})