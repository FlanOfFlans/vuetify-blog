<template>
    <v-sheet 
        width="100%" 
        rounded
    >
        <v-form 
            v-model="isValidEdit"
            @submit.prevent="saveEdit"
        >
            <h3 class="px-3 pt-1">
                <div v-if="!editing">
                    {{ post?.title ?? "Unknown Post" }}
                </div>
                <div v-else>
                    <v-text-field 
                        v-model="editedTitle"
                        :rules="titleRules"
                    />
                </div>
            </h3>
            <h4 class="text-subtitle-2 text-disabled pl-3">
                <div v-if="!editing">
                    {{ post?.author.username ?? "Someone mysterious"}}
                </div>
            </h4>
            
            <p v-if="post == null">
                {{ "We couldn't load this post! Nothing to see here, folks." }}
            </p>
            <div v-else-if="!editing" class="text-left">
                <div v-for="paragraph in post.body.split('\n')">
                    <p class="text-break pb-2 pl-3" width="70%">
                        {{ paragraph }}
                    </p>
                </div>
            </div>
            <div v-else-if="editing" class="px-3 pt-1">
                <PostEditor
                    v-model="editedBody"
                    :rules="bodyRules"
                />
            </div>
            <div class="text-subtitle-2 text-disabled">
                <v-col cols="12" class="text-right pb-0">
                    Posted {{ post != null ? formatDate(post.posted) : "before time began"}}
                </v-col>
                <v-col 
                    v-if="post?.lastEdited" 
                    cols="12" 
                    class="text-right pt-0 pb-0"
                >
                    <v-spacer/>
                    Last edited {{ formatDate(post.lastEdited) }}
                </v-col>
            </div>
            <div class="d-flex">
                <v-spacer/>
                <div v-if="!editing && canEdit">
                    <v-btn variant="plain" icon="mdi-delete"  @click="deletePost"/>
                    <v-btn variant="plain" icon="mdi-pencil" @click="startEdit"/>
                </div>
                <div v-else-if="editing">
                    <v-btn variant="plain" icon="mdi-close" @click="cancelEdit"/>
                    <v-btn 
                        type="submit"
                        variant="plain"
                        icon="mdi-check"
                        @click="saveEdit"
                    />
                </div>
            </div>
        </v-form>
    </v-sheet>
</template>
<script setup lang="ts">
import type { PostId } from '@/types/blogPosts';
import { usePostStore } from '@/stores/posts';
import { isRequired } from '@/rules';

const store = usePostStore();

const model = defineModel<PostId>();

const emit = defineEmits<{
    delete: [id: PostId];
    edit: [id: PostId];
}>();

const post = computed(() => model.value != null 
    ? store.get(model.value)
    : undefined);
const canEdit = computed(() => post != null);
const isValidEdit = ref<boolean>();
const editing = ref(false);
const editedTitle = ref("");
const editedBody = ref("");

const titleRules = [isRequired("You must enter a title")];
const bodyRules = [isRequired("You must enter a post body")];

const dateTimeOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
};

function deletePost() {
    if (model.value == null) { return; }
    
    store.deletePost(model.value);
    emit("delete", model.value);
}

function startEdit() {
    editing.value = true;
    editedTitle.value = post.value?.title ?? "";
    editedBody.value = post.value?.body ?? "";
}

function cancelEdit() {
    editing.value = false;
}

function saveEdit() {
    if (model.value == null) { return; }
    if (!isValidEdit.value) { return; }
    
    store.editPost(model.value, {
        body: editedBody.value,
        title: editedTitle.value
    });
    editing.value = false;
    emit("edit", model.value);
}

function formatDate(date: Date) {
    return date.toLocaleDateString(undefined, dateTimeOptions);
}
</script>