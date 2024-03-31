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
          </div>
        </div>
      </template>
      <template v-slot:main-content>
        <NavBar @toggle-sidebar="toggleSidebar" :is-sidebar-open="isSidebarOpen">
          <template v-slot:nav-link>
            <div class="md:flex items-center gap-2 hidden">
              <button class="btn btn-ghost hover:text-red-400" onclick="delete_modal.showModal()">
                <v-icon name="ri-delete-bin-5-fill" hover animation="ring" />
              </button>
              <button class="btn hover:text-green-400" onclick="save_modal.showModal()">
                <v-icon name="ri-save-3-line" />
                <h2 class="hidden md:block">Save Changes</h2>
              </button>
              <button class="btn hover:text-info" @click="openPreview">
                <v-icon name="co-list" />
                <h1 class="hidden md:block">Preview</h1>
              </button>
              <RouterLink to="/login" class="btn hover:text-info" v-if="!auth.state.isLogin">
                <v-icon name="md-login" />
                <h1 class="hidden md:block">Login</h1>
              </RouterLink>
            </div>

            <DropDown class="md:hidden">
              <template v-slot:dropdown-trigger>
                <v-icon name="co-list" />
              </template>
              <template v-slot:dropdown-content>
                <button
                  onclick="delete_modal.showModal()"
                  class="btn hover:text-error flex-start gap-3"
                >
                  <v-icon name="ri-delete-bin-5-fill" hover animation="ring" />
                  <h2>Delete</h2>
                </button>
                <button
                  onclick="save_modal.showModal()"
                  class="btn hover:text-success flex-start gap-3"
                >
                  <v-icon name="ri-save-3-line" />
                  <h2>Save Changes</h2>
                </button>
                <button class="btn flex-start gap-3 hover:text-info" @click="openPreview">
                  <v-icon name="bi-eye-fill" />
                  <h1>Preview</h1>
                </button>
                <RouterLink
                  to="/login"
                  v-if="!auth.state.isLogin"
                  class="btn flex-start gap-3 hover:text-info"
                >
                  <v-icon name="md-login" />
                  <h1>Login</h1>
                </RouterLink>
              </template>
            </DropDown>

            <DropDown v-if="auth.state.isLogin" variant="secondary">
              <template v-slot:dropdown-trigger>
                <div class="avatar">
                  <div class="w-[2.75rem] rounded-full">
                    <img
                      src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    />
                  </div>
                </div>
              </template>
              <template v-slot:dropdown-content>
                <router-link
                  :to="{ name: 'profile', params: { id: auth.state.user.id } }"
                  class="btn flex-start gap-3 hover:text-green-400"
                >
                  <v-icon name="co-user" />
                  <h1>Profile</h1>
                </router-link>

                <button
                  class="btn flex-start gap-3 hover:text-red-400"
                  onclick="logout_modal.showModal()"
                >
                  <v-icon name="md-login" />
                  <h1>Logout</h1>
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
  <!-- save modal -->
  <ModalComponent id="save_modal" :modal-function="saveDoc">
    <template v-slot:modal-title>
      <h1 class="text-3xl text-success font-semibold">Confirm Save</h1>
    </template>
    <template v-slot:modal-description>
      <p class="text-sm text-center">
        Are you sure you want to save your changes? <br />
        Make sure to review all details before proceeding.
      </p>
    </template>
  </ModalComponent>
  <!-- delete modal -->
  <ModalComponent id="delete_modal" :modal-function="deleteDoc">
    <template v-slot:modal-title>
      <h1 class="text-3xl text-error font-semibold">Confirm Deletion</h1>
    </template>
    <template v-slot:modal-description>
      <p class="text-sm text-center">
        This action cannot be undone. <br />
        Please confirm to proceed with deletion.
      </p>
    </template>
  </ModalComponent>
  <!-- logout modal -->
  <ModalComponent id="logout_modal" :modal-function="logout">
    <template v-slot:modal-title>
      <h1 class="text-3xl text-error font-semibold">Confirm Logout</h1>
    </template>
    <template v-slot:modal-description>
      <p class="text-sm text-center">
        Are you sure you want to Logout? <br />
        Please confirm to proceed.
      </p>
    </template>
  </ModalComponent>
</template>

<script setup>
//--------------------- IMPORT SECTION ---------------------
import MarkdownParser from '@/components/markdown/MarkdownParser.vue'
import NavBar from '@/components/nav/NavBar.vue'
import SideBar from '@/components/nav/SideBar.vue'
import { onMounted, ref, computed, provide } from 'vue'
import {
  addDocument,
  updateDocument,
  deleteDocument,
  getDocumentsByUser,
  getGuestDocuments
} from '@/api/documentService'
import DropDown from '@/components/DropDown.vue'
import { useRouter } from 'vue-router'
import ModalComponent from '@/components/Modal/ModalComponent.vue'
import useAuth from '@/auth/useAuth'

// --------------------- PAGE CONTROLLER SECTION ---------------------
const isSidebarOpen = ref(false)
const theme = ref('dark')

// --------------------- DATA STORING SECTION ---------------------

const currentDocument = ref(null)
const documents = ref([])

const title = ref('')
const originalTitle = computed(() => currentDocument.value?.title)
const content = ref('')

// --------------------- AUTH ---------------------
const auth = useAuth()
provide('auth', auth)

const logout = () => {
  auth.logout()
  router.push('/').then(() => {
    window.location.reload()
  })
}

onMounted(async () => {
  documents.value = auth.state.isLogin
    ? await getDocumentsByUser(auth.state.user.id)
    : await getGuestDocuments()
  if (documents.value.length === 0) {
    await newDoc()
  }
  currentDocument.value = documents.value[0]
  selectedDocument(currentDocument.value.id)
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
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
  if (!auth.state.isLogin) {
    router.push('/login')
    return
  }
  try {
    const updateDoc = {
      id: currentDocument.value.id,
      title: title.value,
      content: content.value,
      createAt: new Date().toISOString(),
      userId: auth.state.user.id
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
// CREATE NEW DOCUMENT
const newDoc = async () => {
  if (!auth.state.isLogin) {
    router.push('/login')
    return
  }
  try {
    const newDocument = {
      id: String(Date.now()),
      title: `untitled${documents.value.length + 1}.md`,
      content: '# New Document\n\nStart writing here...',
      createAt: new Date().toISOString(),
      userId: auth.state.user.id
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
  if (!auth.state.isLogin) {
    router.push('/login')
    return
  }
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
      parsedMarkdown: parsedMarkdown.value === '' ? ' ' : encodeURI(parsedMarkdown.value)
    }
  })
  window.open(routeData.href)
}
</script>

<style lang="scss" scoped></style>
