<script setup>
import { ref, onMounted, inject, onUpdated } from 'vue';
const emits = defineEmits(['createPost'])
const theme = inject('theme')
const props = defineProps(['post', 'isUpdate'])
const vs = ref(1)
const imgUrl = ref(null)
const title = ref(null)
const description = ref(null)
const customUrl = ref(null)
const isPublic = ref(true)
const isAdvance = ref(false)
const post = ref(null)

const po = ref(null)
const img = ref(null)
const titles = ref(null)
const desc = ref(null)
const custom = ref(null)
const vstyping =ref(null)


const postEdit = ref({
    id: customUrl.value == null ? null : customUrl.value,
    title: title.value,
    description: description.value,
    img: imgUrl.value,
    visible: isPublic.value ? 1 : 2
})

const mapInput = () => {
    if (props.post !== undefined) {
        customUrl.value = props.post.id
        title.value = props.post.title
        description.value = props.post.description
        isPublic.value = props.post.visible == 1
        imgUrl.value = props.post.img
    }
}

onMounted(() => {
    titles.value.focus()
    post.value = props.post
    mapInput()
})

onUpdated(() => {
    postEdit.value = {
        id: customUrl.value == null ? null : customUrl.value,
        title: title.value,
        description: description.value,
        img: imgUrl.value,
        visible: isPublic.value ? 1 : 2
    }
})

</script>
<template>
    
    <div class="flex flex-col m-5 z-10">
        <h1 class=" font-bold lg:text-4xl text-3xl pt-16" :class="theme.textheader">{{ isUpdate ? 'แก้ไขโพสต์' : 'สร้างโพสต์ใหม่' }} </h1>
        <div class="flex flex-col lg:flex-row mt-5 h-24 lg:h-12">
            <div class="text-lg font-bold px-2 pt-2 w-48 mb-1" :class="theme.text">Title*</div>
            <input ref="titles" type="text" v-model="title" placeholder="Enter post title..." class="w-full rounded-lg h-12 pl-5" :class="theme.input" @keyup.enter="desc.focus()">
        </div>
        <div class="flex flex-col lg:flex-row mt-3 h-min">
            <div class="text-lg font-bold px-2 pt-2 w-48 mb-1"  :class="theme.text">Description*</div>
            <textarea ref="desc" type="text" class="w-full rounded-lg pl-5 pt-2 h-48" placeholder="Enter post description..." v-model="description " 
            @keyup.enter="img.focus()"
                :class="theme.input"></textarea>
        </div>
        <div class="flex flex-col lg:flex-row mt-5 h-24 lg:h-12">
            <div class="text-lg font-bold px-2 pt-2 w-48 mb-1"  :class="theme.text">Image URL*</div>
            <input ref="img" type="url" v-model="imgUrl" placeholder="Enter post images..." class="w-full rounded-lg h-12 pl-5" :class="theme.input" 
            @keyup.enter="isAdvance === false ? $emit('createPost', postEdit, isUpdate) : custom.focus()">
        </div>
        <hr class="opacity-30 mt-5">
        <div v-if="isAdvance">
            <div class="flex flex-col lg:flex-row mt-5 h-24 lg:h-12">
                <div class="text-lg font-bold px-2 pt-2 w-48 mb-1" :class="theme.text">Custom URLs post</div>
                <input ref="custom" type="url" v-model="customUrl" class="w-full rounded-lg h-12 pl-5" placeholder="[If you not type anything system can generate auto]" :class="theme.input"
                    :disabled="isUpdate" @keyup.enter="isAdvance === false ? $emit('createPost', postEdit, isUpdate) : vstyping.focus()">
            </div>
            <div class="flex flex-col md:flex-row mt-3 w-full">
                <input type="text" ref="vstyping" class="w-0" @keyup.left="isPublic = !isPublic" @keyup.right="isPublic = !isPublic" @keyup.enter="$emit('createPost', postEdit, isUpdate) " @keyup.up="custom.focus()">
                <div class="text-xl font-bold px-2 pt-2 w-48 mb-1" :class="theme.text">Visible Status</div>
                <div class="flex w-full">
                    <label  for="vs_public" class="text-xl mr-5 pt-2 px-3 rounded-lg w-fit"
                        :style="isPublic ? 'border-color: yellow; border-width: 2px;' : ''" @click="isPublic = true" 
                        :class="theme.input" >PUBLIC</label>
                    <label  for="vs_private" class="text-xl pt-2 px-3 rounded-lg"
                        :style="isPublic ? '' : 'border-color: yellow; border-width: 2px;'" @click="isPublic = false" 
                        :class="theme.input">MEMBER</label>
                        <div class="text-md px-2 pt-2 w-full" :class="theme.text">* {{ isPublic?'All User can see':'Only member who logged in can see.' }}</div>
                    <input type="radio" id="vs_public" value="1" class="hidden" v-model="vs" :class="theme.input" >
                    <input type="radio" id="vs_private" value="2" class="hidden" v-model="vs" :class="theme.input" >
                </div>
            </div>
        </div>
        <div class="flex justify-center">
            <div class="w-fit text-center mt-8 px-16 border-2 p-2 rounded-full font-bold cursor-pointer"
                :class="theme.primarybutton" @click="isAdvance = !isAdvance">{{ isAdvance ? 'Hide' : 'Show' }} Advance
                Option</div>
        </div>
        <div class="flex mt-8 justify-end cursor-pointer">
            <button ref="po" class="px-8 py-3 rounded-lg text-2xl cursor-pointer hover:drop-shadow-xl z-20"
                @click="$emit('createPost', postEdit, isUpdate)" :class="theme.primarybutton" >
                {{ isUpdate ? 'Save Change' : 'Create now'}}</button>
        </div>
    </div>
</template>
<style></style>