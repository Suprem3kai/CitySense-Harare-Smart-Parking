from django.urls import path
from . import views

urlpatterns = [
    path('spots', views.get_parking_spots),
    path('spots/available', views.get_available_spots),
    path('spots/<int:pk>', views.get_parking_spot),
]
