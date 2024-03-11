<template>
  <div data-theme="dark" class="overflow-y-hidden h-screen">
    <SideBar :is-sidebar-open="isSidebarOpen">
      <template v-slot:sidebar-content>
        <div>
          <div class="flex justify-center mt-4"><h1 class="text-2xl">My Document</h1></div>
          <div class="flex justify-center mt-4">
            <button
              @click="newDoc"
              class="flex items-center bg-cyan-600 px-4 py-2 rounded-md text-white"
            >
              + New Document
            </button>
          </div>
          <!-- documentList -->
          <div class="">
            <ul class="flex flex-col mt-4">
              <li v-for="doc in documents" :key="doc.id">
                <button
                  @click="selectedDocument(doc.id)"
                  class="text-lg text-left br-5 p-4 px-[10%] hover:bg-slate-500 hover:text-black"
                >
                  {{ doc.title }}
                  <p class="text-sm">{{ doc.createAt }}</p>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </template>
      <template v-slot:main-content>
        <NavBar @toggle-sidebar="toggleSidebar">
          <template v-slot:nav-link>
            <div class="flex items-center gap-2">
              <!-- deleteButton -->
              <button @click="confirmDelete" class="btn btn-ghost hover:text-red-400">
                <v-icon name="ri-delete-bin-5-fill" hover animation="ring" />
              </button>
              <!-- saveButton -->
              <button @click="confirmUpdate" class="btn hover:text-green-400">
              <v-icon name="ri-save-3-line" />
                <h2 class="hidden md:block">Save Changes</h2>
              </button>
              <!-- previewButton -->
              <button class="btn">Preview</button>
            </div>
          </template>
        </NavBar>
        <MarkdownParser v-model:title="title" v-model:content="content" />
      </template>
    </SideBar>
  </div>
</template>

<script setup>
import MarkdownParser from '@/components/MarkdownParser.vue'
import NavBar from '@/components/NavBar.vue'
import SideBar from '@/components/SideBar.vue'
import { onMounted, ref, watch } from 'vue'
import { addDocument, getDocuments, updateDocument, deleteDocument } from '@/api/documentService'

const isSidebarOpen = ref(false)
// const isDeleteModalOpen = ref(false)

const currentDocument = ref(null)
const documents = ref([])

const title = ref('')
const content = ref('')

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}

onMounted(async () => {
  documents.value = await getDocuments()
  currentDocument.value = documents.value[0]
  selectedDocument(currentDocument.value.id)
})

watch((documents) => {
  documents.value = documents
})

const selectedDocument = (documentID) => {
  const selectDocument = documents.value.find((doc) => doc.id === documentID)
  currentDocument.value = selectDocument
  title.value = selectDocument.title
  content.value = selectDocument.content
}

const saveDoc = async () => {
  try {
    const updateDoc = {
      id: currentDocument.value.id,
      title: title.value,
      content: content.value,
      createAt: new Date().toISOString()
    }
    await updateDocument(updateDoc)
    const index = documents.value.findIndex((doc) => doc.id === currentDocument.value.id)
    documents.value[index] = updateDoc
    currentDocument.value = updateDoc
    selectedDocument(currentDocument.value.id)
  } catch (error) {
    console.error(error)
  }
}

const newDoc = async () => {
  try {
    const newDocument = {
      id: String(Date.now()),
      title: `untitled${documents.value.length + 1}.md`,
      content: '# New Document\n\nStart writing here...',
      createAt: new Date().toISOString()
    }
    await addDocument(newDocument)
    documents.value.push(newDocument)
    currentDocument.value = newDocument
    selectedDocument(newDocument.id)
  } catch (error) {
    console.error(error)
  }
}

const deleteDoc = async () => {
  try {
    await deleteDocument(currentDocument.value.id)
    documents.value = documents.value.filter((doc) => doc.id !== currentDocument.value.id)
    selectedDocument(documents.value[0].id)
  } catch (error) {
    console.error(error)
  }
}

const confirmUpdate = () => {
  if(confirm(`Update ${currentDocument.value.title}?`)) {
    saveDoc()
  }
}

const confirmDelete = () => {
  if (confirm(`Are you sure you want to delete "${currentDocument.value.title}" document?`)) {
    deleteDoc()
  }
}
</script>

<style lang="scss" scoped></style>
