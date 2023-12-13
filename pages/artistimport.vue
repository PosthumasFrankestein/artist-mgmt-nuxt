<template>
    <div>
        <input v-if="csvData.length === 0" type="file" @change="handleFileUpload" />
    </div>
    <div class="overflow-x-auto" v-if="csvData.length != 0">
        <UButton icon="i-heroicons-arrow-up-tray-20-solid" size="sm" color="blue" variant="solid" label="Upload"
            :trailing="false" @click="uploadToTable()" />
        <UButton icon="i-heroicons-trash-20-solid" size="sm" color="red" variant="solid" label="Dalete" :trailing="false"
            @click="deletefromrow()" />
        <UTable v-model="selected" :rows="currentPageItems" :columns="columns" :loading="pending">
            <template #loading-state>
                <div class="flex items-center justify-center h-32">
                    <i class="loader --6" />
                </div>
            </template>

            <template #name-data="{ row }">
                <span :class="[
                    selected.find(person => person.id === row.id) &&
                    'text-primary-500 dark:text-primary-400',
                ]" class="sm:block md:inline lg:inline xl:inline" v-if="!row.editable" @click="toggleEdit(row)">
                    {{ row.name }}
                </span>
                <input v-model="row.name" v-else />
            </template>

            <template #actions-data="{ row }">
                <UDropdown :items="items(row)">
                    <UButton @click="toggleEdit(row)" color="gray" variant="ghost"
                        icon="i-heroicons-ellipsis-horizontal-20-solid" />
                </UDropdown>
            </template>
        </UTable>
    </div>

    <div>
        <UPagination class=" flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700" v-model="page"
            :page-count="10" :total="csvData.length" />
    </div>
</template>

  
<script setup>
import Papa from 'papaparse';
import { userDataStore } from '~/store/userData';

import { useToast } from 'vue-toastification';
const toast = useToast();

const csvData = ref([]);
const totalItems = ref(0);
const page = ref(1);
const pageCount = 10;
const pending = ref(true);
const selected = ref([''])
const sucessRec = ref([''])
const failRec = ref([''])

const columns =
    [
        { key: 'name', label: 'Name', sortable: true },
        { key: 'dob', label: 'DOB', sortable: true },
        { key: 'gender', label: 'Gender' },
        { key: 'address', label: 'Address' },
        { key: 'email', label: 'Email', sortable: true },
        { key: 'phone', label: 'phone' },
        { key: 'first_release_year', label: 'First_release_year' },
        { key: 'no_of_albums_released', label: 'No_of_albums_released' },
    ];

function handleFileUpload(event) {
    const file = event.target.files[0];

    Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: (result) => {
            csvData.value = result.data;
            totalItems.value = result.data.length;
            pending.value = false;
        },
        error: (error) => {
            console.error('Error parsing CSV:', error);
        },
    });
}

const items = (row) => [
    [
        {
            label: 'Edit',
            icon: 'i-heroicons-pencil-square-20-solid',
            click: () => toggleEdit(row),
        },
    ],
    [{ label: 'Delete', icon: 'i-heroicons-trash-20-solid' }],
];

const currentPageItems = computed(() => {
    return csvData.value ? csvData.value.slice((page.value - 1) * pageCount, page.value * pageCount) : [];
});

function deletefromrow() {
    selected.value.forEach((selectedRow) => {
        const index = currentPageItems.value.findIndex((item) => item === selectedRow);
        if (index !== -1) {
            currentPageItems.value.splice(index, 1);
            csvData.value.splice(index, 1);
        }
    });
    // Clear the selected array after deletion
    selected.value = [];
}


const uploadToTable = async () => {
    try {
        const { data } = await useApi('bulkInsert', {
            method: 'PUT',
            body: {
                selectedRows: selected.value.slice(1),
            },
        });

        if (data.value?.status) {
            toast.success('Bulk Insert Successful');
            selected.value = [];
        } else {
            toast.error('Bulk Insert Failed. Some records may not have been inserted.');
        }
        sucessRec.value = data.value?.success_records
    } catch (error) {
        console.error('Error during bulk insert:', error);
        toast.error('An error occurred during bulk insert.');
        sucessRec.value = error.value.success_records
    }
    sucessRec.value.forEach((selectedRow) => {
        const index = currentPageItems.value.findIndex((item) => item === selectedRow);
        if (index !== -1) {
            currentPageItems.value.splice(index, 1);
            csvData.value.splice(index, 1);
        }
    });

};

</script>