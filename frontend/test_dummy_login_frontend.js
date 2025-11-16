// File testing sederhana untuk menguji fungsi login dummy di frontend
// Kita akan mensimulasikan pemanggilan fungsi-fungsi penting

console.log('Testing fungsi login dummy di frontend...\n');

// Kita akan membuat mock untuk fungsi-fungsi yang dibutuhkan
global.fetch = require('node-fetch');

// Fungsi untuk menguji login dummy
async function testDummyLogin() {
  console.log('Test 1: Mencoba dummy login dengan fetch ke backend');
  
  try {
    const dummyCredentials = {
      email: 'test@example.com',
      full_name: 'Test User'
    };
    
    // Kita akan menguji dengan fetch ke endpoint dummy login
    // Perlu mengetes apakah backend sedang berjalan di port 5001
    const response = await fetch('http://localhost:5001/api/dummy/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dummyCredentials),
    });
    
    if(response.ok) {
      const data = await response.json();
      console.log('✓ Dummy login berhasil');
      console.log('Data user:', data);
      return data;
    } else {
      console.log('✗ Dummy login gagal');
      const error = await response.text();
      console.log('Error:', error);
      return null;
    }
  } catch (error) {
    console.log('✗ Error saat mencoba dummy login:', error.message);
    console.log('Pastikan backend sedang berjalan di port 5001');
    return null;
  }
}

// Fungsi untuk menguji login dummy ke port 5000 (fallback)
async function testDummyLoginFallback() {
  console.log('\nTest 2: Mencoba dummy login dengan fallback ke port 5000');
  
  try {
    const dummyCredentials = {
      email: 'test@example.com',
      full_name: 'Test User'
    };
    
    const response = await fetch('http://localhost:5000/api/dummy/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dummyCredentials),
    });
    
    if(response.ok) {
      const data = await response.json();
      console.log('✓ Dummy login fallback berhasil');
      console.log('Data user:', data);
      return data;
    } else {
      console.log('✗ Dummy login fallback gagal');
      const error = await response.text();
      console.log('Error:', error);
      return null;
    }
  } catch (error) {
    console.log('✗ Error saat mencoba dummy login fallback:', error.message);
    console.log('Pastikan backend sedang berjalan di port 5000');
    return null;
  }
}

// Jalankan test
async function runTests() {
  console.log('Memulai testing login dummy frontend...\n');
  
  // Coba port 5001 dulu
  let result = await testDummyLogin();
  
  // Jika gagal, coba port 5000
  if (!result) {
    result = await testDummyLoginFallback();
  }
  
  if (result) {
    console.log('\n✓ Semua test berhasil! Login dummy frontend siap digunakan.');
    console.log('Catatan: Pastikan backend sedang berjalan sebelum menggunakan fitur login.');
  } else {
    console.log('\n✗ Test gagal. Pastikan backend sedang berjalan di salah satu port (5000 atau 5001)');
  }
}

// Jalankan test
runTests().catch(console.error);