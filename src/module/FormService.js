export async function postFormData(api,formData) {
    try {
        const response = await fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
                // Add any other headers if required
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            // Return the response data
            return await response.json();
        } else {
            // Throw an error if the response is not ok
            throw new Error('Failed to post form data');
        }
    } catch (error) {
        // Handle any errors
        console.error('Error posting form data:', error);
        throw error;
    }
}