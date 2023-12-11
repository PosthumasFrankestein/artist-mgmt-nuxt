<template>
    <div class="overflow-x-auto">
        <UTable v-model="selected" :rows="currentPageItems" :columns="columns">
            <template #name-data="{ row }">
                <span :class="[
                    selected.find(person => person.id === row.id) &&
                    'text-primary-500 dark:text-primary-400',
                ]" class="sm:block md:inline lg:inline xl:inline">{{ row.fname }}</span>
            </template>

            <template #actions-data="{ row }">
                <UDropdown :items="items(row)">
                    <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                </UDropdown>
            </template>
        </UTable>
    </div>
    <div>{{ people.length }}</div>
    <UPagination v-model="currentPage" :page-count="5" :total="people.length" />
</template>
  
<script setup>
import { ref, watch, computed } from 'vue';

const columns = [
    { key: 'fname', label: 'First Name' },
    { key: 'lname', label: 'Last Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Title' },
    { key: 'dob', label: 'DOB' },
    { key: 'gender', label: 'Gender' },
    { key: 'role', label: 'Role' },
    { key: 'actions' },
];

const people = Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    fname: `Person${index + 1}`,
    lname: 'Doe',
    email: `person${index + 1}@example.com`,
    phone: 'Developer',
    dob: '1990-01-01',
    gender: index % 2 === 0 ? 'Male' : 'Female',
    role: index % 3 === 0 ? 'Admin' : 'Member',
}));

const items = (row) => [
    [
        { label: 'Edit', icon: 'i-heroicons-pencil-square-20-solid', click: () => console.log('Edit', row.id) },
    ],
    [{ label: 'Delete', icon: 'i-heroicons-trash-20-solid' }],
];

const pageSize = 5; // desired items per page

// const pageCount = Math.ceil(people.length / pageSize);

const selected = ref([]);

const currentPage = ref(1); // current page index

watch(currentPage, () => {
    selected.value = []; // clear selection on page change
});

const currentPageItems = computed(() => {
    const offset = (currentPage.value - 1) * pageSize;
    return people.slice(offset, offset + pageSize);
});
</script>
  