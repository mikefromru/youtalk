from django.contrib import admin
from . models import Feedback, Screenshot

@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
		
	pass	
		
@admin.register(Screenshot)
class FeedbackAdmin(admin.ModelAdmin):
		
	pass	
		