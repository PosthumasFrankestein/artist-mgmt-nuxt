<!-- 
<template>
    <div>
        <input type="file" @change="handleFileUpload" />
        <ul>
            <li v-for="(row, index) in csvData" :key="index">
                {{ row }}
            </li>
        </ul>
    </div>
</template> -->

<template>
    <div>
        <input type="file" @change="handleFileUpload" />
    </div>
    <div class="overflow-x-auto">
        <UTable v-model="selected" :rows="csvData" :columns="columns" :loading="pending">
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
                    {{ row.fname }}
                </span>
                <input v-model="row.fname" v-else />
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
        <UPagination class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700" v-model="page"
            :page-count="10" :total="totalItems" />
    </div>
</template>
  
<script>
import Papa from 'papaparse';

export default {
    data() {
        return {
            csvData: [],
            totalItems: ref(''), // Use ref for reactive property
        };
    },
    methods: {
        handleFileUpload(event) {
            const file = event.target.files[0];

            Papa.parse(file, {
                header: true,
                dynamicTyping: true,
                complete: (result) => {
                    this.csvData = result.data;
                    this.totalItems.value = result.data.length; // Corrected typo in totalItems

                    // Move currentPageItems to a reactive computed property
                    // You might need to define page and pageCount somewhere in your data
                    this.currentPageItems = computed(() => {
                        return result.data ? result.data.slice((this.page - 1) * this.pageCount, this.page * this.pageCount) : [];
                    });
                },
                error: (error) => {
                    console.error('Error parsing CSV:', error);
                },
            });
        },
    },
};
</script>
  