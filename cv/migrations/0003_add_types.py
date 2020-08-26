from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cv',  '0002_auto_20200826_2221'),
    ]

    def insertData(apps, schema_editor):
        ItemType = apps.get_model('cv', 'ItemType')
        ItemType(name = "Education").save()
        ItemType(name = "Projects").save()
        ItemType(name = "Work").save()
        ItemType(name = "Volunteering").save()


    operations = [
        migrations.RunPython(insertData),
    ]