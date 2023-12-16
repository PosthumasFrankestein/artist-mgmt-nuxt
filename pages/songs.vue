<script setup>
import { userDataStore } from '~/store/userData';

import { useToast } from 'vue-toastification';
const toast = useToast();

const store = userDataStore();

const pending = ref(true)
const selected = ref([''])
const isOpen = ref(false)
const isOpen1 = ref(false)
const isOpen2 = ref(false)

const selectedRow = ref(null);
const genre = ref('')
const album = ref('')
const title = ref('')

if (!store.token) {
    navigateTo('/')
}

const columns = [
    { key: 'id', label: 'Id' },
    { key: 'title', label: 'Title', sortable: true },
    { key: 'album', label: 'Album Name', sortable: true },
    { key: 'genre', label: 'Genre', sortable: true },
    { key: 'artist_name', label: 'Artist' },
    { key: 'actions' },
];

const fetchSongs = async () => {
    try {
        const { data } = await useApi('fetch_all_song', {
            method: 'POST',
            body: {
                "id": store.artistId
            }
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
fetchSongs();

const deleteSong = async () => {
    try {
        const { data } = await useApi('deleteSong', {
            method: 'PUT',
            body: {
                'musicId': selectedRow.value.id,
            },
        });

        if (data.value) {
            // store.allUserData = data.value?.data;
            toast.success('Song Deleted');
            isOpen1.value = false;
            fetchSongs();
        } else {
            toast.error('Something Went Wrong');
        }
    } catch (error) {
        console.error(error);
        toast.error('Failed to fetch user data');
    }
};

const addSong = async () => {
    const submit_data = {
        artist: store.artistId,
        album: album.value,
        genre: genre.value,
        title: title.value,
        signature: "insert",
    }

    try {
        const { data } = await useApi('save_song', {
            method: 'POST',
            body: submit_data
            ,
        });

        if (data.value) {
            // store.allUserData = data.value?.data;
            toast.success('Song Added.');
            isOpen2.value = false;
            fetchSongs();
        } else {
            toast.error('Something Went Wrong');
        }
    } catch (error) {
        console.error(error);
        toast.error('Failed to fetch user data');
    }
};

const updateSong = async () => {
    const submit_data = {
        artist: store.artistId,
        album: selectedRow.value.album,
        genre: selectedRow.value.genre,
        title: selectedRow.value.title,
        music_id: selectedRow.value.id,
        signature: "update",
    }

    try {
        const { data } = await useApi('save_song', {
            method: 'POST',
            body: submit_data
            ,
        });

        if (data.value) {
            // store.allUserData = data.value?.data;
            toast.success('Song Updated.');
            isOpen.value = false;
            fetchSongs();
        } else {
            toast.error('Something Went Wrong');
        }
    } catch (error) {
        console.error(error);
        toast.error('Failed to fetch user data');
    }
};

const items = (row) =>
    [
        [
            {
                label: 'Edit',
                icon: 'i-heroicons-pencil-square-20-solid',
                click: () => toggleEdit(row)
            },
        ],
        [{
            label: 'Delete', icon: 'i-heroicons-trash-20-solid',
            click: () => deleteRow(row)
        }]
    ];

const toggleEdit = (row) => {
    isOpen.value = true;
    selectedRow.value = row;
    console.log(selectedRow.value)
};

const deleteRow = (row) => {
    isOpen1.value = true;
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
        <div v-if="store.token && store?.userData?.role === 'artist'">
            <UButton label="Add Songs" @click="isOpen2 = true" />
        </div>
        <UTable v-model="selected" :rows="currentPageItems" :columns="columns" :loading="pending">
            <template #loading-state>
                <div class="flex items-center justify-center h-32">
                    <i class="loader --6" />
                </div>
            </template>
            <template #empty-state v-if="store.token && store?.userData?.role === 'artist'">
                <div class="flex flex-col items-center justify-center py-6 gap-3">
                    <span class="italic text-sm">No Songs!</span>
                    <UButton label="Add Songs" @click="isOpen2 = true" />
                </div>
            </template>

            <template #name-data="{ row }">
                <span
                    :class="[selected.find(person => person.id === row.id) && 'text-primary-500 dark:text-primary-400']">{{
                        row.name }}</span>
            </template>

            <template #actions-data="{ row }">
                <UDropdown :items="items(row)"
                    :class="{ 'class-name': store.token && store?.userData?.role === 'artist', 'hide_class': store.token && store?.userData?.role !== 'artist' }">
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
            }
                ">
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
                            <input type="text" class="w-full p-2 border border-gray-300 rounded" placeholder="Title"
                                v-model="selectedRow.title" required />
                        </div>
                        <div class="mb-3">
                            <input type="text" class="w-full p-2 border border-gray-300 rounded" placeholder="Album"
                                v-model="selectedRow.album" required />
                        </div>
                        <div class="mb-3">
                            <label for="gender" class="block text-sm font-medium text-gray-700">Genre</label>
                            <select id="gender" class="w-full p-2 border border-gray-300 rounded"
                                v-model="selectedRow.genre" required>
                                <option value="">Select genre</option>
                                <option value="rnb">rnb</option>
                                <option value="country">country</option>
                                <option value="classical">classical</option>
                                <option value="rock">rock</option>
                                <option value="jazz">jazz</option>
                            </select>
                        </div>
                        <div class="flex items-center justify-end space-x-2">
                            <UButton color="green" @click="updateSong(row)">Save Changes</UButton>
                            <UButton color="red" @click="isOpen = false">Cancel</UButton>
                        </div>
                    </form>
                </div>
            </UCard>
        </UModal>
    </div>

    <div>
        <UModal v-model="isOpen2">
            <UCard :ui="{
                base: 'h-full flex flex-col',
                rounded: '',
                divide: 'divide-y divide-gray-100 dark:divide-gray-800',
                body: {
                    base: 'grow'
                }
            }
                ">
                <template #header>
                    <div class="flex items-center justify-between">
                        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                            Edit User
                        </h3>
                        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                            @click="isOpen2 = false" />
                    </div>

                </template>


                <div class="flex justify-content-center">
                    <form @submit.prevent="handleRegister"
                        class="mx-auto border-2 border-black rounded-lg w-96 p-8 bg-white">

                        <div class="mb-3">
                            <input type="text" class="w-full p-2 border border-gray-300 rounded" placeholder="Title"
                                v-model="title" required />
                        </div>
                        <div class="mb-3">
                            <input type="text" class="w-full p-2 border border-gray-300 rounded" placeholder="Album"
                                v-model="album" required />
                        </div>
                        <div class="mb-3">
                            <label for="genre" class="block text-sm font-medium text-gray-700">Genre</label>
                            <select id="genre" class="w-full p-2 border border-gray-300 rounded" v-model="genre" required>
                                <option value="">Select genre</option>
                                <option value="rnb">rnb</option>
                                <option value="country">country</option>
                                <option value="classical">classical</option>
                                <option value="rock">rock</option>
                                <option value="jazz">jazz</option>
                            </select>
                        </div>
                        <div class="flex items-center justify-end space-x-2">
                            <UButton color="green" @click="addSong(row)">Add Song</UButton>
                            <UButton color="red" @click="isOpen2 = false">Cancel</UButton>
                        </div>
                    </form>
                </div>
            </UCard>
        </UModal>
    </div>

    <div>
        <UModal v-model="isOpen1">
            <UCard :ui="{
                base: 'h-full flex flex-col',
                rounded: '',
                divide: 'divide-y divide-gray-100 dark:divide-gray-800',
                body: {
                    base: 'grow'
                }
            }
                ">
                <template #header>
                    <div class="flex items-center justify-between">
                        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                            Are you sure you want to delete?
                        </h3>
                        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                            @click="isOpen1 = false" />
                    </div>

                </template>


                <div class="flex justify-content-center">
                    <div class="flex items-center justify-end space-x-2">
                        <UButton color="green" @click="deleteSong(row)">Confirm</UButton>
                        <UButton color="red" @click="isOpen1 = false">Cancel</UButton>
                    </div>
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

.hide_class {
    display: none;
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
