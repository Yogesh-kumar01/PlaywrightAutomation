import { test, expect } from '@playwright/test';
import UserApiPage from '../Pages/api';
import testData from '../testdata/api.json';

test('Users API Full Lifecycle Test - POST GET PUT DELETE', async ({ request }) => {

  const userApi = new UserApiPage(request);

  // Generate unique data
  const timestamp = Date.now();

  const uniqueEmail = `sameer_${timestamp}@example.com`;
  const uniqueUsername = `sameer_${timestamp}`;

  // ================================
  // 1. POST - Register User
  // ================================

  const registerPayload = {
    ...testData.registerData,
    email: uniqueEmail,
    username: uniqueUsername
  };

  const registerRes = await userApi.registerUser(registerPayload);

  console.log('Register Status:', registerRes.status());
  console.log('Register Body:', await registerRes.json());

  expect([200, 201]).toContain(registerRes.status());


  // ================================
  // 2. POST - Login User
  // ================================

  const loginPayload = {
    ...testData.loginCredentials,
    email: uniqueEmail
  };

  const { response: loginRes, token } =
    await userApi.loginUser(loginPayload);

  console.log('Login Status:', loginRes.status());
  console.log('Login Token:', token);

  expect(loginRes.status()).toBe(200);
  expect(token).toBeTruthy();


  // ================================
  // 3. GET - Current User
  // ================================

  const getRes = await userApi.getCurrentUser(token);

  console.log('GET Status:', getRes.status());
  console.log('GET Body:', await getRes.json());

  expect(getRes.status()).toBe(200);


  // ================================
  // 4. PUT - Replace Account
  // ================================

  const updatePayload = {
    fullname: testData.updateProfileData.fullname,
    email: uniqueEmail,
    username: uniqueUsername
  };

  console.log('PUT Payload:', updatePayload);

  const putRes = await userApi.updateUserAccount(
    token,
    updatePayload
  );

  console.log('PUT Status:', putRes.status());
  console.log('PUT Body:', await putRes.json());

  expect(putRes.status()).toBe(200);


  // ================================
  // 5. DELETE - Delete Account
  // ================================

  const deleteRes = await userApi.deleteUserAccount(token);

  console.log('DELETE Status:', deleteRes.status());
  console.log('DELETE Body:', await deleteRes.json());

  expect(deleteRes.status()).toBe(200);

});