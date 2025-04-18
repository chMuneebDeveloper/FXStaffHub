import { Alert } from 'react-native';
import { basicURL } from '../../Constant/URLs';

const apiUrl = basicURL;

export const ServerCall = async (token, urlPath, method, body, navigate) => {
  const url = apiUrl + urlPath;
  console.log(url, token);
  try {
    let response;
    if (method === 'GET' || method === 'DELETE') {
      response = await fetchService(url, method, token); // Ensure `fetchService` is implemented correctly
    } else {
      console.log('POST request:', token, url, method, body);

      const res = await fetch(url, {
        method: 'POST',
        headers: token
          ? {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          }
          : {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(body),
      });

      console.log('Raw API response:........', res.status);
      if (res.status === 401) {
        Alert.alert(
          "Authentication Failed",
          "Your session has expired. Please log in again.",
          [{ text: "OK", onPress: () => navigate('Auth') }]
        );
        return;
      }

      response = await res.json();

      console.log('Parsed API response:', response);

      response.success = res.ok;
    }

    console.log('Final API response:', response);

    if (response.success) {
      return response;
    } else {
      // throw response;
      return response;
    }
  } catch (error) {
    console.error('Error in ServerCall:', error);
    throw error;
  }
};

const fetchService = async (url, method, token) => {
  try {
    // Set up headers
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    };

    // Set up the options for the fetch request
    const options = {
      method: method,
      headers: headers
    };

    // Make the fetch request and await the response
    const response = await fetch(url, options);

    // Check if the response status is OK (2xx)
    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    // Parse the JSON response
    const data = await response.json();

    return data;

  } catch (error) {
    console.error('Error during fetch operation:', error);
    throw error;  // Rethrow error for further handling
  }
};

