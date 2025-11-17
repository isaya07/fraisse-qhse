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
      <input
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        :class="['input', { 'is-danger': error }]"
        :type="type"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
      />
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
defineProps({
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: [String, Number],
    required: true,
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
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
