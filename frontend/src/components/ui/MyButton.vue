<template>
  <button
    :class="['button', `is-${variant}`, { 'is-fullwidth': fullWidth, 'is-loading': loading }]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <font-awesome-icon v-if="iconLeft" :icon="iconLeft" :class="{ 'mr-2': text }" />
    {{ text }}
    <font-awesome-icon v-if="iconRight" :icon="iconRight" :class="{ 'ml-2': text }" />
  </button>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

defineProps({
  text: {
    type: String,
    default: '',
  },
  variant: {
    type: String as PropType<
      'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'
    >,
    default: 'primary',
  },
  iconLeft: {
    type: [String, Array],
    default: undefined,
  },
  iconRight: {
    type: [String, Array],
    default: undefined,
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['click'])

const handleClick = (event: Event) => {
  emit('click', event)
}
</script>
