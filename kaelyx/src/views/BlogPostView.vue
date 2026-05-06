<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBlog } from '@composable/useBlog'
import Button from '@component/base/buttons/Button.vue';
import SvgIcon from '@component/base/icons/SvgIcon.vue';

const route = useRoute()
const router = useRouter()
const { getBlogPostBySlug, fetchBlogContent } = useBlog()

const slug = route.params.slug as string
const post = getBlogPostBySlug(slug)
const postTitle = post?.title ?? ''
const postDate = post?.date ?? ''

const content = ref<string>('')
const loading = ref(true)
const notFound = ref(false)

const isAtTop = ref(true)

const checkScrollPosition = () => {
    if(window.scrollY == 0) {
        console.log('Scrolled to top')
        isAtTop.value = true
    }
    else {
        console.log('Not at top')
        isAtTop.value = false
    }
}
window.addEventListener('scroll', checkScrollPosition)
onMounted(async () => {
    if (!post) {
        notFound.value = true
        loading.value = false
        return
    }
    content.value = await fetchBlogContent(post)
    loading.value = false

    checkScrollPosition()
})


const handleBackClick = () => {
    if (isAtTop.value) {
        router.push({ name: 'Blog' })
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
}


</script>

<template>
    <div>
        <Button @click="handleBackClick" background-colour="orange" text-colour="white" 
        :class="{'btn--rotated' : !isAtTop}"
        :style="{
            position: 'fixed', 
            bottom: '1rem', right: '1rem', 
            zIndex: 1000 }">
            <SvgIcon
                name="arrow-back"
            />
        </Button>

        <div v-if="notFound">
            <p>Post not found.</p>
        </div>
        <div v-else-if="loading">
            <p>Loading...</p>
        </div>
        <div v-else>
            <h1>{{ postTitle }}</h1>
            <p>{{ postDate }}</p>
            <pre>{{ content }}</pre>
        </div>
    </div>
    <p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p>
</template>
