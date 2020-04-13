from django.http import Http404
from django.core.exceptions import ObjectDoesNotExist

from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework.viewsets import ViewSet

from . models import (
	Level,
	Question,
	UserLevel
)

from . serializers import ( 
	LevelSerializer,
	QuestionSerializer,
	UserLevelSerializer
)

class UserLevelViewSet(ViewSet):

	def get_userlevels(self, request):
		queryset = UserLevel.objects.filter(user=request.user)
		serializer = UserLevelSerializer(queryset, many=True)
		return Response(serializer.data)

	def patch_userlevels(self, request, id):
		ul, created = UserLevel.objects.get_or_create(
			level_id=id,
			user_id=request.user.pk,
			defaults={'favorite': True}
		)
		serializer = UserLevelSerializer(ul, data=request.data, partial=True)
		if serializer.is_valid():
			serializer.save()
		return Response(serializer.data)


class LevelView(APIView):

	def get(self, request, format=None):
		levels = Level.objects.all().order_by('created')
		serializer = LevelSerializer(levels, many=True)
		return Response(serializer.data)

class LevelQuestions(APIView):

	def get_object(self, slug):
		try:
			return Question.objects.filter(level__slug=slug).all()
		except Question.ObjectDoesNotExist:
			raise Http404

	def get(self, request, slug):
		questions = self.get_object(slug) 
		serializer = QuestionSerializer(questions, many=True)
		return Response(serializer.data)
