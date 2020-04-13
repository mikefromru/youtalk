from rest_framework import serializers
from . models import Level, Question, UserLevel

class LevelSerializer(serializers.ModelSerializer):
	
	class Meta:

		model = Level
		fields = ('id', 'name', 'slug')
		# fields = '__all__'

class QuestionSerializer(serializers.ModelSerializer):

	level = LevelSerializer()

	class Meta:

		model = Question
		fields = '__all__'


class UserLevelSerializer(serializers.ModelSerializer):

	class Meta:

		model = UserLevel
		fields = '__all__'