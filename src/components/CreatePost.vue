<template>
<div class="d-flex justify-center">
    <v-sheet class="pa-4" width="70%">
        <v-form
            v-model="isValid" 
            @submit.prevent="save"
        >
            <h3>
                <v-text-field
                    v-model="title"
                    placeholder="Title"
                    :rules="titleRules"
                />
            </h3>
            <h2>
                <v-text-field
                    v-model="author"
                    placeholder="Author"
                    :rules="authorRules"
                    class="pt-1"
                />
            </h2>
            <PostEditor
                v-model="body"
                label="Body"
                :rules="bodyRules"
                class="pt-1"
            />
            <div class="d-flex">
                <v-spacer/>
                <v-btn variant="plain" icon="mdi-close" @click="cancel"/>
                <v-btn type="submit" variant="plain" icon="mdi-check"/>
            </div>
        </v-form>
    </v-sheet>
</div>
</template>
<script setup lang="ts">
import { isRequired } from '@/rules';
import { usePostStore } from '@/stores/posts';

const store = usePostStore();
const emit = defineEmits<{
    close: [],
}>();

const isValid = ref<boolean>();
const title = ref("");
const author = ref("");
const body = ref("");

const titleRules = [isRequired("You must enter a title")];
const authorRules = [isRequired("You must enter an author name")];
const bodyRules = [isRequired("You must enter a post body")];

function cancel() {
    title.value = "";
    author.value = "";
    body.value = "";
    emit("close");
}

function save() {
    if (!isValid.value) { return; }

    store.createPost({
        title: title.value,
        author: { username: author.value },
        body: body.value,
    });

    title.value = "";
    author.value = "";
    body.value = "";
    emit("close");
}
</script>