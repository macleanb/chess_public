from django.db import models

class Icon(models.Model):
    """ A class for managing icons """
    name = models.CharField(max_length=200, blank=False, null=False)
    image = models.ImageField(verbose_name='Image', upload_to='images', blank=True, null=True)
    description = models.CharField(max_length=200, blank=True, null=True)

    def __repr__(self):
        return self.__str__()

    def __str__(self):
        return f'Icon(ID: {self.id} ' \
               f'Name {self.name} ' \
               f'Description {self.description})'
