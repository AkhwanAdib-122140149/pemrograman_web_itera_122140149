# Akhwan Adib Al Hakim
# 122140149 - RB

from abc import ABC, abstractmethod

class ItemPerpustakaan(ABC):
    def __init__(self, kode, judul):
        self._kode = kode
        self._judul = judul
        self._tersedia = True

    @property
    def kode(self):
        return self._kode

    @property
    def judul(self):
        return self._judul

    @property
    def status(self):
        return self._tersedia

    @abstractmethod
    def pinjam(self):
        pass

    @abstractmethod
    def kembalikan(self):
        pass

class Buku(ItemPerpustakaan):
    def __init__(self, kode, judul, pengarang):
        super().__init__(kode, judul)
        self._pengarang = pengarang

    def pinjam(self):
        if self.status:
            self._tersedia = False
            print(f"Buku '{self.judul}' berhasil dipinjam.")
        else:
            print(f"Buku '{self.judul}' sedang dipinjam.")

    def kembalikan(self):
        self._tersedia = True
        print(f"Buku '{self.judul}' telah dikembalikan.")

class Majalah(ItemPerpustakaan):
    def __init__(self, kode, judul, edisi):
        super().__init__(kode, judul)
        self._edisi = edisi

    def pinjam(self):
        if self.status:
            self._tersedia = False
            print(f"Majalah '{self.judul}' edisi {self._edisi} berhasil dipinjam.")
        else:
            print(f"Majalah '{self.judul}' sedang dipinjam.")

    def kembalikan(self):
        self._tersedia = True
        print(f"Majalah '{self.judul}' telah dikembalikan.")

class ManajerPerpustakaan:
    def __init__(self):
        self.__koleksi = []

    def tambah_item(self, item):
        self.__koleksi.append(item)
        print(f"Item '{item.judul}' ditambahkan ke perpustakaan.")

    def tampilkan_semua(self):
        if not self.__koleksi:
            print("Tidak ada item di perpustakaan.")
            return
        print("\nDaftar Koleksi Perpustakaan:")
        for item in self.__koleksi:
            print(f"Kode: {item.kode}, Judul: {item.judul}")

    def cari_berdasarkan_judul(self, judul):
        hasil = [item for item in self.__koleksi if judul.lower() in item.judul.lower()]
        return hasil

    def cari_berdasarkan_kode(self, kode):
        for item in self.__koleksi:
            if item.kode == kode:
                return item
        return None

    def ubah_judul(self, kode, judul_baru):
        item = self.cari_berdasarkan_kode(kode)
        if item:
            item._judul = judul_baru
            return True
        return False

    def hapus_item(self, kode):
        item = self.cari_berdasarkan_kode(kode)
        if item:
            self.__koleksi.remove(item)
            return True
        return False

# Program utama dengan data sampel
if __name__ == "__main__":
    perpustakaan = ManajerPerpustakaan()
    
    # Menambahkan data sampel
    buku1 = Buku(101, "Python untuk Pemula", "Ahmad Suryadi")
    buku2 = Buku(102, "Belajar OOP Python", "Lina Kartika")
    majalah1 = Majalah(201, "Tekno Update", "Oktober 2023")
    majalah2 = Majalah(202, "Sains Terkini", "Edisi 45")
    
    perpustakaan.tambah_item(buku1)
    perpustakaan.tambah_item(buku2)
    perpustakaan.tambah_item(majalah1)
    perpustakaan.tambah_item(majalah2)

    while True:
        print("\n===================================")
        print("Sistem Manajemen Perpustakaan")
        print("===================================")
        print("1. Tampilkan Semua Koleksi")
        print("2. Cari Berdasarkan Judul")
        print("3. Cari Berdasarkan Kode")
        print("4. Ubah Judul Buku/Majalah")
        print("5. Tambah Buku/Majalah")
        print("6. Hapus Buku/Majalah")
        print("7. Pinjam Buku/Majalah")
        print("8. Kembalikan Buku/Majalah")
        print("9. Tampilkan Semua Item yang Sedang Dipinjam")
        print("10. Exit\n")
        
        pilihan = input("Pilih opsi (1-10): ")

        if pilihan == "1":
            # menampilkan semua item yang ada di perpustakaan tetapi tidak menampilkan item yang sedang dipinjam
            print("\nDaftar Koleksi Perpustakaan:")
            for item in perpustakaan._ManajerPerpustakaan__koleksi:
                if item.status:
                    print(f"Kode: {item.kode}, Judul: {item.judul}")
            # Jika tidak ada item yang tersedia
            if all(not item.status for item in perpustakaan._ManajerPerpustakaan__koleksi):
                print("Tidak ada item yang tersedia.")
            
        # Mencari berdasarkan judul
        elif pilihan == "2":
            judul_cari = input("Masukkan judul yang dicari: ")
            hasil = perpustakaan.cari_berdasarkan_judul(judul_cari)
            if hasil:
                print("\nHasil pencarian:")
                for item in hasil:
                    print(f"Kode: {item.kode}, Judul: {item.judul}")
            else:
                print("Tidak ditemukan item dengan judul tersebut.")

        # Mencari berdasarkan kode
        elif pilihan == "3":
            kode_cari = int(input("Masukkan kode item: "))
            item = perpustakaan.cari_berdasarkan_kode(kode_cari)
            if item:
                print(f"Ditemukan: Kode {item.kode}, Judul: {item.judul}")
            else:
                print("Item tidak ditemukan.")

        # Ubah judul Buku/Majalah
        elif pilihan == "4":
            kode_edit = int(input("Masukkan kode item yang akan diubah: "))
            judul_baru = input("Masukkan judul baru: ")
            if perpustakaan.ubah_judul(kode_edit, judul_baru):
                print("Judul item berhasil diubah.")
            else:
                print("Item tidak ditemukan.")

        # Menambah Buku/Majalah baru
        elif pilihan == "5":
            kode_tambah = int(input("Masukkan kode item baru: "))
            judul_tambah = input("Masukkan judul item baru: ")
            jenis_item = input("Masukkan jenis item (Buku/Majalah): ").lower()
            if jenis_item == "buku":
                pengarang = input("Masukkan nama pengarang: ")
                item_baru = Buku(kode_tambah, judul_tambah, pengarang)
            elif jenis_item == "majalah":
                edisi = input("Masukkan edisi majalah: ")
                item_baru = Majalah(kode_tambah, judul_tambah, edisi)
            else:
                print("Jenis item tidak valid.")
                continue
            perpustakaan.tambah_item(item_baru)

        # Hapus Buku/Majalah
        elif pilihan == "6":
            kode_hapus = int(input("Masukkan kode item yang akan dihapus: "))
            if perpustakaan.hapus_item(kode_hapus):
                print("Item berhasil dihapus.")
            else:
                print("Item tidak ditemukan.")

        # Pinjam Buku/Majalah
        elif pilihan == "7":
            kode_checkout = int(input("Masukkan kode item yang akan dipinjam: "))
            item = perpustakaan.cari_berdasarkan_kode(kode_checkout)
            if item:
                item.pinjam()
            else:
                print("Item tidak ditemukan.")

        # Kembalikan Buku/Majalah
        elif pilihan == "8":
            kode_cari = int(input("Masukkan kode item yang akan dikembalikan: "))
            item = perpustakaan.cari_berdasarkan_kode(kode_cari)
            if item:
                item.kembalikan()
            else:
                print("Item tidak ditemukan.")

        # Menampilkan semua buku/majalah yang sedang dipinjam
        elif pilihan == "9":
            #tampilkan semua item yang sedang dipinjam
            print("\nDaftar Item yang Sedang Dipinjam:")
            for item in perpustakaan._ManajerPerpustakaan__koleksi:
                if not item.status:
                    print(f"Kode: {item.kode}, Judul: {item.judul}")

                    # Jika tidak ada item yang sedang dipinjam
            if all(item.status for item in perpustakaan._ManajerPerpustakaan__koleksi):
                print("Tidak ada item yang sedang dipinjam.") 

        elif pilihan == "10":
            print("Anda telah keluar dari sistem ini.")
            break

        else:
            print("Pilihan tidak valid. ulangi lagi.")
