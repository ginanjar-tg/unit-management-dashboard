from django.urls import path
from .views import UnitListCreateView, UnitRetrieveUpdateView

app_name = 'unit_dashboard'

urlpatterns = [
    path('api/units', UnitListCreateView.as_view(), name='unit-list-create'),
    path('api/units/<int:pk>', UnitRetrieveUpdateView.as_view(), name='unit-detail'),
]
