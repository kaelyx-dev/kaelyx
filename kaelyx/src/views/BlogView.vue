<template>
    <main>
        <p>Welcome to the blog!</p>
        <ul>
            <li v-for="post in useBlog().getFilteredPosts( {string: searchString, category: selectedCategory, tags: selectedTags} )" :key="post.path">
                <Button type="primary" @click="router.push(useBlog().getPostToNavigateTo(post))">
                    {{ post.title }} - {{ post.date }}
                </Button>
            </li>

        </ul>
    </main>
    <aside data-position="left">
        <TextInput 
        label="Search" 
        v-model="searchString" 
        />
        <Select 
        label="Category" 
        v-model="selectedCategory" 
        :options="useBlog().getAllCategories().map((category) => ({ label: StringUtils.capitalise(category), value: category }))" 
        dark-mode-selected-background-colour="green"
        light-mode-selected-background-colour="pink"
        />
        <PillFilter
            v-model="selectedTags"
            :options="useBlog().getAllTags().map((tag) => ({ name: StringUtils.capitalise(tag), value: tag }))"
            label="Tags"
        />
        <Button type="secondary" @click="reset">
            Reset
        </Button>
    </aside>

</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useBlog } from '@composable/useBlog'
import Button from '@/components/base/buttons/Button.vue'
import Select from '@/components/base/input/select/Select.vue'
import StringUtils from '@/utils/String'
import TextInput from '@/components/base/input/text/TextInput.vue'
import PillFilter from '@/components/base/input/pill-filter/PillFilter.vue'

const selectedCategory = ref<string | null>(null)
const searchString = ref<string>('')
const selectedTags = ref<string[]>([])

const router = useRouter()
const { getBlogPosts } = useBlog()

const reset = () => {
    selectedCategory.value = null
    searchString.value = ''
    selectedTags.value = []
}

</script>
