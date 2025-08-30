# Unit Management Dashboard

A full-stack web application for managing capsule and cabin units with real-time status tracking and business rule enforcement.

## Instructions

### Prerequisites
- Python 3.8+
- Node.js 18+
- PostgreSQL 12+

### Backend Setup (Django REST API)

1. **Database Setup**
```sql
CREATE DATABASE unit_management_db;
```

2. **Install Dependencies**
```bash
pip install -r requirements.txt
```

3. **Configure Database**
Update `backend/settings.py` with your PostgreSQL credentials if needed.

4. **Run Migrations**
```bash
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

5. **Start Backend Server**
```bash
python manage.py runserver
```
Backend runs on `http://localhost:8000`

### Frontend Setup (Next.js)

1. **Install Dependencies**
```bash
cd frontend
npm install
```

2. **Start Development Server**
```bash
npm run dev
```
Frontend runs on `http://localhost:3000`

### Testing the Application

1. Open `http://localhost:3000` in your browser
2. Use the interface to create units, filter by type/status, and update statuses
3. Test the business rule by trying to change a unit from Occupied directly to Available

## Technical Choices and Architecture

### Stack
- **Backend**: Django REST Framework + PostgreSQL
- **Frontend**: Next.js + TypeScript + Tailwind CSS

### Project Structure
```
unit-management-dashboard/
├── backend/                    # Django REST API
│   ├── settings.py            # Database & CORS config
│   ├── urls.py               # Main routing
│   └── unit_dashboard/        # Core app
│       ├── models.py         # Unit data model
│       ├── serializers.py    # API validation & serialization
│       ├── views.py          # API endpoints
│       └── urls.py           # App routing
├── frontend/                  # Next.js application
│   └── src/
│       ├── app/              # App router pages
│       ├── components/       # React components
│       ├── services/         # API integration
│       └── types/            # TypeScript definitions
├── manage.py                 # Django management
└── requirements.txt          # Python dependencies
```

### Architecture Decisions
- **RESTful API**: Clean separation between frontend and backend
- **TypeScript**: Type safety and better developer experience
- **Component-based UI**: Reusable, maintainable frontend architecture
- **PostgreSQL**: ACID compliance, robust data integrity
- **CORS Configuration**: Secure cross-origin requests between frontend and backend

### API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/units` | List units with filtering & pagination |
| POST | `/api/units` | Create new unit |
| GET | `/api/units/{id}` | Get unit details |
| PUT | `/api/units/{id}` | Update unit |

## Status Change Rule Justification

### Business Rule
**Occupied units cannot transition directly to Available.** They must first go through either:
- **Cleaning In Progress** (for routine cleaning)
- **Maintenance Needed** (for repairs/maintenance)

### Implementation Strategy

**Backend Enforcement**: The business rule is enforced in `UnitSerializer.validate()` method, which:
- Validates the transition from current status to requested status
- Returns HTTP 400 with descriptive error message for invalid transitions
- Ensures data integrity at the API level

**Frontend Handling**: The UI allows users to select any status but gracefully handles validation errors:
- All status options remain visible in dropdowns
- Invalid transitions trigger error messages from the backend
- Users receive clear feedback about required intermediate steps

### Why Backend Validation?
1. **Data Integrity**: Prevents invalid states regardless of client implementation
2. **Security**: Rules cannot be bypassed by malicious requests
3. **Consistency**: Same validation applies to all API consumers
4. **Maintainability**: Business logic centralized in one location

This approach ensures the business rule is consistently enforced while providing a transparent user experience that guides users toward valid transitions. 
