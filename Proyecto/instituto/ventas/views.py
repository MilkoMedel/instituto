from django.shortcuts import render

def index(request):
    return render(request, 'ventas/index.html')

def login(request):
    return render(request, 'ventas/login.html')

def galeria(request):
    return render(request, 'ventas/galeria.html')

def nosotros(request):
    return render(request, 'ventas/nosotros.html')

def form(request):
    return render(request, 'ventas/form.html')
