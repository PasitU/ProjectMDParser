const BASE_URL = 'http://localhost:3000/api/documents'

// Add a new document to the server --CREATE--
export const addDocument = async () => {
  try {
    const newDocument = {
      id: String(Date.now()),
      title: 'Untitled.md',
      content: '# New Document\n\nThis is a new document.',
      createAt: new Date().toISOString()
    }

    const response = fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newDocument)
    })

    if (!response.ok) {
      throw new Error('Unable to add document')
    }

    return response.json()
  } catch (error) {
    console.error('Error adding document:', error.message)
    throw error
  }
}

// Get the list of documents from the server --READ--
export const getDocuments = async () => {
  try {
    const response = await fetch(BASE_URL)

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
