from django.shortcuts import render
from . models import Profile
from . serializers import ProfileSerializer

from rest_framework import viewsets
from rest_framework.response import Response

from django.shortcuts import get_object_or_404

from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from rest_auth.registration.views import SocialLoginView

class FacebookLogin(SocialLoginView):

    adapter_class = FacebookOAuth2Adapter

class GoogleLogin(SocialLoginView):
  adapter_class = GoogleOAuth2Adapter


class ProfileViewSet(viewsets.ViewSet):

	# def detail_profile(self, request, pk=None):
	def detail_profile(self, request):
		queryset = Profile.objects.all()
		user = Profile.objects.get(user_id=request.user.pk)
		profile = get_object_or_404(queryset, pk=user.pk)
		serializer = ProfileSerializer(profile)
		return Response(serializer.data)

	def change_profile(self, request):
		profile = Profile.objects.get(user_id=request.user.pk)
		serializer = ProfileSerializer(profile, data=request.data, partial=True)
		if serializer.is_valid():
			serializer.save()
		return Response(serializer.data)

