<template>
  <div class="p-4">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
        {{ isEditing ? "Modifier l'utilisateur" : 'Nouvel utilisateur' }}
      </h1>
      <Button
        label="Retour à la liste"
        icon="pi pi-arrow-left"
        @click="goBack"
        severity="secondary"
        outlined
      />
    </div>

    <div class="card max-w-2xl mx-auto">
      <Form
        v-slot="$form"
        :resolver="resolver"
        @submit="onFormSubmit"
        :initialValues="initialValues"
      >
        <div class="flex flex-col gap-6">
          <!-- Informations de base -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="flex flex-col gap-2">
              <FloatLabel variant="on">
                <InputText name="username" id="username" type="text" class="w-full" fluid />
                <label for="username">Nom d'utilisateur</label>
              </FloatLabel>
              <Message
                v-if="$form.username?.invalid"
                severity="error"
                size="small"
                variant="simple"
              >
                {{ $form.username.error.message }}
              </Message>
            </div>

            <div class="flex flex-col gap-2">
              <FloatLabel variant="on">
                <InputText name="email" id="email" type="email" class="w-full" fluid />
                <label for="email">Email</label>
              </FloatLabel>
              <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">
                {{ $form.email.error.message }}
              </Message>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="flex flex-col gap-2">
              <FloatLabel variant="on">
                <InputText name="first_name" id="first_name" type="text" class="w-full" fluid />
                <label for="first_name">Prénom</label>
              </FloatLabel>
              <Message
                v-if="$form.first_name?.invalid"
                severity="error"
                size="small"
                variant="simple"
              >
                {{ $form.first_name.error.message }}
              </Message>
            </div>

            <div class="flex flex-col gap-2">
              <FloatLabel variant="on">
                <InputText name="last_name" id="last_name" type="text" class="w-full" fluid />
                <label for="last_name">Nom</label>
              </FloatLabel>
              <Message
                v-if="$form.last_name?.invalid"
                severity="error"
                size="small"
                variant="simple"
              >
                {{ $form.last_name.error.message }}
              </Message>
            </div>
          </div>

          <!-- Rôle et Statut -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="flex flex-col gap-2">
              <FloatLabel variant="on">
                <Select
                  name="role"
                  inputId="role"
                  :options="roleOptions"
                  optionLabel="label"
                  optionValue="value"
                  class="w-full"
                  fluid
                />
                <label for="role">Rôle</label>
              </FloatLabel>
              <Message v-if="$form.role?.invalid" severity="error" size="small" variant="simple">
                {{ $form.role.error.message }}
              </Message>
            </div>

            <div class="flex items-center gap-2 h-full pt-2">
              <Checkbox name="is_active" inputId="is_active" :binary="true" />
              <label for="is_active" class="cursor-pointer">Compte actif</label>
            </div>
          </div>

          <!-- Mot de passe (Optionnel en édition) -->
          <div class="flex flex-col gap-2">
            <FloatLabel variant="on">
              <Password
                name="password"
                inputId="password"
                :toggleMask="true"
                class="w-full"
                inputClass="w-full"
                fluid
              />
              <label for="password">
                {{
                  isEditing
                    ? 'Nouveau mot de passe (laisser vide pour ne pas changer)'
                    : 'Mot de passe'
                }}
              </label>
            </FloatLabel>
            <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">
              {{ $form.password.error.message }}
            </Message>
          </div>

          <!-- Boutons -->
          <div class="flex justify-end gap-2 mt-4">
            <Button label="Annuler" severity="secondary" text @click="goBack" :disabled="loading" />
            <Button type="submit" label="Enregistrer" icon="pi pi-check" :loading="loading" />
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/users'
import { useToast } from 'primevue/usetoast'
import Form from '@primevue/forms/form'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Select from 'primevue/select'
import Checkbox from 'primevue/checkbox'
import Button from 'primevue/button'
import FloatLabel from 'primevue/floatlabel'
import Message from 'primevue/message'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const toast = useToast()

const isEditing = computed(() => route.params.id !== undefined)
const loading = ref(false)

const roleOptions = [
  { label: 'Administrateur', value: 'admin' },
  { label: 'Manager', value: 'manager' },
  { label: 'Utilisateur', value: 'user' },
  { label: 'Observateur', value: 'viewer' },
]

const initialValues = ref({
  username: '',
  email: '',
  first_name: '',
  last_name: '',
  role: 'user',
  is_active: true,
  password: '',
})

// Schéma de validation
const schema = z
  .object({
    username: z.string().min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères"),
    email: z.string().email("Format d'email invalide"),
    first_name: z.string().min(2, 'Le prénom est requis'),
    last_name: z.string().min(2, 'Le nom est requis'),
    role: z.enum(['admin', 'manager', 'user', 'viewer']),
    is_active: z.boolean().optional(),
    password: z.string().optional(),
  })
  .refine(
    (data) => {
      if (!isEditing.value && (!data.password || data.password.length < 6)) {
        return false
      }
      return true
    },
    {
      message: 'Le mot de passe est requis (min 6 caractères)',
      path: ['password'],
    },
  )

const resolver = zodResolver(schema)

const loadUser = async () => {
  if (isEditing.value) {
    const id = parseInt(route.params.id as string)
    loading.value = true
    try {
      await userStore.fetchUserById(id)
      if (userStore.currentUser) {
        initialValues.value = {
          username: userStore.currentUser.username,
          email: userStore.currentUser.email,
          first_name: userStore.currentUser.first_name,
          last_name: userStore.currentUser.last_name,
          role: userStore.currentUser.role,
          is_active: userStore.currentUser.is_active ?? false, // Ensure boolean
          password: '',
        }
      }
    } catch {
      toast.add({
        severity: 'error',
        summary: 'Erreur',
        detail: "Erreur lors de la mise à jour de l'utilisateur",
        life: 3000,
        icon: 'times',
      })
      router.push('/users')
    } finally {
      loading.value = false
    }
  }
}

interface FormSubmitEvent {
  valid: boolean
  values: Record<string, unknown>
}

const onFormSubmit = async ({ valid, values }: FormSubmitEvent) => {
  if (!valid) return

  loading.value = true
  try {
    if (isEditing.value) {
      const id = parseInt(route.params.id as string)
      const updateData = { ...values }
      if (!updateData.password) delete updateData.password

      await userStore.updateUser(id, updateData)
      toast.add({
        severity: 'success',
        summary: 'Succès',
        detail: 'Utilisateur mis à jour avec succès',
        life: 3000,
        icon: 'check',
      })
    } else {
      await userStore.createUser(values)
      toast.add({ severity: 'success', summary: 'Succès', detail: 'Utilisateur créé' })
    }
    router.push('/users')
  } catch (error: unknown) {
    const msg = (error as { message?: string }).message || 'Une erreur est survenue'
    toast.add({ severity: 'error', summary: 'Erreur', detail: msg })
  } finally {
    loading.value = false
  }
}

const goBack = () => {
  router.push('/users')
}

onMounted(() => {
  loadUser()
})
</script>
