<template>
    <div>
        <UModal v-model="isOpen1">
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
                            Confirmation Window
                        </h3>
                        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                            @click="isOpen = false" />
                    </div>

                </template>


                <div class="flex justify-content-center">
                    <form @submit.prevent="handleRegister"
                        class="mx-auto border-2 border-black rounded-lg w-96 p-8 bg-white">
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