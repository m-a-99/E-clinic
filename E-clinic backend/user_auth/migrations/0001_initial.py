# Generated by Django 3.2.2 on 2022-04-26 09:47

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import user_auth.models.DoctorModels
import user_auth.models.UserModels


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('email', models.EmailField(error_messages={'unique': 'البريد الالكتروني المدخل مستخدم من قبل شخص أخر ، يرجى إدخال بريد إخر.'}, help_text='Ex: example@example.com', max_length=255, unique=True, verbose_name='Email Address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(auto_now_add=True, verbose_name='date joined')),
                ('last_updated', models.DateTimeField(auto_now=True, verbose_name='Last Updated')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('gender', models.CharField(choices=[('unknown', 'unknown'), ('Male', 'Male'), ('Female', 'Female')], default='unknown', max_length=10)),
                ('image', models.FileField(default='/default_images/default_image_for_all_models.jpeg', upload_to=user_auth.models.UserModels.User.upload_user_image)),
                ('personal_phone_number', models.CharField(error_messages={'unique': 'رقم الهاتف الشخصي المدخل مستخدم من قبل شخص أخر ، يرجى إدخال رقم آخر.'}, max_length=255, null=True, unique=True)),
                ('birthday', models.DateField(blank=True, null=True)),
                ('location', models.CharField(blank=True, max_length=255, null=True)),
                ('about_me', models.TextField(blank=True, null=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Doctor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('specialization', models.CharField(default='not specified', max_length=255)),
                ('work_phone_number', models.CharField(error_messages={'unique': 'رقم هاتف العمل المدخل مستخدم من قبل شخص أخر ، يرجى إدخال رقم آخر.'}, max_length=255, null=True, unique=True)),
                ('years_of_experience', models.IntegerField(default=0)),
                ('personal_ID', models.CharField(error_messages={'unique': 'الرقم المدني المدخل مستخدم من قبل شخص أخر ، يرجى إدخال رقم آخر.'}, max_length=255, null=True, unique=True)),
                ('face_photo', models.FileField(default='/default_images/default_image_for_all_models.jpeg', upload_to=user_auth.models.DoctorModels.Doctor.upload_doctor_face_photo)),
                ('marital_status', models.CharField(choices=[('unknown', 'unknown'), ('Married', 'Married'), ('Widowed', 'Widowed'), ('Divorced', 'Divorced'), ('Single', 'Single')], default='unknown', max_length=10)),
                ('medical_licence', models.FileField(default='/default_images/default_image_for_all_models.jpeg', upload_to=user_auth.models.DoctorModels.Doctor.upload_doctor_medical_licence)),
                ('status', models.PositiveSmallIntegerField(choices=[(2, 'Pending'), (1, 'Accepted'), (0, 'Rejected')], default=2)),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='date created')),
            ],
        ),
        migrations.CreateModel(
            name='WorkExperience',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, max_length=255, null=True)),
                ('time_period', models.CharField(blank=True, max_length=255, null=True)),
                ('body', models.TextField(blank=True, null=True)),
                ('certificate', models.FileField(default='/default_images/default_image_for_all_models.jpeg', upload_to=user_auth.models.DoctorModels.WorkExperience.upload_doctor_work_experience_certificate)),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='date created')),
                ('doctor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user_auth.doctor')),
            ],
        ),
        migrations.CreateModel(
            name='Patient',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='date created')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='MedicalHistory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, max_length=255, null=True)),
                ('time_period', models.CharField(blank=True, max_length=255, null=True)),
                ('body', models.TextField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='date created')),
                ('patient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user_auth.patient')),
            ],
        ),
        migrations.CreateModel(
            name='Education',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('university', models.CharField(blank=True, max_length=255, null=True)),
                ('degree', models.CharField(blank=True, max_length=255, null=True)),
                ('time_period', models.CharField(blank=True, max_length=255, null=True)),
                ('certificate', models.FileField(default='/default_images/default_image_for_all_models.jpeg', upload_to=user_auth.models.DoctorModels.Education.upload_doctor_education_medical_certificate)),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='date created')),
                ('doctor', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='user_auth.doctor')),
            ],
        ),
    ]