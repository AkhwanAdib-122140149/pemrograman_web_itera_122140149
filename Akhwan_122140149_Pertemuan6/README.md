#  Aplikasi Manajemen Matakuliah – Pyramid RESTful API
---

## 💠 Fitur Utama

* ✅ Tambah matakuliah (POST)
* ✅ Ambil semua matakuliah (GET)
* ✅ Ambil matakuliah berdasarkan ID (GET)
* ✅ Update matakuliah (PUT)
* ✅ Hapus matakuliah (DELETE)

---

## Konfigurasi Database

Pastikan file `development.ini` memiliki konfigurasi berikut:

```ini
sqlalchemy.url = postgresql://pyramid_user(ini perlu diganti):pyramid_pass(perlu diganti)@localhost:5432/pyramid_matakuliah
```

---

## Cara Menjalankan Aplikasi

1. Aktifkan virtual environment:

```bash
.\venv\Scripts\activate
```

2. Jalankan migrasi database:

```bash
alembic -c development.ini upgrade head
```

3. Jalankan server:

```bash
pserve development.ini --reload
```

Akses API di: [http://localhost:6543/api/matakuliah](http://localhost:6543/api/matakuliah)

---
## Testing API via localhost

Screenshot:

![GET](screenshot/localhost%20test.png)

---

## 🔍 Testing API via Postman

### 🔹 GET semua matakuliah

Screenshot:

![GET](screenshot/get%20all.png)

---

### 🔹 POST matakuliah

Screenshot:

![POST](screenshot/post.png)

---

### 🔹 GET matakuliah berdasarkan ID

📸 Screenshot:

![GET by ID](screenshot/get%20id%202.png)

---

### 🔹 PUT update matakuliah

Screenshot:

![PUT](screenshot/put%20id%202.png)

---

### 🔹 DELETE matakuliah

Screenshot:

![DELETE](screenshot/delete.png)

---
