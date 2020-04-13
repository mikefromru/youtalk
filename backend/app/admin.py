from django.contrib import admin
from . models import Level, Question, UserLevel

@admin.register(Level)
class QuestionAdmin(admin.ModelAdmin):

    pass

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):

    pass


@admin.register(UserLevel)
class UserLevelAdmin(admin.ModelAdmin):

    pass

