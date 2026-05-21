<template>
    <p>Welcome to the blog!</p>
    <p>Filter, Search, Order go here</p>
    <p>List of blog posts go here</p>
    <ul>
        <li v-for="post in posts" :key="post.path">
            <Button type="primary" @click="router.push(useBlog().getPostToNavigateTo(post))">
                {{ post.title }} - {{ post.date }}
            </Button>
        </li>
        {{ useBlog().getAllCategories() }}
        {{ useBlog().getAllTags() }}
    </ul>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useBlog } from '@composable/useBlog'
import Button from '@/components/base/buttons/Button.vue'

const router = useRouter()
const { getBlogPosts } = useBlog()

const posts = getBlogPosts()

</script>
