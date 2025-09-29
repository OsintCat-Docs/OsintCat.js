const axios = require('axios'); // To make HTTP requests
const fs = require('fs'); // To interact with the file system

// API endpoint URL (replace with the actual API URL you want to call)
const apiUrl = "http://127.0.0.1:5000/api/npd?lastName=Peterschmidt&id=9473-3313-8886"; 

// The file path where the response will be written
const filePath = 'response.json';

// Function to fetch data from the API and write it to a file
async function fetchDataAndWriteToFile() {
    try {
        // Fetch data from the API
        const response = await axios.post(apiUrl);
        
        // Log the response (optional)
        console.log('Data fetched successfully:', response.data);

        // Write the response data to a file
        fs.writeFile(filePath, JSON.stringify(response.data, null, 2), (err) => {
            if (err) {
                console.error('Error writing to file:', err);
            } else {
                console.log(`Data written to ${filePath}`);
            }
        });
    } catch (error) {
        console.error('Error fetching data from API:', error);
    }
}

// Call the function
fetchDataAndWriteToFile();
