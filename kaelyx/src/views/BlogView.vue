<template>
    <p>Welcome to the blog!</p>
    <p>Filter, Search, Order go here</p>
    <p>List of blog posts go here</p>
    <ul>
        <li v-for="post in posts" :key="post.path">
            <button @click="router.push({ name: 'BlogPost', params: { slug: getSlug(post) } })">
                {{ post.title }} - {{ post.date }}
            </button>
        </li>
    </ul>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useBlog } from '@composable/useBlog'

const router = useRouter()
const { getBlogPosts, getSlug } = useBlog()

const posts = getBlogPosts()

</script>
