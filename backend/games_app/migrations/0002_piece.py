# Generated by Django 5.0.2 on 2024-02-17 21:26

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('games_app', '0001_initial'),
        ('icons_app', '0002_icon_description'),
    ]

    operations = [
        migrations.CreateModel(
            name='Piece',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('color', models.CharField(blank=True, max_length=200, null=True)),
                ('current_file', models.CharField(blank=True, max_length=1, null=True)),
                ('current_rank', models.CharField(blank=True, max_length=1, null=True)),
                ('first_move_made', models.BooleanField(blank=True, default=False, null=True)),
                ('piece_type', models.CharField(blank=True, max_length=200, null=True)),
                ('starting_file', models.CharField(blank=True, max_length=1, null=True)),
                ('starting_rank', models.CharField(blank=True, max_length=1, null=True)),
                ('fk_icon', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='pieces', to='icons_app.icon')),
            ],
        ),
    ]
