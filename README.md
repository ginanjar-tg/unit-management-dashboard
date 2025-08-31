# Unit Management Dashboard

Aplikasi full-stack untuk memantau status kapsul & kabin secara real-time dengan validasi aturan bisnis.

## Persyaratan
- Docker & Docker Compose
- (Opsional) Python 3.8+, Node.js 18+, PostgreSQL untuk mode pengembangan lokal

## Menjalankan Aplikasi

### Dengan Docker Compose (disarankan)
Jalankan layanan:
   ```bash
   docker-compose pull   # menarik image yang sudah dibangun
   docker-compose up -d  # menjalankan service
   ```

Akses aplikasi:
- Frontend : http://localhost:3000
- Backend  : http://localhost:8000
- Database : localhost:5432

### Mode Lokal (opsional)
Backend:
```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
Frontend (terminal terpisah):
```bash
cd frontend
npm install
npm run dev
```

## Pengujian Cepat
1. Buka UI di browser.
2. Buat unit baru atau ubah statusnya.
3. Coba transisi terlarang `Occupied → Available` – sistem harus menolak dan menampilkan pesan error.

## Tumpukan Teknologi & Arsitektur
- **Backend**  : Django REST Framework + PostgreSQL
- **Frontend** : Next.js + TypeScript + Tailwind CSS
- **Database** : PostgreSQL
- **Kontainer**: Docker (image terpisah backend & frontend)

**Alasan Pemisahan Backend–Frontend**
- Skalabilitas dan deployment independen.
- Tanggung jawab terpisah antara API dan UI.

## Aturan Bisnis Status Unit
- Unit `Occupied` tidak boleh langsung ke `Available`.
- Wajib melalui `Cleaning In Progress` atau `Maintenance Needed`.

**Implementasi & Validasi**
- Dicek di `UnitSerializer.validate()` pada backend.
- Frontend menampilkan pesan kesalahan dari API.
- Validasi server-side mencegah bypass melalui klien.
