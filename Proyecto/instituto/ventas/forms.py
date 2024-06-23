# ventas/forms.py

from django import forms
from .models import Usuario
from django.contrib.auth.hashers import make_password

class UsuarioForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)

    class Meta:
        model = Usuario
        fields = ['rut', 'apellidos', 'nombres', 'fecha_nacimiento', 'genero', 'email', 'celular', 'password']
        widgets = {
            'password': forms.PasswordInput(),
            'fecha_nacimiento': forms.DateInput(attrs={'type': 'date'}),
        }

    def save(self, commit=True):
        usuario = super(UsuarioForm, self).save(commit=False)
        usuario.password = make_password(self.cleaned_data['password'])  # Hash de la contraseña antes de guardar
        if commit:
            usuario.save()
        return usuario
