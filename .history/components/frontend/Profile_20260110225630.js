import { handleSignOut } from '@/actions/signout'
import { auth } from '@/auth'
import Image from 'next/image'
import Link from 'next/link'
import { RiUserLine } from 'react-icons/ri'

export const Profile = ({ session }) => {
  return (
    <div className='relative flex'> 
    <button>
      <RiUserLine size={20} />
    </button>
      <div
        className={`
          w-60 right-0 absolute mt-10  bg-white border rounded-sm shadow-lg
          transform transition-all duration-300
          ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
        `}
       
      >
        {session?.user ? (
          <div className="p-4 w-full" >
            <Link 
            href={`/dashboard`}
            className='flex gap-4 w-full border justify-center items-center p-2 rounded-sm hover:bg-tertiary/10 '>
            
                <p className="font-semibold text-gray-800">{session.user.username}</p>
             
          
              <Image src={session.user.imageUrl} height={40} width={40} alt='profile' className='rounded-full' />
            </Link>
            <button
              onClick={handleSignOut}
              className="mt-3 w-full  py-2 rounded-sm transition border hover:bg-tertiary hover:text-primary">
              Logout
            </button>
          </div>
        ) : (<div className="p-4 w-full flex justify-center" >
          <Link href="/login" className='border w-full p-2 hover:bg-tertiary hover:text-primary'>
            <p className='text-center'> Login</p>
          </Link>
        </div>)}
      </div>
    </div>
  )
}

export async function ProfileContent() {
  const session = await auth()
 
  return <Profile session ={session} />
}
 