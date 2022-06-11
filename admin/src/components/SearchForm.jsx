import React, {useState} from 'react'
import {useSearch} from '../context/SearchProvider'
import {BsTrash} from 'react-icons/bs'


export default function SearchForm() {
  const [keyss,
    setKeyss] = useState([""])

  const {handleSearch,resetSearch,searchResult} = useSearch()

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (!keyss.trim('')) 
    //   return;
    handleSearch(keyss);
  }

  const handleReset =(e) =>{
    resetSearch();
    setKeyss('');
  }

  const handleKeyDown=(e)=>{
    if((e.key='Escape')) resetSearch()
  }

  return (
    <form  className='relative'>
      <button onClick={handleSubmit}></button>
      <input
        value={keyss}
        onKeyDown={handleKeyDown}
        onChange={({target}) => setKeyss(target.value)}
        placeholder='search...'
        className='border border-gray-500 outline-none rounded p-1 focus:ring-blue-500 w-56'/>
        {searchResult.length ? <button onClick={handleReset} className='absolute top-1/2 -translate-y-1/2'>
          <BsTrash/>
        </button> :null}
    </form>
  )
}