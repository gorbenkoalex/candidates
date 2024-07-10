<script setup lang="ts">
    import CandidatesTable from '~/components/CandidatesTable.vue';
    import PageTitle from '~/components/PageTitle.vue';

    const candidatesStore = useCandidatesStore()

    await candidatesStore.fetchCandidates()

    const candidates = computed(() => candidatesStore.candidates)
    const filteredCandidates = ref()
    const search = ref<string>('')

    const route = useRoute()

    watch(() => search.value, async () => {
      filteredCandidates.value = candidatesStore.filterCandidates(search.value)
    })

    watch(route,
      () => {
        candidatesStore.fetchCandidates()
    })
</script>

<template>
    <div>
        <PageTitle title="Candidates" />
        <div class="q-pa-md row content-center justify-between items-center">
            <div class="col-1">

                <q-btn color="secondary" label="Add" @click="() => $router.push(`/add`)" />
            </div>
            <div class="col-2">

                <q-input v-model="search" outlined label="Search" debounce="500">
                    <template #append>
                        <q-icon name="search" />
                    </template>
                </q-input>
            </div>
        </div>
        <CandidatesTable :data="filteredCandidates ? filteredCandidates : candidates" :isLoading="candidatesStore.isLoading"/>
    </div>
</template>