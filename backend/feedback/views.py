from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.core.mail import BadHeaderError, send_mail
from django.http import HttpResponse, HttpResponseRedirect

from django.core.mail import EmailMessage
from email.mime.image import MIMEImage
from django.core.mail import EmailMultiAlternatives
import os

from .serializers import FeedbackSerializer, ScreenshotSerializer
from .models import Feedback, Screenshot

from django.core.files.base import ContentFile
from rest_framework import status

@api_view(['POST'])
def feedback(request):

    feedback = FeedbackSerializer(data=request.data)

    if feedback.is_valid():
        feedback_result = feedback.save()

        if len(request.FILES.getlist('files')) > 0 and len(request.FILES.getlist('files')) < 6:
            serializer = ScreenshotSerializer(request.FILES)
            for x in request.FILES.getlist('files'):
                data = x.read()
                photo = Screenshot(feedback=feedback_result)
                photo.image.save(x.name, ContentFile(data))
                photo.save()

        return Response(status=status.HTTP_201_CREATED)

    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)