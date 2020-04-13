from rest_framework import serializers
from . models import Feedback, Screenshot

class FeedbackSerializer(serializers.ModelSerializer):

	screenshots = serializers.StringRelatedField(many=True)

	class Meta:

		model = Feedback
		fields = ['id', 'user', 'title', 'text', 'viewed_message', 'created', 'screenshots']

class ScreenshotSerializer(serializers.ModelSerializer):

  class Meta:
      model = Screenshot
      fields = '__all__'