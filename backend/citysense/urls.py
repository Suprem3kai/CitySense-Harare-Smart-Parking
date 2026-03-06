from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('users.urls')),
    path('api/parking/', include('parking.urls')),
    path('api/sessions/', include('parking.session_urls')),
    path('api/sensors/', include('sensors.urls')),
    path('api/analytics/', include('analytics.urls')),
]
