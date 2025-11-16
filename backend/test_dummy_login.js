// Test file untuk mengetes fungsi dummy login
// Kita akan mengimpor dan menguji fungsi langsung tanpa menjalankan server

const { dummyLogin } = require('./controllers/dummyAuthController');

// Simulasi req dan res untuk testing
const createMockRequest = (body) => ({
  body: body
});

const createMockResponse = () => {
  const res = {};
  let statusCode = 200;
  res.status = function(code) {
    statusCode = code;
    return this;
  };
  res.json = function(data) {
    console.log(`Status: ${statusCode}`);
    console.log('Response JSON:', data);
    return this;
  };
  return res;
};

console.log('Testing dummy login implementation...\n');

// Test 1: Test dummy login with valid email
console.log('Test 1: Dummy login with valid email and full_name');
const req1 = createMockRequest({ email: 'test@example.com', full_name: 'Test User' });
const res1 = createMockResponse();

dummyLogin(req1, res1)
  .then(() => console.log('✓ Test 1 completed successfully\n'))
  .catch(err => console.log('✗ Test 1 failed:', err));

// Test 2: Test dummy login with only email (full_name will be derived)
console.log('Test 2: Dummy login with only email (full_name will be derived)');
const req2 = createMockRequest({ email: 'user@domain.com' });
const res2 = createMockResponse();

dummyLogin(req2, res2)
  .then(() => console.log('✓ Test 2 completed successfully\n'))
  .catch(err => console.log('✗ Test 2 failed:', err));

// Test 3: Test dummy login without email (should fail validation)
console.log('Test 3: Dummy login without email (should fail validation)');
const req3 = createMockRequest({ full_name: 'Test User' });
const res3 = createMockResponse();

dummyLogin(req3, res3)
  .then(() => console.log('Test 3 completed\n'))
  .catch(err => console.log('✗ Test 3 error:', err));