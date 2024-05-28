import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Graph from '../components/Graph'
import SearchBar from '../components/SearchBar'
import Navbar from '../components/Navbar'
import { Skeleton } from "@/components/ui/skeleton"

const SearchDetail = () => {
  const [searchParams] = useSearchParams()
  const searchString = searchParams.get('query') as string
  const [synonyms, setSynonyms] = useState<string[] | null>(null)

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/synonyms?query=${searchString}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok')
        }
        return res.json()
      })
      .then((data) => {
        setSynonyms(data.synonyms)
      })
      .catch((error) => {
        console.error('There has been a problem with your fetch operation: ', error)
      })
  }, [searchString])

  return (
    <div className='container'>
        <Navbar/>
        <SearchBar searchPhrase={searchString}/>
        <h1 className=' mb-5'>Search results for: <span className='italic'>{searchParams.get('query')}</span></h1>
        {!synonyms && <Skeleton className='w-[1000px] h-[500px]'/>}
        {synonyms && <Graph baseWord={searchString} synonyms={synonyms} />}
    </div>
  )
}

export default SearchDetail