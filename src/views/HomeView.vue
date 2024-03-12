<template>
  <div data-theme="dark" class="overflow-hidden h-screen">
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
                  class="text-lg text-left br-5 p-4 px-[10%] hover:bg-base-300 transition-colors duration-300 ease-in-out"
                  :class="{
                    'bg-base-200 text-cyan-500 hover:text-cyan-500': doc.id === currentDocument.id
                  }"
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
            <div class="md:flex items-center gap-2 hidden">
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
              <button class="btn">
                <v-icon name="co-list" />
                <h1 class="hidden md:block">Preview</h1>
              </button>
            </div>
            <DropDown>
              <template v-slot:dropdown-trigger>
                <v-icon name="co-list" />
              </template>
              <template v-slot:dropdown-content>
                <button @click="confirmDelete" class="btn hover:text-red-400 flex-start gap-3">
                  <v-icon name="ri-delete-bin-5-fill" hover animation="ring" />
                  <h2>Delete</h2>
                </button>
                <button @click="confirmUpdate" class="btn hover:text-green-400 flex-start gap-3">
                  <v-icon name="ri-save-3-line" />
                  <h2>Save Changes</h2>
                </button>
                <button class="btn flex-start gap-3">
                  <v-icon name="co-list" />
                  <h1>Preview</h1>
                </button>
              </template>
            </DropDown>
          </template>
        </NavBar>
        <MarkdownParser v-model:title="title" v-model:content="content" :original-title="originalTitle"/>
      </template>
    </SideBar>
  </div>
</template>

<script setup>
import MarkdownParser from '@/components/markdown/MarkdownParser.vue'
import NavBar from '@/components/nav/NavBar.vue'
import SideBar from '@/components/nav/SideBar.vue'
import { onMounted, ref, computed } from 'vue'
import { addDocument, getDocuments, updateDocument, deleteDocument } from '@/api/documentService'
import DropDown from '@/components/DropDown.vue'

const isSidebarOpen = ref(false)
// const isDeleteModalOpen = ref(false)

const currentDocument = ref(null)
const documents = ref([])

const title = ref('')
const originalTitle = computed(() => currentDocument.value?.title)
const content = ref('')

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}

onMounted(async () => {
  documents.value = await getDocuments()
  currentDocument.value = documents.value[0]
  selectedDocument(currentDocument.value.id)
})

computed(() => documents.value)

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
    const index = documents.value.findIndex((doc) => doc.id === currentDocument.value.id)
    documents.value = documents.value.filter((doc) => doc.id !== currentDocument.value.id)
    selectedDocument(documents.value[index - 1]?.id)
  } catch (error) {
    console.error(error)
  }
}

const confirmUpdate = () => {
  if (confirm(`Update ${currentDocument.value.title}?`)) {
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
