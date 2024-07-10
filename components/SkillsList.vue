<script setup lang="ts">
    import type { Ref } from 'vue'
    const fields = defineModel<Ref[]>();

    const props = defineProps<{
        error?: string
    }>()

    const emit = defineEmits<{
        removeSkill: [id: number]
        addSkill: [value: string]
    }>()

    const error = computed(() => props.error)
    const inputRef = ref('')

    const isError = ref(false)

    watch(() => error.value, (value) => {
        isError.value = !!value
    })
    
</script>

<template>
    <div class="skills-grid" rounded-borders>
        <div class="skills-grid-item-title">
            Skills
        </div>
        <div class="skills-grid-item-list">
            <template v-for="(field, idx) in fields" :key="field.key">
                <q-chip tabindex="field.value" removable size="sm" @remove="emit('removeSkill', idx)">
                {{ field.value }}
            </q-chip>
            </template>

        </div>
        <div class="skills-grid-item-input">
            <q-input v-model="inputRef" :autofocus="false" :bottom-slots="isError" :error="isError" :no-error-icon="!isError" :error-message="error">
                <template #after>
                    <q-btn icon="add" flat @click="emit('addSkill', inputRef), inputRef = ''" />
                </template>
                <template #error>
                    {{ error }}
                    <q-icon name="error" />
                </template>
            </q-input>    
        </div>
    </div>
</template>
  
<style scoped>
    .skills-grid {
        display: grid;
        grid-template-columns: 50px 1fr;
        grid-template-areas: 
            "title list list"
            "title input input";
    }

    .skills-grid-item-title {
        grid-area: title;
        justify-self: start;
        font-family: "Roboto", "-apple-system", "Helvetica Neue", Helvetica, Arial, sans-serif;
        color: rgba(0, 0, 0, 0.6);
        font-size: 16px;
        line-height: 20px;
        font-weight: 400;
        letter-spacing: 0.00937em;
        text-decoration: inherit;
        text-transform: inherit;
    }

    .skills-grid-item-list {
        grid-area: list;
    }

    .skills-grid-item-input {
        grid-area: input;
    }
</style>