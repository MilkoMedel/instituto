from django.urls import path
from .views import index,galeria,nosotros,login,form

urlpatterns = [
    path('index/', index, name='index'),
    path('galeria/', galeria, name='galeria'),
    path('nosotros/', nosotros, name='nosotros'),
    path('login/', login, name='login'),
    path('form/', form, name='form'),
]
