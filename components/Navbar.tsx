import React from 'react'
import { auth } from '@/auth'

export let navLinks = [
  {id:1, title: 'Home', href: '/' },
  {id:2, title: 'About', href: '/' },
  {id:3, title: 'Register', href: '/register' },
  {id:4, title: 'Login', href: '/login' },
  {id:5, title: 'Contact', href: '/' },
]
// components/Navbar.tsx




import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'


export async function Navbar() {
  const session = await auth()
  if (session?.user) {
    // If user is authenticated, redirect to home page
    navLinks = [
      {id:1, title: 'Home', href: '/' },
      {id:2, title: 'Profile', href: '/' },
      {id:3, title: 'Dashboard', href: '/dashboard' },
      {id:4, title: 'Settings', href: '/' },
      {id:5, title: 'Logout', href: '/logout' }, // Assuming you have a signout endpoint
    ]
  }
  return (
    <nav className="w-full border-b shadow-sm px-4 py-2 bg-white dark:bg-black sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-xl font-bold">
          <Link href="/">MyApp</Link>
        </div>
        <NavigationMenu>
          <NavigationMenuList>
            {navLinks.map((link) => (
              <NavigationMenuItem key={link.id}>
                <Link href={link.href}  passHref>
                  <NavigationMenuLink asChild>
                    <p className={cn('px-4 py-2 hover:text-blue-500 transition-colors')}>
                      {link.title}
                    </p>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  )
}
