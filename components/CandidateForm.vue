<script setup lang="ts">
    import * as yup from 'yup';
    import { useForm, useFieldArray } from 'vee-validate'
    import type { Candidate } from '~/typings.d.ts'
    
    declare module 'yup' {
        interface MixedSchema {
            fileSize(maxSize: number, message?: string): MixedSchema;
        }
    }

    const props = defineProps<{
        candidate?: Candidate
        action: string
    }>()

    const route = useRoute();
    const router = useRouter();
    const candidateStore = useCandidatesStore()

    const candidate = computed(() => props.candidate)
    const action = computed(() => props.action)

    yup.addMethod<yup.MixedSchema>(yup.mixed, 'fileSize', function (maxSize, message) {
        return this.test('fileSize', message, function (value: File) {
            const { path, createError } = this;
            if (value && value.size > maxSize) {
            return createError({ path, message: message ?? `File size must be less than ${maxSize / 1024 / 1024} MB` });
            }
            return true;
        });
    });

    const schema = yup.object({
        first_name: yup.string().required().default(''),
        last_name: yup.string().required().default(''),
        email: yup.string().email().required().default(''),
        bio: yup.string().default(''),
        skills: yup.array().of(yup.string()).min(1, 'At least one skill is required').default([]),
        resume_file: yup.mixed()
            .required('A file is required')
            .fileSize(2 * 1024 * 1024, 'File size must be less than 2 MB'),
        github_url: yup.string().url().default(''),
    })

    const { defineField, handleSubmit, resetForm, errors } = useForm<Candidate>({
        validationSchema: schema,
        initialValues: {
            first_name: candidate.value?.first_name ?? '',
            last_name: candidate.value?.last_name ?? '',
            email: candidate.value?.email ?? '',
            bio: candidate.value?.bio ?? '',
            resume_file: candidate.value?.resume_file ?? '',
            github_url: candidate.value?.github_url ?? '',
            skills: candidate.value?.skills ?? []
        },
    });

    const quasarConfig = (state: { errors: string[]; }) => ({
        props: {
            error: !!state.errors[0],
            'error-message': state.errors[0],
        },
    });

    const [firstName, firstNameProps] = defineField('first_name', quasarConfig)
    const [lastName, lastNameProps] = defineField('last_name', quasarConfig)
    const [email, emailProps] = defineField('email', quasarConfig)
    const [bio, bioProps] = defineField('bio', quasarConfig)
    const {remove, push, fields} = useFieldArray('skills')
    const [resumeFile, resumeFileProps] = defineField('resume_file', quasarConfig)
    const [githubUrl, githubUrlProps] = defineField('github_url', quasarConfig)

    const onSubmit = handleSubmit(  (values) => {
      if (action.value === 'add')
        candidateStore.addCandidate(values)
      else if (action.value === 'edit') {
        candidateStore.updateCandidate(values, route.params.id as string)
      }

      router.push('/')
    })

    const removeSkill = (idx: number) => {
        remove(idx)
    }
</script>   
<template>
    <q-form style="overflow: auto; min-width: 500px; max-width: 500px;" @submit.prevent="onSubmit">
        <q-input v-model="firstName" v-bind="firstNameProps" class="col-auto" label="First Name" />
        <q-input v-model="lastName" v-bind="lastNameProps" class="col-auto" label="Last Name" />
        <q-input v-model="email" v-bind="emailProps" class="col-auto" label="Email" />
        <q-input v-model="bio" v-bind="bioProps" class="col-auto" label="Bio" />
        <q-file
            v-model="resumeFile" 
            v-bind="resumeFileProps"   
            style="max-width: 300px"
            outlined
            label="Max file size (2MB)"
            max-file-size="2000000"
      />
        <q-input v-model="githubUrl" v-bind="githubUrlProps" class="col-auto" label="GitHub URL" />
        <SkillsList v-model="fields" :error="errors['skills']" class="col-auto" label="Skills" @remove-skill="removeSkill" @add-skill="push($event)"/>
        <div class="row justify-between q-pt-lg q-pb-lg">
            <div>
                <q-btn label="Back" type="button" color="primary" @click="() => $router.push(`/`)"/>
            </div>
            <div class="row content-center justify-end items-center q-gutter-md">
            <q-btn
                type="button"
                label="Reset"
                @click="resetForm()"
            />
            <q-btn label="Submit" type="submit" color="primary"/>
        </div>
        </div>
        
    </q-form>
</template>