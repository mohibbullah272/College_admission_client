import { useId } from "react"
import { LogOut, SearchIcon } from "lucide-react"

import Logo from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Link, NavLink } from "react-router"
import { ModeToggle } from "@/components/mode-toggle"
import { useAuth } from "@/context/AuthContext"

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
    { href: "/", label: "Home" },
  { href: "colleges", label: "Colleges" },
  { href: "admission", label: "Admission" },
  { href: "my-college", label: "My College" },
]

export default function Navbar() {
  const id = useId()
  const {user}=useAuth()
  console.log(user)
  return (
    <header className="border-b px-4 md:px-6">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex flex-1 items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index} className="w-full">
                      <NavLink to={link.href} className="py-1.5">
                        {link.label}
                      </NavLink>
                    </NavigationMenuItem>
                  ))}
                  <NavigationMenuItem
                    className="w-full"
                    role="presentation"
                    aria-hidden="true"
                  >
                    <div
                      role="separator"
                      aria-orientation="horizontal"
                      className="bg-border -mx-1 my-1 h-px"
                    ></div>
                  
                  </NavigationMenuItem>
           {
            (!user ? (     <>
            <NavigationMenuItem className="w-full">
            <Link to="/signin" className="py-1.5">
              Sign In
            </Link>
          </NavigationMenuItem>
          <Link to={'/signup'} className="w-full mb-2">
            <Button
            
              size="sm"
              className="mt-2 w-full   text-left text-sm"
            >
            Sign Up
            </Button>
          </Link>    
            </>  ):(<Button className="flex items-center gap-2 ">Logout <LogOut></LogOut></Button>)
           )}
                </NavigationMenuList>
              </NavigationMenu>
              
                <ModeToggle mobileView={true}></ModeToggle>
            </PopoverContent>
          </Popover>
          {/* Main nav */}
          <div className="flex flex-1 items-center gap-6 max-md:justify-between">
            <Link to="/" className="text-primary hover:text-primary/90">
              <Logo />
            </Link>
            {/* Navigation menu */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {navigationLinks.map((link, index) => (
                  <NavigationMenuItem key={index}>
                    <NavLink
                      to={link.href}
                      className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                    >
                      {link.label}
                    </NavLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            {/* Search form */}
            <div className="relative">
              <Input
                id={id}
                className="peer h-8 ps-8 pe-2"
                placeholder="Search..."
                type="search"
              />
              <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 peer-disabled:opacity-50">
                <SearchIcon size={16} />
              </div>
            </div>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-2 max-md:hidden">
{
  (!user? (<>          <Button asChild variant="ghost" size="sm" className="text-sm">
  <Link to="/signin">Sign In</Link>
</Button>
<Button asChild size="sm" className="text-sm">
  <Link to="/signup">
  
    Sign Up
    
   
  </Link>
</Button></>):(<div className="flex items-center gap-3">
 <Link to={'/my-profile'}>
 <button className="bg-red-600 rounded-full w-10 h-10 text-sm">{user?.name?.slice(0,2)}</button>
 </Link>
  <Button className="flex items-center gap-2 ">Logout <LogOut></LogOut></Button> </div>))
}
          <ModeToggle mobileView={false}></ModeToggle>
        </div>
      </div>
    </header>
  )
}
