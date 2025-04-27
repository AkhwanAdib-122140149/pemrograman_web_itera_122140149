# Input berat badan dan tinggi badan
berat = float(input("Masukkan berat badan (kg): "))
tinggi = float(input("Masukkan tinggi badan (cm): "))

# Hitung BMI
bmi = berat / (tinggi * tinggi / 10000)

# Tampilkan hasil perhitungan dan kategori BMI
print(f"Nilai BMI Anda adalah: {bmi:.2f}")
if bmi < 18.5:
    kategori = "Berat badan kurang"
elif 18.5 <= bmi < 25:
    kategori = "Berat badan normal"
elif 25 <= bmi < 30:
    kategori = "Berat badan berlebih"

else:
    kategori = "Obesitas"

print(f"Kategori BMI Anda adalah: {kategori}")