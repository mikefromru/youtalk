from rest_framework import serializers
from . models import Profile
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):

	class Meta:

		model = User
		fields = '__all__'


class ProfileSerializer(serializers.ModelSerializer):

	user = UserSerializer()

	class Meta:

		model = Profile
		fields = '__all__'

class CustomTokenSerializer(serializers.Serializer):
    token = serializers.CharField()