<template>
<v-textarea 
    v-model="model"
    :placeholder="placeholder"
    :rules="rules"
/>
</template>
<script setup lang="ts">
import type { Rule } from '@/rules';

interface Props {
    placeholder?: string;
    rules?: Rule[];
};

const model = defineModel<string>();
withDefaults(defineProps<Props>(), {
    rules: () => []
});
</script>