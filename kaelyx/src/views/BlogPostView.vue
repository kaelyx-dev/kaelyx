<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
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
    if (window.scrollY == 0) isAtTop.value = true
    else isAtTop.value = false
}

onMounted(async () => {
    if (!post) {
        notFound.value = true
        loading.value = false
        return
    }
    content.value = await fetchBlogContent(post)
    loading.value = false

    checkScrollPosition()
    window.addEventListener('scroll', checkScrollPosition)
})

onUnmounted(() => {
    window.removeEventListener('scroll', checkScrollPosition)
})


const handleBackClick = () => {
    if (isAtTop.value) {
        router.push({ name: 'Blog' })
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
}

const isShareModalDisplayed = ref(false)
const toggleShareModal = () => {
    isShareModalDisplayed.value = !isShareModalDisplayed.value
}

const copyLinkToClipboard = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url)
        .then(() => {
            alert('Link copied to clipboard!')
        })
        .catch(err => {
            console.error('Failed to copy link: ', err)
        })
}

</script>

<template>
    <div class="blog-post__wrapper">
        <div class="blog-post__content">
            <div v-if="notFound">
                <p>Post not found.</p>
            </div>
            <div v-else-if="loading">
                <p>Loading...</p>
            </div>
            <div v-else>
                <div style="display: flex;">
                    <h1>{{ postTitle }}</h1>
                    <div class="blog-post__actions">
                        <Button @click="toggleShareModal" background-colour="orange" text-colour="white" :class="['blog-post__control-button']">
                            <SvgIcon name="share" />
                        </Button>
                        <Button @click="copyLinkToClipboard" background-colour="orange" text-colour="white" :class="['blog-post__control-button']">
                            <SvgIcon name="link" />
                        </Button>
                    </div>
                </div>
                <p>{{ postDate }}</p>
                <pre>{{ content }}</pre>
            </div>
        </div>
        <div class="blog-post__back-control" :class="{ 'blog-post__back-control--bottom': !isAtTop }">
            <Button @click="handleBackClick" background-colour="orange" text-colour="white"
                :tooltip="isAtTop ? 'Go Back' : 'Back to Top'" :class="[
                    { 'btn--rotated': !isAtTop },
                    'blog-post__control-button',
                ]">
                <SvgIcon name="arrow-back" />
            </Button>
        </div>
    </div>
</template>
