from django.db import models
from django.utils import timezone


class Unit(models.Model):
    TYPE_CHOICES = [
        ('capsule', 'Capsule'),
        ('cabin', 'Cabin'),
    ]
    
    STATUS_CHOICES = [
        ('Available', 'Available'),
        ('Occupied', 'Occupied'),
        ('Cleaning In Progress', 'Cleaning In Progress'),
        ('Maintenance Needed', 'Maintenance Needed'),
    ]
    
    name = models.CharField(max_length=100, unique=True)
    type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    status = models.CharField(max_length=25, choices=STATUS_CHOICES, default='Available')
    lastUpdated = models.DateTimeField(auto_now=True)
    
    def save(self, *args, **kwargs):
        self.lastUpdated = timezone.now()
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.name} ({self.type}) - {self.status}"
    
    class Meta:
        ordering = ['-lastUpdated']
