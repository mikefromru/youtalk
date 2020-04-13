from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAdminUser

from app.models import (
	Level,
	Question
)

from accounts.models import Profile
from feedback.models import Feedback, Screenshot	

from accounts.serializers import ProfileSerializer

from feedback.serializers import (
	FeedbackSerializer,
	ScreenshotSerializer
)

from app.serializers import (
	LevelSerializer,
	QuestionSerializer
)

class ProfileModel(ModelViewSet):

	permission_classes = [IsAdminUser]
	queryset = Profile.objects.all()
	serializer_class = ProfileSerializer 


class FeedbackModel(ModelViewSet):

	permission_classes = [IsAdminUser]
	queryset = Feedback.objects.all()
	serializer_class = FeedbackSerializer


class LevelsModel(ModelViewSet):

	permission_classes = [IsAdminUser]
	queryset = Level.objects.all()
	serializer_class = LevelSerializer

class LevelQuestionModel(ModelViewSet):

	def retrieve(self, request, pk):
		questions = Question.objects.filter(level__pk=pk).all()
		serializer = QuestionSerializer(questions, many=True)
		return Response(serializer.data)


class QuestionsModel(ModelViewSet):

	permission_classes = [IsAdminUser]
	queryset = Question.objects.all()
	serializer_class = QuestionSerializer