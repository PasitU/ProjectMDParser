import useAuth from '@/auth/useAuth'

const BASE_URL = `${import.meta.env.VITE_DEV_URL}/documents`

// Add a new document to the server --CREATE--
export const addDocument = async (newDocument) => {
  try {
    const response = await fetch(BASE_URL, {
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
    console.error('Error adding documents:', error.message)
    throw error
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

export const getDocumentsByUser = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}?userId=${userId}`)

    if (!response.ok) {
      throw new Error('Unable to retrieve documents')
    }

    return response.json()
  } catch (error) {
    console.error('Error getting documents:', error.message)
    throw error
  }
}

export const addDocumentByCurrentUser = async (newDocument) => {
  const { user } = useAuth().state
  if (!user) return
  newDocument.userId = user.id
  return addDocument(newDocument)
}

export const getGuestDocuments = async () => {
  try {
    const response = await fetch(`${BASE_URL}?userId=0`)

    if (!response.ok) {
      throw new Error('Unable to retrieve documents')
    }

    return response.json()
  } catch (error) {
    console.error('Error getting documents:', error.message)
    throw error
  }
}
