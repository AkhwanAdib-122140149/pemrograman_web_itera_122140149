function validateForm() {
    // Mengambil nilai input
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    // Mengambil elemen error message
    let nameError = document.getElementById('nameError');
    let emailError = document.getElementById('emailError');
    let passwordError = document.getElementById('passwordError');

    // Membersihkan pesan error sebelum validasi
    nameError.style.display = "none";
    emailError.style.display = "none";
    passwordError.style.display = "none";

    // Validasi nama
    if (name.length <= 3) {
        nameError.style.display = "block"; // Menampilkan pesan error
        return false;
    }

    // Validasi email
    if (!email.includes('@') || !email.includes('.')) {
        emailError.style.display = "block"; // Menampilkan pesan error
        return false;
    }

    // Validasi password
    if (password.length < 8) {
        passwordError.style.display = "block"; // Menampilkan pesan error
        return false;
    }

    // Jika semua validasi berhasil
    alert("Form berhasil divalidasi!");
    return true;
}
