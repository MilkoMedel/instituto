from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login as auth_login
from django.contrib.auth.forms import AuthenticationForm

def index(request):
    return render(request, 'ventas/index.html')

@login_required
def galeria(request):
    return render(request, 'ventas/galeria.html')
@login_required
def nosotros(request):
    return render(request, 'ventas/nosotros.html')

def form(request):
    return render(request, 'ventas/form.html')

def login(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                auth_login(request, user)
                return redirect('index')  # Redirige a la página principal después del inicio de sesión
    else:
        form = AuthenticationForm()
    return render(request, 'ventas/login.html', {'form': form})