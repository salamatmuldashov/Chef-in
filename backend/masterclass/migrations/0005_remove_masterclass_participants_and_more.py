# Generated by Django 4.1.7 on 2023-05-04 06:08

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('masterclass', '0004_remove_masterclass_participants_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='masterclass',
            name='participants',
        ),
        migrations.AddField(
            model_name='masterclass',
            name='participants',
            field=models.ManyToManyField(to=settings.AUTH_USER_MODEL),
        ),
    ]
