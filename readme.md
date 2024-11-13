# axios-json-logger

A simple wrapper for Axios to log requests and responses in a pretty-printed JSON format. This package helps you debug and inspect both the request and the response for each HTTP call made via Axios.

## How it Works

### How It Works

The `axios-json-logger` package works by intercepting both Axios requests and responses. It does this by adding an Axios request interceptor and a response interceptor to the provided Axios instance. The request interceptor is used to log the details of the request before it is sent to the server, and the response interceptor logs the details of the response once it is received.

When a request is made, the interceptor captures key information such as the HTTP method (`GET`, `POST`, etc.), the target URL, headers, and the request body (if any). This data is logged in clean, formatted JSON. Additionally, a unique `X-Request-ID` header is added to each request automatically. This header is designed to track requests and make it easier to trace the flow of requests and responses, and ensure the request sand response are printed together - especially useful when debugging multiple API calls. 

The `X-Request-ID` value is typically generated based on the current timestamp, ensuring it is unique for each request.

When the response is received, the interceptor captures the response's status code, status text, body, and headers, which are then logged alongside the request information. This way, both the request and response details are output together, providing a full picture of the HTTP interaction. The method ensures that users can debug and inspect API calls by having both request and response information output together.

## Installation

To install the `axios-json-logger` package, use npm:

```bash
npm install axios-json-logger
```

## Usage

1. **Import Axios** and **axios-json-logger** into your project.
2. **Create an Axios instance**.
3. **Call `addAxiosJsonLogger`** with the Axios instance to automatically log each request and its corresponding response.

### Example

```javascript
// index.js

const axios = require('axios');
const { addAxiosJsonLogger } = require('axios-json-logger');

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // Example API
  timeout: 5000,
});

// Enable JSON logging for this Axios instance
addAxiosJsonLogger(axiosInstance);

// Make an API request
axiosInstance.get('/posts/1')
  .then(response => {
    console.log('Request was successful!');
  })
  .catch(error => {
    console.error('Request failed:', error.message);
  });

// Make another API request that will trigger an error (404)
axiosInstance.get('/nonexistent-endpoint')
  .catch(error => {
    console.error('Request failed:', error.message);
  });
```

### What Gets Logged

- **Request**:
  - Method (`GET`, `POST`, etc.)
  - URL
  - Request headers
  - Request body (if available)

- **Response**:
  - Status code (`200`, `404`, `500`, etc.)
  - Status message (`OK`, `Not Found`, etc.)
  - Response body
  - Response headers

### Example Output

For a **successful request**:

```
===== GET /posts/1 =====
{
  "request": {
    "method": "get",
    "url": "/posts/1",
    "headers": {
      "User-Agent": "axios/0.21.1",
      "X-Request-ID": "1637364974175"
    },
    "data": null
  },
  "response": {
    "status": 200,
    "statusText": "OK",
    "data": {
      "userId": 1,
      "id": 1,
      "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "body": "quia et suscipit\nsuscipit..."
    },
    "headers": {
      "content-type": "application/json; charset=utf-8"
    }
  }
}

============================================================
```

For an **error response (404)**:

```
===== GET /nonexistent-endpoint =====
{
  "request": {
    "method": "get",
    "url": "/nonexistent-endpoint",
    "headers": {
      "User-Agent": "axios/0.21.1",
      "X-Request-ID": "1637364974176"
    },
    "data": null
  },
  "response": {
    "status": 404,
    "statusText": "Not Found",
    "data": {
      "message": "Not Found"
    },
    "headers": {
      "content-type": "application/json; charset=utf-8"
    }
  }
}

============================================================
```

### Configuration

You can pass a custom Axios instance to the logger. This allows you to use different Axios configurations for different parts of your application.

Example:

```javascript
const axiosInstance1 = axios.create({ baseURL: 'https://api.example.com' });
const axiosInstance2 = axios.create({ baseURL: 'https://api.another.com' });

addAxiosJsonLogger(axiosInstance1);
addAxiosJsonLogger(axiosInstance2);
```

### License

This package is licensed under the **MIT** license. 

---

Feel free to open an issue or pull request if you have any suggestions or improvements!
