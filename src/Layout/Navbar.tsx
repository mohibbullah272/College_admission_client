import { useId, useState, useEffect, useRef } from "react"
import { LogOut, SearchIcon, X } from "lucide-react"
import { debounce } from "lodash"

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
import { Link, NavLink, useNavigate } from "react-router"
import { ModeToggle } from "@/components/mode-toggle"
import { useAuth } from "@/context/AuthContext"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { collegesAPI } from "@/utils/api"

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "colleges", label: "Colleges" },
  { href: "admission", label: "Admission" },
  { href: "my-college", label: "My College" },
]

interface College {
  _id: string;
  name: string;
  // Add other college properties as needed
}

export default function Navbar() {
  const id = useId()
  const { user,logout } = useAuth()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")
  const [suggestions, setSuggestions] = useState<College[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  // Debounced search function
  const debouncedSearch = debounce(async (query: string) => {
    if (query.length < 2) {
      setSuggestions([])
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      const response = await collegesAPI.getAll({ search: query, limit: 5 })
      if (response.data.success) {
        setSuggestions(response.data.data)
      }
    } catch (error) {
      console.error("Error fetching college suggestions:", error)
      setSuggestions([])
    } finally {
      setIsLoading(false)
    }
  }, 300)

  useEffect(() => {
    debouncedSearch(searchQuery)
    return () => debouncedSearch.cancel()
  }, [searchQuery])

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleCollegeSelect = (college: College) => {
    setSearchQuery("")
    setSuggestions([])
    setShowSuggestions(false)
    navigate(`/colleges/${college._id}`)
  }

  const clearSearch = () => {
    setSearchQuery("")
    setSuggestions([])
    setShowSuggestions(false)
  }

  const SuggestionSkeleton = () => (
    <div className="p-3 space-y-2">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex items-center space-x-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <header className="border-b px-4 md:px-6 sticky top-0 bg-background z-50">
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
            </>  ):(<Button onClick={logout} className="flex items-center gap-2 ">Logout <LogOut></LogOut></Button>)
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
            <div ref={searchRef} className="relative">
              <div className="relative">
                <Input
                  id={id}
                  className="peer h-8 ps-8 pe-8"
                  placeholder="Search colleges..."
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                />
                <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 peer-disabled:opacity-50">
                  <SearchIcon size={16} />
                </div>
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="text-muted-foreground/70 hover:text-foreground absolute inset-y-0 end-0 flex items-center justify-center pe-2"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              
              {/* Suggestions dropdown */}
              {showSuggestions && (searchQuery.length > 0 || isLoading) && (
                <Card className="absolute top-full left-0 right-0 mt-1 shadow-lg z-50 max-h-80 overflow-y-auto">
                  <CardContent className="p-0">
                    {isLoading ? (
                      <SuggestionSkeleton />
                    ) : suggestions.length > 0 ? (
                      <div className="py-2">
                        {suggestions.map((college) => (
                          <div
                            key={college._id}
                            className="px-4 py-2 hover:bg-accent cursor-pointer transition-colors"
                            onClick={() => handleCollegeSelect(college)}
                          >
                            <p className="font-medium">{college.name}</p>
                          </div>
                        ))}
                      </div>
                    ) : searchQuery.length >= 2 ? (
                      <div className="p-4 text-center text-muted-foreground">
                        No colleges found
                      </div>
                    ) : null}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-2 max-md:hidden">
          {!user ? (
            <>
              <Button asChild variant="ghost" size="sm" className="text-sm">
                <Link to="/signin">Sign In</Link>
              </Button>
              <Button asChild size="sm" className="text-sm">
                <Link to="/signup">Sign Up</Link>
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link to={'/my-profile'}>
                <button className="bg-red-600 rounded-full w-10 h-10 text-sm text-white">
                  {user?.name?.slice(0, 2).toUpperCase()}
                </button>
              </Link>
              <Button onClick={logout} className="flex items-center gap-2">
                Logout <LogOut size={16} />
              </Button>
            </div>
          )}
          <ModeToggle mobileView={false} />
        </div>
      </div>
    </header>
  )
}