from django.contrib import admin
from .models import Usuario,Categoria, Producto, Carrito, DetalleCarrito, Boleta, DetalleBoleta

# Register your models here.
admin.site.register(Usuario)
admin.site.register(Categoria)
admin.site.register(Producto)
admin.site.register(Carrito)
admin.site.register(DetalleCarrito)
admin.site.register(Boleta)
admin.site.register(DetalleBoleta)