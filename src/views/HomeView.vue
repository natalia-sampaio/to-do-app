<script setup>
defineProps({
  content: ''
})
</script>

<template>
  <main>
    <div class="rounded bg-dark-very-dark-desaturated-blue mx-4 -mt-6 p-4">
      <input type="checkbox" class="indeterminate:bg-dark-very-dark-desaturated-blue checkbox checkbox-xs" aria-label="checkbox">
      <label class="bg-dark-very-dark-desaturated-blue text-dark-dark-grayish-blue pl-2">{{ content }}</label>
    </div>
  </main>
</template>
