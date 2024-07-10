import type {Candidate} from "~/typings.d.ts";
import {uploadFile} from "~/firebase/firebase";

export const useCandidatesStore = defineStore('candidates', {
    state: () => ({
        candidates: [] as Candidate[],
        isLoading: false,
    }),
    actions: {
        async fetchCandidates() {
            this.isLoading = true;
            this.candidates = [];
            const data = await $fetch('/api/all');
            this.candidates = data ?? [];
            this.isLoading = false;
        },

        async addCandidate(candidate: any) {
            this.isLoading = true;
            candidate.resume_file = await uploadFile(candidate.resume_file);

            await $fetch('/api/add', { body: candidate, method: 'POST'})
            await this.fetchCandidates();
            this.isLoading = false;
        },

        async updateCandidate(candidate: any, id: string) {
            this.isLoading = true;
            candidate.resume_file = await uploadFile(candidate.resume_file);
            candidate.id = id;

            await $fetch('/api/edit', { body: candidate, method: 'POST'})
            await this.fetchCandidates();
            this.isLoading = false;
        }
    },
    getters: {
        getCandidateById: (state) =>
            (id: number | string) => state.candidates.find((candidate) => {
                return candidate.id === id
            }),

        filterCandidates: (state) =>
            (search: string) => state.candidates.filter((candidate) => {
                const searchLower = search.toLowerCase();
                return candidate.first_name.toLowerCase().includes(searchLower) ||
                    candidate.last_name.toLowerCase().includes(searchLower) ||
                    candidate.email.toLowerCase().includes(searchLower) ||
                    candidate.bio.toLowerCase().includes(searchLower) ||
                    candidate.skills.join(', ').toLowerCase().includes(searchLower);
            }),
    },
});

