# Generated by Django 5.0.2 on 2024-02-25 13:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chess_users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='chessuser',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='chessuser',
            name='is_staff',
            field=models.BooleanField(default=False),
        ),
    ]