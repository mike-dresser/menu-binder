class ApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async get(endpoint) {
    console.log(`fetching: ${this.baseUrl}${endpoint}`);
    const result = await fetch(`${this.baseUrl}${endpoint}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(`data:`, data);
        return data;
      });
    return result;
  }

  async post(endpoint, content = {}) {
    console.log(`posting: ${this.baseUrl}${endpoint}`);
    const result = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(content),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(`data:`, data);
        return data;
      });
    return result;
  }

  async delete(endpoint) {
    console.log(`deleting: ${this.baseUrl}${endpoint}`);
    const result = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'DELETE',
    }).then((res) => {
      if (res.ok) {
        console.log(`successful delete`);
        return {};
      }
    });
    return result;
  }
}

const api = new ApiClient('http://127.0.0.1:5555');

export default api;
