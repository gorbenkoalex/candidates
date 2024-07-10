<script setup lang="ts">
    import type { Candidate } from '~/typings'
    import { QTable } from 'quasar'

    import type { QTableProps } from 'quasar'

    const compProps = defineProps<{
      data: Candidate[]
      isLoading?: boolean
    }>()

    const data = computed(() => compProps.data)

    const columns: QTableProps['columns'] = [
        {
            name: "first_name",
            label: "First Name",
            field: "first_name", 
        },{
            name: "last_name",
            label: "Last Name",
            field: "last_name", 
        },{
            name: "email",
            label: "Email",
            field: "email", 
        },{
            name: "bio",
            label: "Bio",
            field: "bio", 
        },{
            name: "skills",
            label: "Skills",
            field: "skills", 
            format: (val: string[]) => val.join(', ')
        },{
            name: "resume_file",
            label: "Resume File",
            field: "resume_file", 
        },{
            name: "github_url",
            label: "Git Hub URL",
            field: "github_url", 
        },
        {
            name: "actions",
            label: "Actions",
            field: "actions",
            align: "center",
        }
    ]
</script>

<template>
    <q-table
      flat 
      bordered
      title="Candidates"
      :rows="data"
      :columns="columns"
      row-key="name"
      :loading="compProps.isLoading"
    >
        <template #body-cell-github_url="props">
            <q-td :props="props">
                <a :href="props.row.github_url" target="_blank">
                    {{ props.row.github_url }}
                </a>
            </q-td>
        </template>
      <template #body-cell-resume_file="props">
        <q-td :props="props">
          <q-btn :href="props.row.resume_file" target="_blank" color="secondary" round icon="cloud_download"/>
        </q-td>
      </template>
        <template #body-cell-actions="props">
            <q-td :props="props">
                <q-btn
                    flat
                    dense
                    round
                    icon="edit"
                    @click="() => $router.push(`/edit/${props.row.id}`)"
                />
            </q-td>
        </template>
      <template #no-data>
        <div class="q-mx-auto q-my-auto q-pa-md text-h6">No candidates found</div>
      </template>
    </q-table>
</template>