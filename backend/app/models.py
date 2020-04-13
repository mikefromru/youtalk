from django.db import models
from django.template.defaultfilters import slugify
from django.contrib.auth.models import User

class Level(models.Model):

    name = models.CharField(max_length=100, unique=True)
    created = models.DateTimeField(auto_now_add=True)
    slug = models.SlugField(max_length=250, unique=True, null=True, blank=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(Level, self).save(*args, **kwargs)

class UserLevel(models.Model):

    level = models.ForeignKey(Level, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    favorite = models.BooleanField(default=False)

    def __str__(self):
        return str(self.level)

class Question(models.Model):
    level = models.ForeignKey(Level, related_name='question', on_delete=models.CASCADE)
    name = models.CharField(max_length=650)
    forbidden = models.BooleanField(default=True)


    def __st__(self):
        return self.name
        # return '{} {}'.format(self.id, self.name)

