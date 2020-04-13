from django.urls import path
from rest_framework import routers
from . views import (
	LevelsModel,
	LevelQuestionModel,
	QuestionsModel,
	ProfileModel,
	FeedbackModel,
)

router = routers.DefaultRouter()
router.register('levels', LevelsModel)
router.register('levels-questions', LevelQuestionModel, basename='levels-questions')
router.register('questions', QuestionsModel, basename='root_questions')
router.register('feedbacks', FeedbackModel, basename='root_feedbacks')
router.register('profile', ProfileModel, basename='root_profile')

urlpatterns = router.urls

