from django.urls import path
from . import views

#the starting / is already considered
urlpatterns = [
    path("", views.index, name="index"),
    path("tic-tac-toe", views.tic_tac_toe, name="tic-tac-toe"),
    path("api-test", views.api_test, name="api-test")
]
