# Generated by Django 4.0.7 on 2022-10-12 08:02

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('SabaShopUser', '0005_remove_customeruser_adr_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='customeruser',
            name='adr',
            field=models.CharField(default=1, max_length=150),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='customeruser',
            name='is_valid',
            field=models.BooleanField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='customeruser',
            name='tel',
            field=models.CharField(default=99, max_length=11),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='customeruser',
            name='nam',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterModelTable(
            name='customeruser',
            table='webcast',
        ),
    ]
