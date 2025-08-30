from rest_framework import serializers
from .models import Unit


class UnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Unit
        fields = ['id', 'name', 'type', 'status', 'lastUpdated']
        read_only_fields = ['id', 'lastUpdated']
    
    def validate_type(self, value):
        valid_types = ['capsule', 'cabin']
        if value not in valid_types:
            raise serializers.ValidationError(f"Type must be one of: {', '.join(valid_types)}")
        return value
    
    def validate_status(self, value):
        valid_statuses = ['Available', 'Occupied', 'Cleaning In Progress', 'Maintenance Needed']
        if value not in valid_statuses:
            raise serializers.ValidationError(f"Status must be one of: {', '.join(valid_statuses)}")
        return value
