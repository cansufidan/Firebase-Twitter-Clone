import { signOut } from "firebase/auth"
import { auth } from "../firebase/config"
import {navSections} from "./../utils/constant"
import dProfile from '../assets/default.png'

const Nav = () => {
  return (
  <nav className="flex flex-col justify-between h-[100vh]">
    <div>
        <img className="w-14 m-3" src="/x-logo.png"/>
        {navSections.map((sec, i) => (
        <div className="flex items-center gap-3 text-lg p-3 cursor-pointer transition hover:bg-gray-900" 
        key={i}
        >
            {sec.icon}
            <span>{sec.title}</span>
        </div>
        ))}
    </div>

    <div className="flex flex-wrap items-center gap-2">
        <img 
        src={
            auth?.currentUser?.photoURL
             ? auth.currentUser.photoURL
             : dProfile
        }
        className="rounded-full w-14"
        />
        <div className="flex flex-col gap-2">
            <span>{auth?.currentUser?.displayName}</span>
            <span>@{auth?.currentUser?.displayName?.toLowerCase()}</span>
        </div>
        <button 
        onClick={()=> signOut(auth)} 
        className="mx-2 mb-4 hover:bg-gray-900 p-3 rounded-lg">
          Log out
        </button>
    </div>
  </nav>
  )
}

export default Nav