# Generated by Django 4.0.7 on 2022-09-13 08:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('SabaShopUser', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='CustomerUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('idkol', models.IntegerField()),
                ('tafseal', models.IntegerField()),
                ('idmoin', models.IntegerField()),
                ('nam', models.CharField(max_length=200)),
                ('adr', models.CharField(max_length=250)),
                ('tel', models.CharField(max_length=100)),
                ('fax', models.CharField(max_length=100)),
                ('dat', models.DateTimeField()),
                ('stut', models.IntegerField()),
                ('unam', models.CharField(max_length=370)),
                ('pricetype', models.IntegerField()),
                ('subcast', models.IntegerField()),
                ('subchk', models.BooleanField()),
                ('cr', models.DecimalField(decimal_places=0, max_digits=21)),
                ('idgroup', models.IntegerField()),
                ('isf', models.BooleanField()),
                ('cod', models.CharField(max_length=100)),
                ('sh', models.CharField(max_length=100)),
                ('yad', models.CharField(max_length=2000)),
                ('daystut', models.BooleanField()),
                ('locks', models.BooleanField()),
                ('idbank', models.IntegerField()),
                ('cr2', models.DecimalField(decimal_places=0, max_digits=21)),
                ('monid', models.IntegerField()),
                ('idnaghd_edit', models.BigIntegerField()),
                ('ctrl1', models.IntegerField()),
                ('ctrl2', models.IntegerField()),
                ('ctrl_av_ma', models.IntegerField()),
                ('nonaghd_bas', models.IntegerField()),
                ('nonaghd_bed', models.IntegerField()),
                ('ctrl_mprc', models.IntegerField()),
                ('ctrl_avma_bay', models.IntegerField()),
                ('ctrl_avma_sell', models.IntegerField()),
                ('lockstut', models.BooleanField()),
                ('pcnam', models.CharField(max_length=50)),
                ('black_list', models.BooleanField()),
                ('ctrl_anbargardani', models.IntegerField()),
                ('kart_bank', models.BooleanField()),
                ('ctrl_pdar', models.IntegerField()),
                ('ctrl_dirkard', models.IntegerField()),
                ('max_sanad_factor', models.IntegerField()),
                ('mob', models.CharField(max_length=11)),
                ('st_taf', models.IntegerField()),
                ('id_sanad2', models.IntegerField()),
                ('id_relat', models.IntegerField()),
                ('asn_sanad', models.BooleanField()),
                ('trans', models.IntegerField()),
                ('nam2', models.CharField(max_length=50)),
                ('ver', models.IntegerField()),
                ('yad_blacklist', models.CharField(max_length=250)),
                ('idprc', models.IntegerField()),
                ('bima_taf', models.IntegerField()),
                ('per_bima', models.DecimalField(decimal_places=6, max_digits=21)),
                ('cr3', models.DecimalField(decimal_places=6, max_digits=21)),
                ('is_cast', models.IntegerField()),
                ('idtaf2', models.IntegerField()),
                ('iduser', models.IntegerField()),
                ('rowv', models.IntegerField()),
                ('ckct', models.IntegerField()),
            ],
            options={
                'db_table': 'tafseal',
            },
        ),
    ]