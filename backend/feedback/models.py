from django.db import models
from django.contrib.auth.models import User

class Feedback(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=120)
    text = models.TextField()
    viewed_message = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created']

    def __str__(self):
        return self.title

class Screenshot(models.Model):

    feedback = models.ForeignKey(Feedback, related_name='screenshots', on_delete=models.CASCADE)
    image = models.ImageField(upload_to="uploads/feedback/", verbose_name="Images", blank=True)

    def __str__(self):
        return '/media/' + str(self.image)