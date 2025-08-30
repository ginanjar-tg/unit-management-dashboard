from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from .models import Unit


class UnitModelTest(TestCase):
    def setUp(self):
        self.unit = Unit.objects.create(
            name="Capsule-A01",
            type="capsule",
            status="Available"
        )
    
    def test_unit_creation(self):
        self.assertEqual(self.unit.name, "Capsule-A01")
        self.assertEqual(self.unit.type, "capsule")
        self.assertEqual(self.unit.status, "Available")
        self.assertIsNotNone(self.unit.lastUpdated)
    
    def test_unit_str_method(self):
        expected = "Capsule-A01 (capsule) - Available"
        self.assertEqual(str(self.unit), expected)


class UnitAPITest(APITestCase):
    def setUp(self):
        self.unit = Unit.objects.create(
            name="Capsule-A01",
            type="capsule",
            status="Available"
        )
    
    def test_get_all_units(self):
        response = self.client.get('/api/units')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_create_unit(self):
        data = {
            "name": "Cabin-B01",
            "type": "cabin",
            "status": "Available"
        }
        response = self.client.post('/api/units', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    
    def test_get_unit_detail(self):
        response = self.client.get(f'/api/units/{self.unit.id}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], "Capsule-A01")
    
    def test_update_unit(self):
        data = {"status": "Occupied"}
        response = self.client.put(f'/api/units/{self.unit.id}', data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], "Occupied")
    
    def test_filter_by_status(self):
        response = self.client.get('/api/units?status=Available')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_filter_by_type(self):
        response = self.client.get('/api/units?type=capsule')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
