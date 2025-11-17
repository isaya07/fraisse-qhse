<template>
  <div class="field">
    <label class="label">{{ label }}</label>
    <div
      :class="[
        'control',
        {
          'has-icons-left': iconLeft,
          'has-icons-right': iconRight,
        },
      ]"
    >
      <div class="select is-fullwidth">
        <select
          :value="modelValue"
          @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
          :required="required"
          :disabled="disabled"
        >
          <option v-if="hasDefaultOption" value="">{{ defaultOptionText }}</option>
          <option
            v-for="option in options"
            :key="option.value"
            :value="option.value"
            :disabled="option.disabled"
          >
            {{ option.text }}
          </option>
        </select>
      </div>
      <span class="icon is-small is-left" v-if="iconLeft">
        <font-awesome-icon :icon="iconLeft" />
      </span>
      <span class="icon is-small is-right" v-if="iconRight">
        <font-awesome-icon :icon="iconRight" />
      </span>
    </div>
    <p v-if="error" class="help is-danger">{{ error }}</p>
    <p v-else-if="help" class="help">{{ help }}</p>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

interface Option {
  value: string | number
  text: string
  disabled?: boolean
}

defineProps({
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: [String, Number],
    required: true,
  },
  options: {
    type: Array as PropType<Option[]>,
    required: true,
    default: () => [],
  },
  required: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: undefined,
  },
  help: {
    type: String,
    default: undefined,
  },
  hasDefaultOption: {
    type: Boolean,
    default: true,
  },
  defaultOptionText: {
    type: String,
    default: 'Sélectionner une option',
  },
  iconLeft: {
    type: [String, Array],
    default: undefined,
  },
  iconRight: {
    type: [String, Array],
    default: undefined,
  },
})

defineEmits<{
  'update:modelValue': [value: string | number]
}>()
</script>
