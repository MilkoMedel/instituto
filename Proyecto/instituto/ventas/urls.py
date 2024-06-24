from django.urls import path
from .views import index, galeria, nosotros, form, login, totalizar_pedido

urlpatterns = [
    path('index/', index, name='index'),
    path('galeria/', galeria, name='galeria'),
    path('nosotros/', nosotros, name='nosotros'),
    path('form/', form, name='form'),
    path('login/', login, name='login'),
    path('ventas/totalizar/', totalizar_pedido, name='totalizar_pedido'),  # Asegúrate de definir correctamente la URL y el nombre de la vista
]
