from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cv',  '0001_initial'),
    ]

    def insertData(apps, schema_editor):
        ItemType = apps.get_model('cv', 'ItemCategory')
        ItemType(name = "Education").save()
        ItemType(name = "Projects").save()
        ItemType(name = "Work").save()
        ItemType(name = "Volunteering").save()


    operations = [
        migrations.RunPython(insertData),
    ]