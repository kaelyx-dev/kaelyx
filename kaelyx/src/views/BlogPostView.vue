<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBlog } from '@composable/useBlog'

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

onMounted(async () => {
    if (!post) {
        notFound.value = true
        loading.value = false
        return
    }
    content.value = await fetchBlogContent(post)
    loading.value = false
})
</script>

<template>
    <div>
        <button @click="router.push({ name: 'Blog' })">Back</button>

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
</template>
