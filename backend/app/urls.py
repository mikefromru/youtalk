from django.urls import path
from . import views

urlpatterns = [
    path('', views.LevelView.as_view(), name='levels'),
    path('questions/<slug:slug>/', views.LevelQuestions.as_view(), name='level_questions'),
    path('userlevels/', views.UserLevelViewSet.as_view({'get': 'get_userlevels'})),
    path('userlevels/<int:id>/', views.UserLevelViewSet.as_view({'patch': 'patch_userlevels'})),
]
