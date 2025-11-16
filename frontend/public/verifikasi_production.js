/**
 * Login Dummy untuk Production
 *
 * File ini berisi fungsi login dummy yang terintegrasi dengan backend.
 * Digunakan saat deployment jika login asli bermasalah.
 */

// Fungsi login dummy - panggil API backend
async function dummyLogin() {
    const email = document.getElementById("username")?.value; // Bisa juga email
    const password = document.getElementById("password")?.value;

    if (!email || !password) {
        alert("Mohon isi email dan password!");
        return;
    }

    try {
        // Panggil API dummy login backend
        const response = await fetch(`${window.location.origin}/api/dummy/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const result = await response.json();

        if (response.ok) {
            // Simpan session login
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("currentUser", result.user.full_name || email);
            localStorage.setItem("userEmail", result.user.email);
            localStorage.setItem("userId", result.user.id);
            localStorage.setItem("accessToken", result.access_token || "dummy_token");

            // Redirect ke dashboard
            window.location.href = "/dashboard.html";
        } else {
            alert("Login gagal: " + (result.error || "Login dummy gagal"));
        }
    } catch (error) {
        console.error("Error during dummy login:", error);
        alert("Terjadi kesalahan saat login: " + error.message);
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
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");
    localStorage.removeItem("accessToken");
    window.location.href = "/login.html";
}

// Tambahkan event listener ke form login jika ada
document.addEventListener("DOMContentLoaded", () => {
    // Tampilkan login dummy hanya jika ada parameter URL tertentu atau di production
    const urlParams = new URLSearchParams(window.location.search);
    const showDummy = urlParams.get('showDummyAuth') === 'true' || window.location.hostname === 'reformasi.my.id';

    if (showDummy) {
        // Tampilkan UI dummy login jika diperlukan
        const dummyLoginSection = document.getElementById('dummyLoginSection');
        if (dummyLoginSection) {
            dummyLoginSection.style.display = 'block';
        }

        // Tambahkan informasi bahwa ini adalah login dummy
        const dummyLoginInfo = document.getElementById('dummyLoginInfo');
        if (dummyLoginInfo) {
            dummyLoginInfo.innerHTML = `
                <div style="margin: 10px 0; padding: 10px; background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 4px; color: #856404;">
                    <strong>Login Dummy Aktif</strong><br>
                    Email: test@example.com | Password: password123<br>
                    <small>Gunakan ini jika login normal bermasalah</small>
                </div>
            `;
        }
    }

    // Event listener untuk form login
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