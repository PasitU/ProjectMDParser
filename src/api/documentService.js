const BASE_URL = 'http://localhost:3000/api/documents';

export const getDocuments = async () => {
    const response = await fetch(BASE_URL);
    if (response.error) {
        throw new Error('Unable to retrieve documents');
    }
    return response.json();
}