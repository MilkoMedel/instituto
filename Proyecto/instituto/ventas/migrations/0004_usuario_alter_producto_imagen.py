# Generated by Django 5.0.6 on 2024-06-23 07:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ventas', '0003_delete_usuario'),
    ]

    operations = [
        migrations.CreateModel(
            name='Usuario',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rut', models.CharField(max_length=12, unique=True)),
                ('apellidos', models.CharField(max_length=255)),
                ('nombres', models.CharField(max_length=255)),
                ('fecha_nacimiento', models.DateField()),
                ('genero', models.CharField(choices=[('Hombre', 'Hombre'), ('Mujer', 'Mujer'), ('Otro', 'Otro')], max_length=10)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('celular', models.CharField(max_length=11)),
                ('password', models.CharField(max_length=128)),
                ('date_joined', models.DateTimeField(auto_now_add=True)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
            ],
        ),
        migrations.AlterField(
            model_name='producto',
            name='imagen',
            field=models.ImageField(upload_to='img/'),
        ),
    ]
