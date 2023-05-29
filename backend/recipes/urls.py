from django.urls import path
from .views import RecipeCreateAPIView, RecipeListAPIView, CategoryAPIView, recipeDetailAPIView, getCategoryByName, getRecipeByName


urlpatterns = [
    path('recipes/',RecipeListAPIView.as_view(), name='list-recipes'),
    path('recipeByName/<str:name>/', getRecipeByName),
    path('categories/', CategoryAPIView.as_view()),
    path('categories/<int:id>/', getCategoryByName),
    path('recipes/create/',RecipeCreateAPIView.as_view(), name='create-recipe'),
    path('recipes/<int:id>/', recipeDetailAPIView.as_view(), name='recipe-detail'),
]
