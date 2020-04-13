from django.conf import settings
from django.views.static import serve
from django.contrib import admin
from django.urls import path, include, re_path

from django.views.generic import TemplateView
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

urlpatterns = [
    path('admin/', admin.site.urls),
    path('app/', include('app.urls')),
    path('root/', include('root.urls')),
    path('feedback/', include('feedback.urls')),
    path('accounts/', include('accounts.urls')),
    path('accounts/', include('django.contrib.auth.urls')),
    path('feedback/', include('feedback.urls')),
    path('rest-auth/', include('rest_auth.urls')),

    re_path(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
    re_path(r'^static/(?P<path>.*)$', serve,{'document_root': settings.STATIC_ROOT}),

    re_path(r'', TemplateView.as_view(template_name='index.html')),

    re_path(r'^accounts/', include('allauth.urls')),
]
urlpatterns += staticfiles_urlpatterns()