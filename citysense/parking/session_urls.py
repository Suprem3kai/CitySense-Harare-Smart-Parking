from django.urls import path
from . import session_views

urlpatterns = [
    path('start', session_views.start_session),
    path('end', session_views.end_session),
    path('user', session_views.get_user_sessions),
]
