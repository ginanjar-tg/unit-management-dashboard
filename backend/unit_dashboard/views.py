from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from .models import Unit
from .serializers import UnitSerializer


class UnitPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100


class UnitListCreateView(generics.ListCreateAPIView):
    queryset = Unit.objects.all()
    serializer_class = UnitSerializer
    pagination_class = UnitPagination
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['status', 'type']
    
    def get_queryset(self):
        queryset = Unit.objects.all()
        status_param = self.request.query_params.get('status', None)
        type_param = self.request.query_params.get('type', None)
        
        if status_param is not None:
            queryset = queryset.filter(status=status_param)
        if type_param is not None:
            queryset = queryset.filter(type=type_param)
            
        return queryset


class UnitRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Unit.objects.all()
    serializer_class = UnitSerializer
    lookup_field = 'pk'
    
    def put(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)
