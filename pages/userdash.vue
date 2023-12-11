<script setup>
import { useToast } from 'vue-toastification';
import { userDataStore } from '~/store/userData';
const toast = useToast();

const store = userDataStore();

const pending = ref(true)
const selected = ref([''])

const columns = [
    { key: 'id', label: 'Id' },
    { key: 'fname', label: 'First Name', sortable: true },
    { key: 'lname', label: 'Last Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'phone', label: 'phone' },
    { key: 'date_of_birth', label: 'DOB' },
    { key: 'gender', label: 'Gender' },
    { key: 'role', label: 'Role' },
    { key: 'actions' },
];

const fetchPeople = async () => {
    try {
        const { data } = await useApi('fetch_all_userdata', {
            method: 'GET',
        });

        if (data.value) {
            store.allUserData = data.value?.data;
            pending.value = false;
        } else {
            toast.error('Something Went Wrong');
        }
    } catch (error) {
        console.error(error);
        toast.error('Failed to fetch user data');
    }
};

// Fetch initial data
fetchPeople();

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

const toggleEdit = (row) => {
    // Implement the toggleEdit function if needed
};

const page = ref(1);
const pageCount = 10;

const currentPageItems = computed(() => {
    return store.allUserData ? store.allUserData.slice((page.value - 1) * pageCount, page.value * pageCount) : [];
});

const totalItems = computed(() => (store.allUserData ? store.allUserData.length : 0));


</script>


<template>
    <div class="overflow-x-auto">
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
    <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
        <UPagination v-model="page" :page-count="10" :total="totalItems" />
    </div>
</template>

<style scoped>
/* https://codepen.io/jenning/pen/YzNmzaV */

.loader {
    --color: rgb(var(--color-primary-400));
    --size-mid: 6vmin;
    --size-dot: 1.5vmin;
    --size-bar: 0.4vmin;
    --size-square: 3vmin;

    display: block;
    position: relative;
    width: 50%;
    display: grid;
    place-items: center;
}

.loader::before,
.loader::after {
    content: '';
    box-sizing: border-box;
    position: absolute;
}

.loader.--6::before {
    width: var(--size-square);
    height: var(--size-square);
    background-color: var(--color);
    top: calc(50% - var(--size-square));
    left: calc(50% - var(--size-square));
    animation: loader-6 2.4s cubic-bezier(0, 0, 0.24, 1.21) infinite;
}

@keyframes loader-6 {

    0%,
    100% {
        transform: none;
    }

    25% {
        transform: translateX(100%);
    }

    50% {
        transform: translateX(100%) translateY(100%);
    }

    75% {
        transform: translateY(100%);
    }
}
</style>
