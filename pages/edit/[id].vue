<script setup lang="ts">
    import PageTitle from '~/components/PageTitle.vue';

    const route = useRoute()
    const candidatesStore = useCandidatesStore()
    const candidateId = route.params.id as string
    
</script>

<template>
    <div>
        <PageTitle  title="Edit" />
        <CandidateForm :candidate="candidatesStore.getCandidateById(candidateId)" action="edit" />
    </div>
</template>