<script setup>
import { userDataStore } from '~/store/userData';

import { useToast } from 'vue-toastification';
const toast = useToast();

const store = userDataStore();

const pending = ref(true)
const selected = ref([''])
const isOpen = ref(false)
const selectedRow = ref(null);


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
            pending.value = false;
            toast.error('Something Went Wrong');
        }
    } catch (error) {
        console.error(error);
        pending.value = false;
        toast.error('Failed to fetch user data');
    }
};

// Fetch initial data
fetchPeople();

const items = (row) =>
    [
        [
            {
                label: 'Edit',
                icon: 'i-heroicons-pencil-square-20-solid',
                click: () => toggleEdit(row)
                //isOpen.value = true,
            },
        ],
        [{ label: 'Delete', icon: 'i-heroicons-trash-20-solid' }],
    ];

const toggleEdit = (row) => {
    isOpen.value = true;
    selectedRow.value = row;
};

const page = ref(1);
const pageCount = 10;

const currentPageItems = computed(() => {
    return store.allUserData ? store.allUserData.slice((page.value - 1) * pageCount, page.value * pageCount) : [];
});

const totalItems = computed(() => (store.allUserData ? store.allUserData.length : 0));

const getCurrentDate = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth() + 1 // months are 0-indexed
    const day = today.getDate()

    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
}

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
                <span
                    :class="[selected.find(person => person.id === row.id) && 'text-primary-500 dark:text-primary-400']">{{
                        row.name }}</span>
            </template>

            <template #actions-data="{ row }">
                <UDropdown :items="items(row)">
                    <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                </UDropdown>
            </template>
        </UTable>
    </div>

    <div>
        <UPagination class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700" v-model="page"
            :page-count="10" :total="totalItems" />
    </div>

    <div>
        <UModal v-model="isOpen">
            <UCard :ui="{
                base: 'h-full flex flex-col',
                rounded: '',
                divide: 'divide-y divide-gray-100 dark:divide-gray-800',
                body: {
                    base: 'grow'
                }
            }">
                <template #header>
                    <div class="flex items-center justify-between">
                        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                            Edit User
                        </h3>
                        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                            @click="isOpen = false" />
                    </div>

                </template>


                <div class="flex justify-content-center">
                    <form @submit.prevent="handleRegister"
                        class="mx-auto border-2 border-black rounded-lg w-96 p-8 bg-white">

                        <div class="mb-3">
                            <input type="text" class="w-full p-2 border border-gray-300 rounded" v-model="selectedRow.fname"
                                required />
                        </div>
                        <div class="mb-3">
                            <input type="text" class="w-full p-2 border border-gray-300 rounded" v-model="selectedRow.lname"
                                required />
                        </div>
                        <div class="mb-3">
                            <input type="email" class="w-full p-2 border border-gray-300 rounded"
                                v-model="selectedRow.email" required autocomplete="off" />
                        </div>
                        <div class="mb-3">
                            <input type="number" class="w-full p-2 border border-gray-300 rounded"
                                v-model="selectedRow.phone" required />
                        </div>
                        <div class="mb-3">
                            <label for="date_of_birth" class="block text-sm font-medium text-gray-700">Date of
                                Birth</label>
                            <input type="date" id="date_of_birth" class="w-full p-2 border border-gray-300 rounded"
                                :max="getCurrentDate()" required />
                        </div>
                        <div class="mb-3">
                            <label for="gender" class="block text-sm font-medium text-gray-700">Gender</label>
                            <select id="gender" class="w-full p-2 border border-gray-300 rounded" required>
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <input type="text" class="w-full p-2 border border-gray-300 rounded"
                                v-model="selectedRow.address" required />
                        </div>
                        <div class="flex items-center justify-end space-x-2">
                            <UButton color="green">Save Changes</UButton>
                            <UButton color="red" @click="isOpen = false">Cancel</UButton>
                        </div>
                    </form>


                </div>
            </UCard>
        </UModal>
    </div>
</template>

<style scoped>
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
