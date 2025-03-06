import { pipeRevivers, asDate } from "@/jsonRevivers";
import type { User } from "@/types/users"

export type PostId = string & { __brand: "BlogPostId" };

export interface BlogPost {
    id: PostId;
    author: User;
    title: string;
    body: string;
    posted: Date;
    lastEdited?: Date;
}

export const blogPostReviver = pipeRevivers([
    asDate("posted"),
    asDate("lastEdited"),
]);

export type NewPostModel = Pick<BlogPost, "title" | "body" | "author">