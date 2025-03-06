<template>
<v-container color="#2c1038" class="d-flex justify-center">
    <v-row 
        position="fixed"
        class="position-fixed right-0 bottom-0"
    >
        <v-btn 
            class="mr-6 mb-6"
            icon="mdi-plus"
            @click="creatingPost = true"
        />
    </v-row>
    <div
        v-if="posts.length > 0"
        class="d-flex justify-center w-75"
    >
        <v-sheet
            width="100%"
            color="primary"
            class="px-1 pb-1"
            rounded
        >
            <div
                v-for="post in posts"
                :key="post.id"
                class="d-flex justify-center pt-1"
            >
                <BlogPostCard v-model="post.id"/>
            </div>
        </v-sheet>
    </div>
    <v-row v-else class="align-center" height="100%">
        <v-col cols="12" class="text-center">
            Nothing here! Make a post by clicking the plus in the bottom-right.
        </v-col>
    </v-row>
    <v-dialog v-model="creatingPost">
        <CreatePost @close="creatingPost = false"/>
    </v-dialog>
</v-container>
</template>
<script setup lang="ts">
import { usePostStore } from '@/stores/posts';
import { computed } from 'vue';
// TODO rename blog post
import BlogPostCard from '@c/BlogPost.vue';

const store = usePostStore();

const posts = computed(() => store.getPosts());
const creatingPost = ref(false);

store.load();
</script>