<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBlog } from '@composable/useBlog'
import Button from '@component/base/buttons/Button.vue';
import SvgIcon from '@component/base/icons/SvgIcon.vue';
import useDocument from '@/composables/useDocument';

const route = useRoute()
const router = useRouter()
const { fetchPostContent, getPostFromPath, getBlogPath } = useBlog()

const slug = route.params.slug as string
const category = route.params.category as string | undefined

const post = getPostFromPath(getBlogPath(category, slug))
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
    content.value = await fetchPostContent(post)
    loading.value = false

    checkScrollPosition()
    window.addEventListener('scroll', checkScrollPosition)
    useDocument().setTitle(postTitle)
})

onUnmounted(() => {
    window.removeEventListener('scroll', checkScrollPosition)
    useDocument().resetTitle()
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
    const url = globalThis.location.href
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
                        <Button @click="toggleShareModal" type="secondary" :class="['blog-post__control-button']">
                            <SvgIcon name="share" />
                        </Button>
                        <Button @click="copyLinkToClipboard" type="secondary" :class="['blog-post__control-button']">
                            <SvgIcon name="link" />
                        </Button>
                    </div>
                </div>
                <div>
                    <div>
                        {{ postDate ? `Posted: ${postDate}` : '' }}
                        {{ post?.categories?.length ? ` | Categories: ${post.categories.join(', ')}` : '' }}
                        {{ post?.tags?.length ? ` | Tags: ${post?.tags?.join(', ')}` : '' }}
                        {{ post?.readTime ? ` | Read Time: ${post?.readTime}` : '' }}
                    </div>
                    <div>                    
                        <component v-for="(vnode, index) in content" :is="vnode" :key="index" />
                    </div>
                </div>
            </div>
        </div>
        <div class="blog-post__back-control" :class="{ 'blog-post__back-control--bottom': !isAtTop }">
            <Button @click="handleBackClick" type="secondary"
                :tooltip="isAtTop ? 'Go Back' : 'Back to Top'" :class="[
                    { 'btn--rotated': !isAtTop },
                    'blog-post__control-button',
                ]">
                <SvgIcon name="arrow-back" />
            </Button>
        </div>
    </div>
</template>
