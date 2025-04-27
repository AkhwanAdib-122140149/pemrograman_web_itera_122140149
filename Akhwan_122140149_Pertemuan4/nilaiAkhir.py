nama_mahasiswa = [
    {"nama": "Andi", "nim": "12345", "nilai_uts": 85, "nilai_uas": 90, "nilai_tugas": 80},
    {"nama": "Budi", "nim": "12346", "nilai_uts": 75, "nilai_uas": 70, "nilai_tugas": 80},
    {"nama": "Cindy", "nim": "12347", "nilai_uts": 65, "nilai_uas": 60, "nilai_tugas": 70},
    {"nama": "Rama", "nim": "12348", "nilai_uts": 55, "nilai_uas": 50, "nilai_tugas": 60},
    {"nama": "Wahyu", "nim": "12349", "nilai_uts": 45, "nilai_uas": 40, "nilai_tugas": 50}
]

# Fungsi untuk menghitung nilai akhir dan grade
NilaiAkhir = []
for mahasiswa in nama_mahasiswa:
    nilai_akhir = (0.3 * mahasiswa["nilai_uts"]) + (0.4 * mahasiswa["nilai_uas"]) + (0.3 * mahasiswa["nilai_tugas"])
    if nilai_akhir >= 80:
        grade = "A"
    elif 70 <= nilai_akhir < 80:
        grade = "B"
    elif 60 <= nilai_akhir < 70:
        grade = "C"
    elif 50 <= nilai_akhir < 60:
        grade = "D"
    else:
        grade = "E"
    
    # Tambahkan hasil ke list NilaiAkhir
    NilaiAkhir.append({
        "nama": mahasiswa["nama"],
        "nim": mahasiswa["nim"],
        "nilai_akhir": nilai_akhir,
        "grade": grade
    })

Hasil = sorted(NilaiAkhir, key=lambda x: x["nilai_akhir"], reverse=False)
# Jika ingin menampilkan data dengan urutan nilai akhir dari yang rendah ke tertinggi, hapus reverse=True
# Hasil = sorted(NilaiAkhir, key=lambda x: x["nilai_akhir"])

# Tampilkan data mahasiswa dalam format tabel
print(f"{'Nama':<10} {'NIM':<10} {'Nilai Akhir':<15} {'Grade':<5}")
for mahasiswa in Hasil:
    print(f"{mahasiswa['nama']:<10} {mahasiswa['nim']:<10} {mahasiswa['nilai_akhir']:<15.2f} {mahasiswa['grade']:<5}")