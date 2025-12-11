<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    :width="size"
    :height="size"
    class="fraisse-logo"
    aria-label="Logo Fraisse & Fils"
  >
    <!-- Shield Background (QHSE/Safety Symbol) -->
    <!-- Modern shield shape: flat top, curved bottom -->
    <path
      d="M50 95 C 20 80, 10 55, 10 30 L 10 15 L 50 5 L 90 15 L 90 30 C 90 55, 80 80, 50 95 Z"
      fill="#1B2755"
    />
    
    <!-- Stylized Street Lamp (Company Identity) -->
    <!-- Lamp Post Pole -->
    <rect x="46" y="45" width="8" height="35" rx="1" fill="#FFFFFF" opacity="0.9" />
    
    <!-- Lamp Head (Modern LED style) -->
    <path
      d="M50 25 L 70 30 L 65 45 L 35 45 L 30 30 Z"
      fill="#FFD700"
    />
    
    <!-- Light Rays / Energy (Electricity) -->
    <path 
      d="M35 45 L 25 60 M 65 45 L 75 60 M 50 45 L 50 65" 
      stroke="#FFD700" 
      stroke-width="3" 
      stroke-linecap="round"
      opacity="0.8"
    />
  </svg>
</template>

<script setup lang="ts">
defineProps({
  size: {
    type: [Number, String],
    default: 40
  }
})
</script>

<style scoped>
.fraisse-logo {
  display: inline-block;
  vertical-align: middle;
  filter: drop-shadow(0px 2px 3px rgba(0,0,0,0.2));
  transition: transform 0.3s ease;
}

.fraisse-logo:hover {
  transform: scale(1.05);
}
</style>
