import React, {useEffect, useState} from 'react'
import {getPosts} from '../api/post'
import PostCard from '../components/PostCard'

let pageNo = 0
const POST_LIMIT = 9
const getPaginationCount = (length) => {
  const division = length / POST_LIMIT
  if (division % 1 !== 0) {
    return Math.floor(division) + 1
  }
  return division;
}
export default function Home() {
  const [posts,
    setPosts] = useState([])
  const [totalPostCount,
    setTotalPostCount] = useState([])

  getPaginationCount(totalPostCount)

  const paginationCount = getPaginationCount(totalPostCount)
  const paginationArr = new Array(paginationCount).fill('')

  const fetchPosts = async() => {
    const {error, posts, postCount} = await getPosts(pageNo, POST_LIMIT)
    if (error) 
      return console.log(error);
    setPosts(posts);
    setTotalPostCount(postCount)
    
  };

  useEffect(() => {
    fetchPosts()
  }, []);

  const fetchMorePosts = (index) => {
    pageNo = index;
    
    fetchPosts();
  }
  return (
    <div>
      <div className='grid grid-cols-3 gap-3'>
        {posts.map((post) => {
          return <PostCard key={post.id} post={post}/>
        })
        };
      </div>
      <div className='py-5 flex justify-center'>
        {paginationArr.map((_, index) => {
          return <button
            onClick={() => fetchMorePosts(index)}
            className={index === pageNo
            ? 'text-blue-500 border-blue-500'
            : ''}>{index + 1}</button>
        })}
      </div>
    </div>
  );
};
