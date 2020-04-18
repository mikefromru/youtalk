from django.db import models
from django.contrib.auth.models import User

from django.db.models.signals import post_save
from django.dispatch import receiver
from allauth.account.signals import user_signed_up, user_logged_in
from allauth.socialaccount.models import SocialAccount

class Profile(models.Model):

	user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="userprofile")
	questions = models.IntegerField(default=5)
	seconds = models.IntegerField(default=120)
	time_speak = models.IntegerField(default=0)
	theme = models.BooleanField(default=False)
	startbtn = models.BooleanField(default=False)
	short_sound = models.BooleanField(default=True)
	voice = models.BooleanField(default=True)

	def __str__(self):
		return str(self.user)

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
  if created:
    Profile.objects.create(user=instance)
    
    # ids = Level.objects.values_list('id', flat=True)
    # for x in ids:
      # UserLevel.objects.create(user_id=instance.id, level_id=x)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.userprofile.save()
