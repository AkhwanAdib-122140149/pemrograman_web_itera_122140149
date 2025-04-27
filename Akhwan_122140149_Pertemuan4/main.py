import math_operations as mo
print(f"Bilangan PI: {mo.PI}")
print(f"Rumus Celsius ke Kelvin yaitu °C + {mo.Kelvin_to_C}\n")

radius = float(input("Masukkan radius lingkaran: "))
luas = mo.luas_lingkaran(radius)
keliling = mo.keliling_lingkaran(radius)

print(f"Luas: {luas:.2f}")
print(f"Keliling: {keliling:.2f}\n")

from math_operations import * # bintang digunakan untuk mengimpor semua fungsi, jika ingin mengimpor satu atau beberapa fungsi bisa menggunakan seperti berikut:
# from math_operations import konversi_kelvin_celsius, konversi_kelvin_fahrenheit 

celsius = float(input("Masukkan suhu dalam Celsius: "))
fahrenheit = konversi_celsius_fahrenheit(celsius)
kelvin = konversi_celsius_kelvin(celsius)

print(f"{celsius}°C = {fahrenheit:.2f}°F")
print(f"{celsius}°C = {kelvin:.2f}K\n")

fahrenheit = float(input("Masukkan suhu dalam Fahrenheit: "))
celsius = konversi_fahrenheit_celsius(fahrenheit)
kelvin = konversi_fahrenheit_kelvin(fahrenheit)

print(f"{fahrenheit}°F = {celsius:.2f}°C")
print(f"{fahrenheit}°F = {kelvin:.2f}K\n")

kelvin = float(input("\nMasukkan suhu dalam Kelvin: "))
celsius = konversi_kelvin_celsius(kelvin)
fahrenheit = konversi_kelvin_fahrenheit(kelvin)

print(f"{kelvin}K = {celsius:.2f}°C")
print(f"{kelvin}K = {fahrenheit:.2f}°F")