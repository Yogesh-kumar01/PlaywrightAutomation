export default class UserApiPage {

  constructor(request) {
    this.request = request;

    this.baseUrl =
      'https://api-testing-postman.vercel.app/api/v1/users';
  }


  // =====================================================
  // POST - Register User
  // =====================================================

  async registerUser(userData) {

    return await this.request.post(
      `${this.baseUrl}/register`,
      {
        data: userData
      }
    );
  }


  // =====================================================
  // POST - Login User
  // =====================================================

  async loginUser(credentials) {

    const response = await this.request.post(
      `${this.baseUrl}/login`,
      {
        data: credentials
      }
    );

    const result = await response.json();

    const token =
      result.data?.accessToken ||
      result.data?.token ||
      result.accessToken ||
      result.token;

    return {
      response,
      token
    };
  }


  // =====================================================
  // GET - Current User
  // =====================================================

  async getCurrentUser(token) {

    return await this.request.get(
      `${this.baseUrl}/current-user`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }


  // =====================================================
  // PUT - Replace Account
  // =====================================================

  async updateUserAccount(token, updateData) {

    return await this.request.put(
      `${this.baseUrl}/replace-account`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },

        data: updateData
      }
    );
  }


  // =====================================================
  // DELETE - Delete Account
  // =====================================================

  async deleteUserAccount(token) {

    return await this.request.delete(
      `${this.baseUrl}/delete-account`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }

}