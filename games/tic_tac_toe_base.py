from django.templatetags.static import static
import numpy as np
import pickle
import ast

class Agent:
    def __init__(self, name):
        self.symbol = name
        self.stateValueTable = {} #Serves as the policy after training
    
    def chooseBest(self, board):
        board = ast.literal_eval(board)
        possible = [idx for idx in range(len(board)) if board[idx] == 0]
        bestVal = -500000
        action = possible[0]
        for move in possible:
            possibleBoard = board.copy()
            possibleBoard[move] = self.symbol
            val = self.stateValueTable.get(str(possibleBoard))
            if val is None:
                val = 0
            if val > bestVal:
                bestVal = val
                action = move
        return action

    def loadPolicy(self, policy):
        with open(str(policy), 'rb') as f:
            self.stateValueTable = pickle.load(f) 


            