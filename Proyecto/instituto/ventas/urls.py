# ventas/urls.py

from django.urls import path
from .views import form, index, galeria, nosotros, login

urlpatterns = [
    path('index/', index, name='index'),
    path('galeria/', galeria, name='galeria'),
    path('nosotros/', nosotros, name='nosotros'),
    path('form/', form, name='form'),  # Ruta para el formulario de registro
    path('login/', login, name='login'),
]
