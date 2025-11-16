/**
 * Login Dummy untuk Development
 *
 * File ini berisi fungsi login tanpa backend.
 * Digunakan saat deployment jika login asli bermasalah.
 */

// Kredensial dummy
const DUMMY_CREDENTIALS = {
    username: "admin",
    password: "password123"
};

// Fungsi login dummy
function dummyLogin() {
    const username = document.getElementById("username")?.value;
    const password = document.getElementById("password")?.value;

    if (!username || !password) {
        alert("Mohon isi username dan password!");
        return;
    }

    if (username === DUMMY_CREDENTIALS.username && password === DUMMY_CREDENTIALS.password) {
        // Simpan session login
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("currentUser", username);

        // Redirect ke dashboard
        window.location.href = "/dashboard.html"; // Ganti dengan halaman tujuan kamu
    } else {
        alert("Login gagal! Username/password salah.");
    }
}

// Fungsi cek login (untuk dipanggil di halaman lain)
function checkLogin() {
    if (localStorage.getItem("isLoggedIn") !== "true") {
        window.location.href = "/login.html"; // Redirect ke login
    }
}

// Fungsi logout
function dummyLogout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    window.location.href = "/login.html";
}

// Tambahkan event listener ke form login jika ada
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.onsubmit = (e) => {
            e.preventDefault();
            dummyLogin();
        };
    }
});

// Export fungsi jika menggunakan module (opsional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { dummyLogin, checkLogin, dummyLogout };
}