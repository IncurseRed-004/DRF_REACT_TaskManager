from django.urls import include, path
from rest_framework.routers import DefaultRouter
from todo.views import TodoView

router =DefaultRouter()
router.register('todos',TodoView,basename='todos')

urlpatterns=[
    path(r'',include(router.urls)),
]