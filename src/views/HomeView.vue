<template>
  <div :data-theme="theme" class="overflow-hidden h-screen">
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
          <div>
            <ul class="flex flex-col mt-4">
              <li v-for="doc in documents" :key="doc.id">
                <button
                  @click="selectedDocument(doc.id)"
                  class="flex flex-col group w-full text-lg text-left br-5 p-4 hover:bg-base-300 transition-colors duration-300 ease-linear"
                  :class="{
                    'bg-base-200 text-info  hover:text-info': doc.id === currentDocument.id
                  }"
                >
                  <p class="group-hover:text-info" v-text="doc.title"></p>
                  <p class="text-sm" v-text="formatDate(doc.createAt)"></p>
                </button>
              </li>
            </ul>
            <button
              @click="switchTheme"
              class="felx w-full p-4 bg-base-200 hover:bg-base-300 transition-all duration-300 ease-linear"
            >
              MockUp Theme Switch
            </button>
          </div>
        </div>
      </template>
      <template v-slot:main-content>
        <NavBar @toggle-sidebar="toggleSidebar" :is-sidebar-open="isSidebarOpen">
          <template v-slot:nav-link>
            <div class="md:flex items-center gap-2 hidden">
              <button @click="showDeleteModal = true" class="btn btn-ghost hover:text-red-400">
                <v-icon name="ri-delete-bin-5-fill" hover animation="ring" />
              </button>
              <Teleport to="#addModal">
                <div
                  v-if="showDeleteModal"
                  class="absolute left-0 right-0 top-[40%] m-auto btn h-48 w-11/12 max-w-lg shadow-2xl rounded-lg overflow-y-auto z-[9999]"
                >
                  <DeleteModal
                    @close-modal="closeDeleteModal"
                    :deleteDoc="deleteDoc"
                    :current-title="currentDocument.title"
                  />
                </div>
              </Teleport>
              <button
                @click="showSaveModal = true"
                class="btn hover:text-green-400"
                :class="{ 'hover:text-green-600': theme === 'nord' }"
              >
                <v-icon name="ri-save-3-line" />
                <h2 class="hidden md:block">Save Changes</h2>
              </button>
              <Teleport to="#addModal">
                <div
                  v-if="showSaveModal"
                  class="absolute left-0 right-0 top-[40%] m-auto btn h-48 w-11/12 max-w-lg shadow-2xl rounded-lg overflow-y-auto z-[9999]"
                >
                  <SaveModal
                    @closeModal="closeSaveModal"
                    :saveDoc="saveDoc"
                    :current-title="currentDocument.title"
                  />
                </div>
              </Teleport>
              <button class="btn hover:text-info" @click="openPreview">
                <v-icon name="co-list" />
                <h1 class="hidden md:block">Preview</h1>
              </button>
            </div>
            <DropDown>
              <template v-slot:dropdown-trigger>
                <v-icon name="co-list" />
              </template>
              <template v-slot:dropdown-content>
                <button
                  @click="showDeleteModal = true"
                  class="btn hover:text-error flex-start gap-3"
                >
                  <v-icon name="ri-delete-bin-5-fill" hover animation="ring" />
                  <h2>Delete</h2>
                </button>
                <button
                  @click="showSaveModal = true"
                  class="btn hover:text-success flex-start gap-3"
                >
                  <v-icon name="ri-save-3-line" />
                  <h2>Save Changes</h2>
                </button>
                <button class="btn flex-start gap-3 hover:text-info" @click="openPreview">
                  <v-icon name="bi-eye-fill" />
                  <h1>Preview</h1>
                </button>
              </template>
            </DropDown>
          </template>
        </NavBar>
        <MarkdownParser
          v-model:title="title"
          v-model:content="content"
          :original-title="originalTitle"
          @passParsedMd="setParsedMarkdown"
        />
      </template>
    </SideBar>
  </div>
</template>

<script setup>
//--------------------- IMPORT SECTION ---------------------
import MarkdownParser from '@/components/markdown/MarkdownParser.vue'
import NavBar from '@/components/nav/NavBar.vue'
import SideBar from '@/components/nav/SideBar.vue'
import { onMounted, ref, computed } from 'vue'
import { addDocument, getDocuments, updateDocument, deleteDocument } from '@/api/documentService'
import DropDown from '@/components/DropDown.vue'
import DeleteModal from '@/components/Modal/DeleteModal.vue'
import SaveModal from '@/components/Modal/SaveModal.vue'
import { useRouter } from 'vue-router'
// import NoticeModal from '@/components/Modal/NoticeModal.vue'

// --------------------- PAGE CONTROLLER SECTION ---------------------
const isSidebarOpen = ref(false)
const theme = ref('dark')
const showDeleteModal = ref(false)
const showSaveModal = ref(false)

function closeDeleteModal(flagModal) {
  showDeleteModal.value = flagModal
}

const closeSaveModal = (flagModal) => {
  showSaveModal.value = flagModal
}

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}

const switchTheme = () => {
  theme.value = theme.value === 'dark' ? 'nord' : 'dark'
}

// const noticeParams = ref(undefined)
// const showNoticeModal = ref(false)

// --------------------- DATA STORING SECTION ---------------------
const currentDocument = ref(null)
const documents = ref([])

const title = ref('')
const originalTitle = computed(() => currentDocument.value?.title)
const content = ref('')

// --------------------- FUNCTION SECTION ---------------------
onMounted(async () => {
  documents.value = await getDocuments()
  currentDocument.value = documents.value[0]
  selectedDocument(currentDocument.value.id)
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

computed(() => documents.value)

const selectedDocument = (documentID) => {
  const selectDocument = documents.value.find((doc) => doc.id === documentID)
  currentDocument.value = selectDocument
  title.value = selectDocument.title
  content.value = selectDocument.content
  isSidebarOpen.value = false
}

// --------------------- API SECTION ---------------------
// SAVE DOCUMENT
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
// CREAtE NEW DOCUMENT
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
// DELETE DOCUMENT
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

// PREVIEW ROUTING
const parsedMarkdown = ref('')
const setParsedMarkdown = (md) => {
  if (md === undefined) {
    return
  }
  parsedMarkdown.value = md
}

const router = useRouter()

function openPreview() {
  const routeData = router.resolve({
    name: 'preview',
    params: {
      document: title.value,
      parsedMarkdown: parsedMarkdown.value === '' ? ' ' : encodeURI(parsedMarkdown.value.value)
    }
  })
  window.open(routeData.href)
}
</script>

<style lang="scss" scoped></style>
