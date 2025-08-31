# Unit Management Dashboard

Aplikasi full-stack untuk mengelola unit kapsul & kabin dengan pelacakan status real-time dan validasi aturan bisnis.

## Persyaratan
- Docker & Docker Compose
- (Opsional) Python 3.8+, Node.js 18+, PostgreSQL untuk development lokal

## Setup & Menjalankan Aplikasi

### Metode Utama: Docker Compose
```bash
# 1. Salin file environment
cp .env.example .env

# 2. Tarik image pra-bangun dan jalankan
docker-compose pull
docker-compose up -d
```

**Akses aplikasi:**
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8000`
- Database: `localhost:5432`

### Setup Lokal (Development)
```bash
# Backend
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

```bash
# Frontend (terminal terpisah)
cd frontend
npm install
npm run dev
```

## Alur Kerja Docker

### Developer (Build & Push)
```bash
# Build dan push image ke Docker Hub
docker build -t ginanjartg/unit-dashboard-backend:latest ./backend
docker build -t ginanjartg/unit-dashboard-frontend:latest ./frontend
docker push ginanjartg/unit-dashboard-backend:latest
docker push ginanjartg/unit-dashboard-frontend:latest
```

### Client/Tester (Pull & Run)
```bash
# Cukup tarik image dan jalankan tanpa build
docker-compose pull
docker-compose up -d
```

## Arsitektur & Pilihan Teknis

**Stack:**
- **Backend**: Django REST Framework + PostgreSQL
- **Frontend**: Next.js + TypeScript + Tailwind CSS
- **Kontainerisasi**: Docker (image terpisah untuk skalabilitas independen)

**Keputusan Arsitektur:**
- RESTful API dengan pemisahan backend-frontend yang jelas
- Validasi status di backend untuk integritas data
- PostgreSQL untuk ACID compliance
- Next.js standalone output untuk optimasi produksi

## Justifikasi Aturan Perubahan Status

**Aturan Bisnis:** Unit `Occupied` tidak boleh langsung ke `Available` - harus melalui `Cleaning In Progress` atau `Maintenance Needed`.

**Alasan:**
- Memastikan prosedur kebersihan/maintenance terpenuhi
- Menjaga konsistensi operasional

**Implementasi:**
- Validasi di `UnitSerializer.validate()` (backend)
- Error handling di frontend dengan pesan yang jelas
- Aturan tidak bisa di-bypass karena validasi server-side

## Testing Cepat
1. Buka `http://localhost:3000`
2. Buat unit baru dan ubah statusnya
3. Coba transisi terlarang (Occupied → Available) - harus menampilkan error
