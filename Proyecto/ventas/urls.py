from django.urls import path
from .views import index, galeria, nosotros, form, login

urlpatterns = [
    path('index/', index, name='index'),
    path('galeria/', galeria, name='galeria'),
    path('nosotros/', nosotros, name='nosotros'),
    path('form/', form, name='form'),
    path('login/', login, name='login'),
]
