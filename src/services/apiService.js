// api.js
//const response = await fetch('http://localhost:3400/produtos');
//const data = await response.json();
const baseURL = 'http://localhost:3400/produtos'; // Your API base URL

// Function to make a GET request
export const getItems = async () => {
  try {
    const response = await fetch(`${baseURL}`);
    if (!response.ok) {
      throw new Error('Failed to fetch items');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
};

// Function to make a POST request
export const createItem = async (data) => {
  try {
    const response = await fetch(`${baseURL}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to create item');
    }
    return response.json();
  } catch (error) {
    console.error('Error creating item:', error);
    throw error;
  }
};

// Add more API service methods as needed
