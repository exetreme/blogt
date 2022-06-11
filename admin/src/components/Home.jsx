import React, {useEffect, useState} from 'react'
import {deletePost, getPosts} from '../api/post'
import PostCard from '../components/PostCard'
import {useSearch} from '../context/SearchProvider'

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
  const {searchResult} = useSearch();
  const [posts,
    setPosts] = useState([])
  const [totalPostCount,
    setTotalPostCount] = useState([])

  getPaginationCount(totalPostCount)

  const paginationCount = getPaginationCount(totalPostCount)
  const paginationArr = new Array(paginationCount).fill('')
  //load item
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

  //loat page
  const fetchMorePosts = (index) => {
    pageNo = index;

    fetchPosts();
  }
  //delete
  const handleDelete = async({id}) => {
    const confirmed = window.confirm('are you sure!');
    if (!confirmed) 
      return;
    
    const {error, message} = await deletePost(id);

    if (error) 
      return console.log(error);
    console.log(message)
    //loat lai sau khi xoa
    const newPosts = posts.filter(p => p.id !== id)
    setPosts(newPosts)
  }

  return (
    <div>
      <div className='grid grid-cols-3 gap-3'>
      {searchResult.length
          ? searchResult.map((post) => {
            return <PostCard key={post._id} post={post} onDeleteClick={() => handleDelete(post)}/>
          })
          : posts.map((post) => {
            return <PostCard key={post._id} post={post} onDeleteClick={() => handleDelete(post)}/>
          })
};
      </div>
      {paginationArr.length > 1 && !searchResult.length
        ? (
          <div className='py-5 flex justify-center'>
            {paginationArr.map((_, index) => {
              return <button
                key={index}
                onClick={() => fetchMorePosts(index)}
                className={index === pageNo
                ? 'text-blue-500 border-blue-500'
                : ''}>{index + 1}</button>
            })}
          </div>
        )
        : null}
    </div>
  );
};
