# Generated by Django 3.0.4 on 2020-04-02 09:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0005_profile_voice'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='time_speak',
            field=models.IntegerField(default=0),
        ),
    ]
