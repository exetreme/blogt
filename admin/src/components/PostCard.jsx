import React from 'react'
import dateFormat from 'dateformat'
import {Link} from 'react-router-dom'
import {BsPencilSquare, BsTrash} from 'react-icons/bs'

export default function PostCard({post,onDeleteClick}) {
  if (!post) 
    return null
  const {
    title,
    thumbnail,
    tags,
    meta,
    createAt,
    slug
  } = post

  return (
    <div className='bg-white shadow-sm rounded'>
      <img className='aspect-video' src={thumbnail || '.blank.jpg'} alt=''/>
      <div className='p2 flex-1 flex flex-col justify-between'>
        <h1 className='text-lg font-semibold text-gray-700'>{title}</h1>
        <p className='text-gray-700'>{meta.substring(0, 80) + '...'}</p>
        <p className='text-gray-700 text-sm'>{dateFormat(createAt, 'mediumDate')}</p>
        <p className='text-gray-700 text-sm'>{tags}</p>
      </div>
      <div>
        <button
          className='w8 h8 rounded-full bg-blue-400 hover:bg-blue-600 flex justify-center text-white'>
          <Link to={`update-post/${slug}`}><BsPencilSquare/>
          </Link>
        </button>

        <button
          onClick={onDeleteClick}
          className='w8 h8 rounded-full bg-pink-400 hover:bg-blue-600 flex justify-center text-white'><BsTrash/></button>
      </div>
    </div>
  )
}
