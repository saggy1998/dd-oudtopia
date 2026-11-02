import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Campaign from './campaign/Campaign.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Campaign />
  </StrictMode>,
)
