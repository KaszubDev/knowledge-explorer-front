import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface searchBarProps {
    searchPhrase?: string
}

const SearchBar = (props: searchBarProps) => {
    const [searchQuery, setSearchQuery] = useState(props.searchPhrase)
    const navigate = useNavigate()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        navigate(`/searchDetail?query=${searchQuery}`)
    }

    useEffect(() => {
        setSearchQuery(props.searchPhrase)
    }, [props.searchPhrase])

  return (
    <form onSubmit={handleSubmit}>
        <div className='relative w-[80%] mx-auto'>
            <input 
                type='text'
                className="border border-gray-300 bg-white h-11 px-5 rounded-full focus:outline-none w-full text-black"
                placeholder="Search..."
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
            />
            <button type='submit'>
                <svg className='absolute w-6 h-6 top-1/2 transform -translate-y-1/2 right-4' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><g><path fill="#000" d="M14 12.94 10.16 9.1c1.25-1.76 1.1-4.2-.48-5.78a4.49 4.49 0 0 0-6.36 0 4.49 4.49 0 0 0 0 6.36 4.486 4.486 0 0 0 5.78.48L12.94 14 14 12.94ZM4.38 8.62a3 3 0 0 1 0-4.24 3 3 0 0 1 4.24 0 3 3 0 0 1 0 4.24 3 3 0 0 1-4.24 0Z"/></g><defs><clipPath><path fill="#fff" d="M0 0h16v16H0z"/></clipPath></defs></svg>
            </button>
        </div>
        <p className={`text-xs mt-3 transition-opacity duration-500 opacity-0 ${searchQuery && 'opacity-100'}`}>Press Enter to search</p>

        
    </form>
  )
}

export default SearchBar