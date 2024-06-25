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

