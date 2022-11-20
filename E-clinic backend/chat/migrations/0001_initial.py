# Generated by Django 3.2.2 on 2022-04-26 09:47

import chat.models
from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Messages',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('body', models.TextField(blank=True, null=True)),
                ('send_time', models.CharField(blank=True, max_length=100, null=True)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date created')),
            ],
        ),
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=255, null=True)),
                ('type', models.CharField(choices=[('p2p', 'p2p'), ('group', 'group')], default='p2p', max_length=10)),
                ('photo', models.FileField(default='/default_images/default_image_for_all_models.jpeg', upload_to=chat.models.Room.upload_room_photo)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date created')),
            ],
        ),
    ]