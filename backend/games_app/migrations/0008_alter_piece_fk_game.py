# Generated by Django 5.0.2 on 2024-04-22 20:47

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('games_app', '0007_game_moves_made'),
    ]

    operations = [
        migrations.AlterField(
            model_name='piece',
            name='fk_game',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='pieces', to='games_app.game'),
        ),
    ]