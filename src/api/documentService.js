const BASE_URL = 'http://localhost:3000/api/documents'

export const getDocuments = async () => {
  const response = await fetch(BASE_URL)
  if (!response.ok) {
    throw new Error('Unable to retrieve documents')
  }
  return response.json()
}

export const saveDocument = async (newDocument) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        documents: [
          {
            id: newDocument.id,
            title: newDocument.title,
            content: newDocument.content,
            createAt: newDocument.createAt // Use timestamp
          }
        ]
      })
    })

    if (!response.ok) {
      throw new Error('Unable to save document')
    }

    return response.json()
  } catch (error) {
    console.error('Error saving document:', error.message)
    throw error
  }
}

export const addDocument = async () => {
  try {
    // Fetch existing documents
    const existingDocuments = await getDocuments()

    // Create a new document object
    const newDocument = {
      id: String(existingDocuments.length), // Use a unique ID
      title: 'Untitled.md', // Customize the title as needed
      content: '# New Document\n\nThis is a new document.',
      createAt: new Date().toISOString()
    }

    // Add the new document to the existing documents
    existingDocuments.documents.push(newDocument)

    // Save the updated list of documents
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(existingDocuments)
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
