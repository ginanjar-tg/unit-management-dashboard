# Unit Management Dashboard - Backend API

Django REST API untuk mengelola unit kapsul dan kabin dengan tracking status real-time.

## Tech Stack & Architecture

**Backend:** Django + Django REST Framework + PostgreSQL  
**Architecture:** RESTful API dengan layered design untuk fleksibilitas frontend integration

**Key Decisions:**
- **PostgreSQL**: ACID compliance, scalability, concurrent access
- **Flexible Status Rules**: All status transitions allowed for operational flexibility
- **Auto Audit Trail**: Automatic timestamp updates for all changes

## Project Structure

```
unit-management-dashboard/
├── backend/                    
│   ├── settings.py            # PostgreSQL config
│   ├── urls.py               # Main routing
│   └── unit_dashboard/        # Main app
│       ├── models.py         # Unit model
│       ├── serializers.py    # API serializers
│       ├── views.py          # API endpoints
│       └── tests.py          # Unit tests
├── manage.py                 
├── requirements.txt          
└── README.md                
```

## Unit Model

```python
class Unit(models.Model):
    name = CharField(unique=True)           # "Capsule-A01", "Forest-Cabin-2"
    type = CharField(choices=['capsule', 'cabin'])
    status = CharField(choices=['Available', 'Occupied', 
                               'Cleaning In Progress', 'Maintenance Needed'])
    lastUpdated = DateTimeField(auto_now=True)
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/units` | List units (with filtering & pagination) |
| POST | `/api/units` | Create new unit |
| GET | `/api/units/{id}` | Get unit details |
| PUT | `/api/units/{id}` | Update unit status |

**Query Parameters:** `?status=Available&type=capsule&page=1&page_size=20`

## Quick Setup

### 1. Database Setup
```sql
CREATE DATABASE unit_management_db;
```

### 2. Application Setup
```bash
pip install -r requirements.txt

# Update backend/settings.py with your PostgreSQL credentials
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### 3. Test API
```bash
# Create unit
curl -X POST http://localhost:8000/api/units \
  -H "Content-Type: application/json" \
  -d '{"name": "Capsule-A01", "type": "capsule", "status": "Available"}'

# List units
curl "http://localhost:8000/api/units?status=Available"

# Update status  
curl -X PUT http://localhost:8000/api/units/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "Occupied"}'
```

## Dependencies

```
Django==4.2.7
djangorestframework==3.14.0
django-filter==23.3
django-cors-headers==4.3.1
psycopg2-binary==2.9.7
python-decouple==3.8
```

## Status Change Rules

The system allows flexible status transitions to accommodate various operational scenarios:

```
Available → Occupied | Cleaning In Progress | Maintenance Needed
Occupied → Available | Maintenance Needed  
Cleaning In Progress → Available | Maintenance Needed
Maintenance Needed → Available | Cleaning In Progress
```

All changes are automatically timestamped for audit purposes.

## Testing

```bash
python manage.py test backend.unit_dashboard
```

Tests cover model validation, API endpoints, serializer validation, and filtering. 
