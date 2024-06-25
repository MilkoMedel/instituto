from django import forms
from django.contrib.auth.hashers import make_password
from .models import Usuario

class UsuarioForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)

    class Meta:
        model = Usuario
        fields = ['username', 'rut', 'apellidos', 'nombres', 'fecha_nacimiento','edad', 'genero', 'email', 'celular', 'password']
        widgets = {
            'password': forms.PasswordInput(),
            'fecha_nacimiento': forms.DateInput(attrs={'type': 'date'}),
        }

    def save(self, commit=True):
        usuario = super(UsuarioForm, self).save(commit=False)
        usuario.password = make_password(self.cleaned_data['password'])
        if commit:
            usuario.save()
        return usuario
