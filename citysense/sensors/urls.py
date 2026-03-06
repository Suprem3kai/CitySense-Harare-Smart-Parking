from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_sensors),
    path('update', views.update_sensor),
]
