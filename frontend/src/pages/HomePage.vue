<template>
  <div class="home">
    <section class="bg-blue-600 text-white">
      <div class="container mx-auto px-4 py-12">
        <h1 class="text-3xl md:text-4xl font-bold mb-4">
          <font-awesome-icon :icon="['fas', 'shield-alt']" class="mr-2" />
          Bienvenue dans QHSE Manager
        </h1>
        <h2 class="text-xl md:text-2xl">Votre solution complète de pilotage QHSE</h2>
      </div>
    </section>

    <section class="py-12">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white rounded-lg shadow-lg overflow-hidden">
            <div class="p-6">
              <div class="flex items-start">
                <div class="mr-4 text-blue-500">
                  <font-awesome-icon :icon="['fas', 'file-alt']" size="2x" />
                </div>
                <div class="flex-1">
                  <h3 class="text-xl font-bold mb-2">Gestion Documentaire</h3>
                  <p class="text-gray-600 mb-4">
                    Téléchargez, organisez et validez vos documents QHSE
                  </p>
                  <router-link
                    to="/documents"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Gérer les documents
                  </router-link>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-lg overflow-hidden">
            <div class="p-6">
              <div class="flex items-start">
                <div class="mr-4 text-blue-400">
                  <font-awesome-icon :icon="['fas', 'tasks']" size="2x" />
                </div>
                <div class="flex-1">
                  <h3 class="text-xl font-bold mb-2">Plans d'Action</h3>
                  <p class="text-gray-600 mb-4">
                    Créez et suivez vos actions correctives et préventives
                  </p>
                  <router-link
                    to="/actions"
                    class="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Gérer les actions
                  </router-link>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-lg overflow-hidden">
            <div class="p-6">
              <div class="flex items-start">
                <div class="mr-4 text-green-50">
                  <font-awesome-icon :icon="['fas', 'chart-line']" size="2x" />
                </div>
                <div class="flex-1">
                  <h3 class="text-xl font-bold mb-2">Indicateurs</h3>
                  <p class="text-gray-600 mb-4">Suivez vos KPI et tableaux de bord</p>
                  <router-link
                    to="/indicators"
                    class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Gérer les indicateurs
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Ce composant n'a pas besoin de logique spécifique pour l'instant
</script>
