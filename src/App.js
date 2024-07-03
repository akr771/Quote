// App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    setPosts(savedPosts);
  }, []);

  // useEffect(() => {
  //   localStorage.setItem('posts', JSON.stringify(posts));
  // }, [posts]);

  const handlePost = () => {
    if (newPost.trim()) {
      const post = {
        id: Date.now(),
        content: newPost,
        upvotes: 0
      };
      setPosts([post, ...posts]);
      setNewPost('');
    }
  };

  const handleUpvote = (id) => {
    const updatedPosts = posts.map(post =>
      post.id === id ? { ...post, upvotes: post.upvotes + 1 } : post
    );
    updatedPosts.sort((a, b) => b.upvotes - a.upvotes);
    setPosts(updatedPosts);
  };

  return (
    <div className="App">
      <header>
        <h1>Reddit Feed</h1>
        <p>Welcome, Damin Singh</p>
      </header>
      <div>
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <button onClick={handlePost}>Post</button>
      </div>
      <div>
        {posts.map(post => (
          <div key={post.id}>
            <p>{post.content}</p>
            <button onClick={() => handleUpvote(post.id)}>
              Upvote ({post.upvotes})
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;



