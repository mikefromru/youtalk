# Generated by Django 3.0.4 on 2020-04-18 18:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0006_profile_time_speak'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='short_sound',
            field=models.BooleanField(default=True),
        ),
    ]
