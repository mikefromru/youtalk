from django.shortcuts import render
from . models import Profile
from . serializers import ProfileSerializer

from rest_framework import viewsets
from rest_framework.response import Response

from django.shortcuts import get_object_or_404

from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from rest_auth.registration.views import SocialLoginView

from django.contrib.sites.models import Site
from django.dispatch import receiver
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import EmailMultiAlternatives, EmailMessage
from django.template.loader import render_to_string

from rest_framework.views import APIView
from rest_framework import parsers, renderers, status
from .serializers import CustomTokenSerializer
from django_rest_passwordreset.models import ResetPasswordToken
from django_rest_passwordreset.views import get_password_reset_token_expiry_time
from django.utils import timezone
from datetime import timedelta
from django.urls import reverse

from django.template import loader
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.decorators import api_view

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

class CustomPasswordResetView:
    @receiver(reset_password_token_created)
    def password_reset_token_created(sender, reset_password_token, *args, **kwargs):
        """
          Handles password reset tokens
          When a token is created, an e-mail needs to be sent to the user
        """
        # send an e-mail to the user
        domain_site = Site.objects.get_current().domain

        context = {
            'domain': domain_site,
            'current_user': reset_password_token.user,
            'username': reset_password_token.user.username,
            'email': reset_password_token.user.email,
            'reset_password_url': "{}/reset-password-confirm/?token={}".format(domain_site, reset_password_token.key)
        }

        # render email text
        email_html_message = render_to_string('templates/account/email/user_reset_password.html', context)
        email_plaintext_message = render_to_string('templates/account/email/user_reset_password.txt', context)

        msg = EmailMultiAlternatives(
            # title:
            "Password recovery",
            # message:
            email_plaintext_message,
            # from:
            "noreply@myhost.local",
            # to:
            [reset_password_token.user.email]
        )

        # mail_subject = 'Password reset for this app (New)'
        # msg = EmailMessage(
        #     mail_subject, email_html_message, to=[reset_password_token.user.email]
        # )

        # msg.content_subtype =  "html"
        msg.attach_alternative(email_html_message, "text/html")
        msg.send()

class CustomPasswordTokenVerificationView(APIView):
    """
      An Api View which provides a method to verifiy that a given pw-reset token is valid before actually confirming the
      reset.
    """
    throttle_classes = ()
    permission_classes = ()
    parser_classes = (parsers.FormParser, parsers.MultiPartParser, parsers.JSONParser,)
    renderer_classes = (renderers.JSONRenderer,)
    serializer_class = CustomTokenSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        token = serializer.validated_data['token']

        # get token validation time
        password_reset_token_validation_time = get_password_reset_token_expiry_time()

        # find token
        reset_password_token = ResetPasswordToken.objects.filter(key=token).first()

        if reset_password_token is None:
            return Response({'status': 'invalid'}, status=status.HTTP_404_NOT_FOUND)

        # check expiry date
        expiry_date = reset_password_token.created_at + timedelta(hours=password_reset_token_validation_time)

        if timezone.now() > expiry_date:
            # delete expired token
            reset_password_token.delete()
            return Response({'status': 'expired'}, status=status.HTTP_404_NOT_FOUND)

        # check if user has password to change
        if not reset_password_token.user.has_usable_password():
            return Response({'status': 'irrelevant'})

        return Response({'status': 'OK'})
