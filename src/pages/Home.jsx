import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) setPosts(posts.documents);
    });
  }, []);

  // --- No posts (user not logged in) ---
  if (posts.length === 0) {
    return (
      <section className="min-h-[80vh] flex items-center justify-center bg-slate-950 text-center">
        <Container>
          <div className="flex flex-col items-center justify-center space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Login to read posts
            </h1>
            <p className="text-slate-400 text-sm md:text-base">
              Discover, write, and share stories with the world 🌍
            </p>
          </div>
        </Container>
      </section>
    );
  }

  // --- Show posts if logged in ---
  return (
    <section className="min-h-[80vh] py-12 bg-slate-950 text-white">
      <Container>
        <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-slate-100 border-b border-slate-800 pb-2">
          Latest Posts
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {posts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Home;
