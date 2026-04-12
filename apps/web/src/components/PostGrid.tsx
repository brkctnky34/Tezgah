"use client";

import PostCard from "./PostCard";
import { Post } from "@/lib/types";

export default function PostGrid({ posts }: { posts: Post[] }) {
  return (
    <div>
      <p className="section-title mb-10" style={{ textTransform: "none", letterSpacing: "0.2em" }}>In Medias Res</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
