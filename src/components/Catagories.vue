<script setup>
import { computed, inject } from 'vue'
import { findByCatagory } from '../composables/bookFunction'
import PhHeartFill from './icons/PhHeartFill.vue';


const theme = inject('theme')
const props = defineProps({
    title: {
        type: String,
        require: true
    },
    catagory: {
        type: String,
        require: true
    },
    books: {
        type: Array,
        require: true
    }
})
const datas = computed(() => {
    return findByCatagory(props.catagory, props.books)
})
defineEmits(['borrow','addFav'])
</script>
<template>
    <div class="pt-16 w-full container ">
        <div class="text-2xl font-semibold" :class="theme.textheader">{{ title }}</div>
        <div class="w-fit pt-6 md:grid-cols-2 lg:grid-cols-4 grid-cols-1  grid-row-2 grid">
                <div v-for="data in datas"
                    class=" m-3 w-88 grid overflow-hidden rounded-[20px] cursor-pointer hover:bg-opacity-80 hover:-translate-y-1 ease-in-out duration-300"
                    :class="theme.bgblock">
                    <RouterLink :to="{ name: 'onebook', params: { id: data.id ?? 'notfound' } }">
                        <div class="overflow-hidden w-full max-h-48 justify-center">
                            <img :src="(data.img.length < 2) ? '../default/notfound.png' : data.img"
                                class="w-fit mx-auto justify-center flex items-center">
                        </div>
                    </RouterLink>
                    <div class="m-2 font-bold text-xl w-full" :class="theme.text">{{ data.title }}</div>
                    <div class="mt-1 ml-1 flex overflow-hidden ">
                        <div v-for="catagory in data.subcatagory" class="px-2 w-fit py-1 rounded-md mx-1 whitespace-nowrap"
                            :class="theme.lable">
                            {{ catagory }}
                        </div>
                    </div>
                    <div class="flex mt-4 justify-between items-end">
                        <div class="box text-3xl h-10 w-fit rounded px-1 flex items-center ml-5 text-red-500 cursor-pointer">
                            <PhHeartFill @click="$emit('addFav', data.id)" />
                        </div>
                        <button @click="$emit('borrow', data.id)" class="box h-10 w-fit px-3 rounded font-semibold c"
                            :class="theme.button">
                            ยืมหนังสือ
                        </button>
                    </div>
            </div>
        </div>
    </div>
</template>
 
<style scoped></style>
