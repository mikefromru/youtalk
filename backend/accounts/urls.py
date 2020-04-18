from django.urls import path, include
from . import views

urlpatterns = [
	path('detail/', views.ProfileViewSet.as_view({'get': 'detail_profile'})),
	path('change/', views.ProfileViewSet.as_view({'patch': 'change_profile'})),
	path('google/', views.GoogleLogin.as_view(), name='google_login'),
	path('facebook/', views.FacebookLogin.as_view(), name='facebook_login'),
  path('reset-password/', include('django_rest_passwordreset.urls', namespace='password_reset')),
  path('reset-password/verify-token/', views.CustomPasswordTokenVerificationView.as_view(), name='password_reset_verify_token'),
]