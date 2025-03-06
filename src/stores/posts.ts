import { type BlogPost, type PostId, type NewPostModel, blogPostReviver} from '@/types/blogPosts'
import { defineStore } from 'pinia'

export type PostsState = {
    posts: Map<PostId, BlogPost>;
};

export const usePostStore = defineStore('app', {
    state: (): PostsState => ({
        posts: new Map()
    }),
    
    actions: {
        load(force = false) {
            if (this.posts.size > 0 && !force) { return; }

            this.posts = new Map();
            const json = sessionStorage.getItem("posts");

            if (json != null) {
                const postArray = (JSON.parse(json, blogPostReviver).posts ?? []) as BlogPost[];
                postArray.map(p => this.posts!.set(p.id, p));
            }
        },

        save() {
            const json = JSON.stringify({posts: Array.from(this.posts?.values() ?? [])});
            sessionStorage.setItem("posts", json);
        },

        deletePost(id: PostId) {
            this.load();

            this.posts!.delete(id);
            this.save();
        },

        // TODO make the edit model more extensible
        editPost(id: PostId, newBody: string, newTitle: string) {
            const post = this.posts?.get(id);

            if (post == null) {
                throw new ReferenceError(`Attempted to edit nonexistent post with ID ${id}`)
            }

            post.body = newBody;
            post.title = newTitle;
            post.lastEdited = new Date();
            
            this.posts.set(post.id, post);
            this.save();
        },

        createPost(model: NewPostModel) {
            this.load();

            const post = {
                id: crypto.randomUUID(),
                posted: new Date(),
                ...model
            } as BlogPost

            this.posts!.set(post.id, post);
            this.save();
        }
    },

    getters: {
        get(state) { return (id: PostId) => {
            return state.posts?.get(id);
        }},

        getPosts(state) { return () => {
            if (state.posts == null) { return []; }

            return Array.from(state.posts.values())
                .sort((a, b) => b.posted.getTime() - a.posted.getTime());
        }}
    }
})
