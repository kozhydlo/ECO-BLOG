import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPosts, selectPosts } from "../redux/slices/posts";
import Grid from "@mui/material/Grid";
import { Post } from "../components/Post";

const TagPostsPage = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const posts = useSelector(selectPosts);
  const [postsWithTag, setPostsWithTag] = useState(null);
  const { tagName } = useParams();
  const navigate = useNavigate();

  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    if (tagName) {
      async function fetchPostsByTag() {
        try {
          const response = await fetch(
            `http://localhost:4444/postByTeg?tags=${encodeURIComponent(
              tagName
            )}`
          );

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          setPostsWithTag(data);
        } catch (error) {
          console.error("Error fetching posts by tag:", error);
          // Handle the error as needed
        }
      }

      fetchPostsByTag();
    }
  }, [tagName]);

  const filterPostsByTags = () => {
    return selectedTags.length === 0
      ? postsWithTag || [] // Перевірте, чи існують дані постів, інакше використовуйте порожній масив
      : (postsWithTag || []).filter((post) =>
          post.tags.some((tag) => selectedTags.includes(tag))
        );
  };

  return (
    <Grid xs={8} item>
      {filterPostsByTags().map((post, index) => (
        <Post
          key={index}
          _id={post._id}
          title={post.title}
          imageUrl={
            post.imageUrl
              ? `${process.env.REACT_APP_API_URL}${post.imageUrl}`
              : ""
          }
          user={post.user}
          createdAt={post.createdAt}
          viewsCount={post.viewsCount}
          commentsCount={3}
          tags={post.tags}
          isEditable={post.user && userData?._id === post.user._id}
        />
      ))}
    </Grid>
  );
};

export default TagPostsPage;
