import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './routes/router'
import { ThemeProvider } from './provider/Theme-provider'
import { AuthProvider } from './context/AuthContext'
import { Toaster } from "@/components/ui/sonner"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme='system' storageKey="vite-ui-theme">
      <AuthProvider>
<RouterProvider router={router}>
</RouterProvider>
<Toaster />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
