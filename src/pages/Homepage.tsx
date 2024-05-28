import ParticleBackground from '../components/ParticleBackground'
import SearchBar from '../components/SearchBar'

const Homepage = () => {
  return (
    <div className='container mx-auto'>
      <ParticleBackground/>
      <div className='flex items-center justify-center min-h-screen'>
        <div>
          <h1 className='text-5xl font-extrabold tracking-tight lg:text-6xl'>Knowledge Explorer</h1>
          <p className='my-10'>Welcome to the gateway of knowledge. Explore, discover, and learn with us.</p>
          <SearchBar/>
        </div>
      </div>
    </div>
  )
}

export default Homepage