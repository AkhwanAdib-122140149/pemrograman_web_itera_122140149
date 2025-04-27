Kelvin_to_C = 273.15
PI = 3.14159

def luas_persegi(sisi):
    """Menghitung luas persegi"""
    return sisi * sisi

def keliling_persegi(sisi):
    """Menghitung keliling persegi"""
    return 4 * sisi

def luas_persegi_panjang(panjang, lebar):
    """Menghitung luas persegi panjang"""
    return panjang * lebar

def keliling_persegi_panjang(panjang, lebar):
    """Menghitung keliling persegi panjang"""
    return 2 * (panjang + lebar)

def luas_lingkaran(radius):
    """Menghitung luas lingkaran"""
    return PI * radius * radius

def keliling_lingkaran(radius):
    """Menghitung keliling lingkaran"""
    return 2 * PI * radius

def konversi_celsius_fahrenheit(celsius):
    """Mengonversi Celsius ke Fahrenheit"""
    return (celsius * 9/5) + 32

def konversi_celsius_kelvin(celsius):
    """Mengonversi Celsius ke Kelvin"""
    return celsius + Kelvin_to_C

def konversi_fahrenheit_celsius(fahrenheit):
    """Mengonversi Fahrenhe
    it ke Celsius"""
    return (fahrenheit - 32) * 5/9

def konversi_kelvin_celsius(kelvin):
    """Mengonversi Kelvin ke Celsius"""
    return kelvin - Kelvin_to_C

def konversi_kelvin_fahrenheit(kelvin):
    """Mengonversi Kelvin ke Fahrenheit"""
    return (kelvin - Kelvin_to_C) * 9/5 + 32

def konversi_fahrenheit_kelvin(fahrenheit):
    """Mengonversi Fahrenheit ke Kelvin"""
    return (fahrenheit - 32) * 5/9 + Kelvin_to_C
