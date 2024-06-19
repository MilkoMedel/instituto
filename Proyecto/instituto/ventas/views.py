from django.shortcuts import render
from django.contrib.auth.decorators import login_required

def index(request):
    return render(request, 'ventas/index.html')

def login(request):
    return render(request, 'ventas/login.html')
@login_required
def galeria(request):
    return render(request, 'ventas/galeria.html')
@login_required
def nosotros(request):
    return render(request, 'ventas/nosotros.html')

def form(request):
    return render(request, 'ventas/form.html')
