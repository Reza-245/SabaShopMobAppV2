# Generated by Django 4.0.7 on 2022-09-15 06:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('SabaShopUser', '0002_customeruser'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserSetting',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('per_takh_foroush', models.BooleanField()),
            ],
            options={
                'db_table': 'userseting',
            },
        ),
    ]
