import {HiMenuAlt4} from "react-icons/hi";
import {AiOutlineClose} from "react-icons/ai";

import logo from "../../images/logo.png";
import { useState } from "react";

const NavbarItem = ({title, classProps}) =>{
  return(
    <li className={`mx-4 cursor-pointer ${classProps}`} >{title}</li>
  )

}
const Navbar = () => {
  const [toggle, setToggle] = useState(false); 
  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4 " >
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img src={logo} alt="logo" className="w-32 cursor-pointer" />
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) =>(
          <NavbarItem key={item+index} title={item} />
        ))}
        <li className="bg-[#2952e3] py-2 px-7 rounded-full cursor-pointer hover:bg-[#2546bd]" >Login</li>
      </ul>
      <div className="flex relative " >
        {toggle ?
        <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={()=>{setToggle(false)}} />:
        <HiMenuAlt4  fontSize={28} className="text-white md:hidden cursor-pointer" onClick={()=>{setToggle(true)}}  />
        }
       {toggle && (
        <ul
        className="z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
          flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white amimate-slide-in"
        >

          <li className="text-xl w-full my-2">
            <AiOutlineClose className="cursor-pointer" onClick={()=>{setToggle(false)}} />
            {["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) =>(
          <NavbarItem key={item+index} title={item} classProps={"my-4 text-lg text-right"} />
        ))}
          </li>
        </ul>

       )}
       
      </div>
    </nav>
  )
}

export default Navbar
