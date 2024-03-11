const BASE_URL = 'http://localhost:3001/documents'

// Add a new document to the server --CREATE--
export const addDocument = async (newDocument) => {
  try {
    const response = fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newDocument)
    })
    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.log()
  }
}

// Get the list of documents from the server --READ--
export const getDocuments = async (id) => {
  const baseURL = id ? `${BASE_URL}/${id}` : BASE_URL
  try {
    const response = await fetch(baseURL)

    if (!response.ok) {
      throw new Error('Unable to retrieve documents')
    }

    return response.json()
  } catch (error) {
    console.error('Error getting documents:', error.message)
    throw error
  }
}

// Update/save a document on the server --UPDATE--
export const updateDocument = async (updateDocument) => {
  try {
    const response = await fetch(`${BASE_URL}/${updateDocument.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateDocument)
    })

    if (!response.ok) {
      throw new Error('Unable to update document')
    }

    return response.json()
  } catch (error) {
    console.error('Error updating document:', error.message)
    throw error
  }
}

// Delete a document by using id from the server --DELETE--
export const deleteDocument = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      throw new Error('Unable to delete document')
    }

    return response.json()
  } catch (error) {
    console.error('Error deleting document:', error.message)
    throw error
  }
}
