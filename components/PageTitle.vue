<script setup lang="ts">
    import { defineProps } from 'vue'
    
    const props = defineProps<{
        title: string
    }>()

    const title = computed(() => props.title)
</script>
<template>
    <div>
        <h3>{{ title }}</h3>
    </div>
</template>