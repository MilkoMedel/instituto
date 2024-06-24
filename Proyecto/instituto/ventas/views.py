from django.shortcuts import render, redirect, get_object_or_404 
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login as auth_login
from django.contrib.auth.forms import AuthenticationForm
from .forms import UsuarioForm, ProductoForm
from .models import Producto, Carrito, DetalleCarrito
from django.contrib import messages
def index(request):
    return render(request, 'ventas/index.html')

@login_required
def galeria(request):
    productos = Producto.objects.all()
    return render(request, 'ventas/galeria.html', {'productos': productos})

@login_required
def nosotros(request):
    return render(request, 'ventas/nosotros.html')

def form(request):
    if request.method == 'POST':
        form = UsuarioForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')  # Redirigir a la página de inicio de sesión después del registro exitoso
    else:
        form = UsuarioForm()
    return render(request, 'ventas/form.html', {'form': form})

def login(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(request, username=username, password=password)
            if user is not None:
                auth_login(request, user)
                return redirect('galeria')  # Redirige a la página de galería después del inicio de sesión exitoso
    else:
        form = AuthenticationForm()
    return render(request, 'ventas/login.html', {'form': form})

@login_required
def producto_lista(request):
    productos = Producto.objects.all()
    return render(request, 'ventas/producto_lista.html', {'productos': productos})

@login_required
def producto_detalle(request, pk):
    producto = get_object_or_404(Producto, pk=pk)
    return render(request, 'ventas/producto_detalle.html', {'producto': producto})

@login_required
def producto_nuevo(request):
    if request.method == "POST":
        form = ProductoForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('producto_lista')
    else:
        form = ProductoForm()
    return render(request, 'ventas/producto_form.html', {'form': form})

@login_required
def producto_editar(request, pk):
    producto = get_object_or_404(Producto, pk=pk)
    if request.method == "POST":
        form = ProductoForm(request.POST, request.FILES, instance=producto)
        if form.is_valid():
            form.save()
            return redirect('producto_lista')
    else:
        form = ProductoForm(instance=producto)
    return render(request, 'ventas/producto_form.html', {'form': form})

@login_required
def producto_eliminar(request, pk):
    producto = get_object_or_404(Producto, pk=pk)
    if request.method == "POST":
        producto.delete()
        return redirect('producto_lista')
    return render(request, 'ventas/producto_confirm_delete.html', {'producto': producto})

@login_required
def agregar_al_carrito(request, pk):
    producto = get_object_or_404(Producto, pk=pk)
    carrito, created = Carrito.objects.get_or_create(usuario=request.user)
    detalle, created = DetalleCarrito.objects.get_or_create(carrito=carrito, producto=producto)
    if not created:
        detalle.cantidad += 1
    else:
        detalle.cantidad = 1
    detalle.save()
    return redirect('galeria')

@login_required
def ver_carrito(request):
    carrito = get_object_or_404(Carrito, usuario=request.user)
    detalles = DetalleCarrito.objects.filter(carrito=carrito)
    total = sum(detalle.producto.precio * detalle.cantidad for detalle in detalles)
    return render(request, 'ventas/carrito.html', {'carrito': carrito, 'detalles': detalles, 'total': total})

@login_required
def eliminar_del_carrito(request, pk):
    detalle = get_object_or_404(DetalleCarrito, pk=pk)
    detalle.delete()
    return redirect('ver_carrito')

def totalizar_pedido(request):
    carrito = Carrito.objects.get(usuario=request.user)
    detalles = DetalleCarrito.objects.filter(carrito=carrito)
    total = sum(detalle.producto.precio * detalle.cantidad for detalle in detalles)
    
    # Mostrar mensaje con los productos seleccionados
    mensaje = "Productos seleccionados:\n"
    for detalle in detalles:
        mensaje += f"{detalle.producto.nombre} - Cantidad: {detalle.cantidad}\n"
    
    # Actualizar el stock de los productos y guardar cambios
    for detalle in detalles:
        producto = detalle.producto
        producto.stock -= detalle.cantidad
        producto.save()
    
    # Limpiar el carrito de compras
    DetalleCarrito.objects.filter(carrito=carrito).delete()
    
    # Mostrar mensaje al usuario
    messages.success(request, f"Pedido totalizado. {mensaje} Total: ${total}")
    
    # Redirigir a la galería u otra vista según sea necesario
    return redirect('galeria')
