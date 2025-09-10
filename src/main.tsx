import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter, parseSearchWith, stringifySearchWith } from '@tanstack/react-router'
import { NuqsAdapter } from 'nuqs/adapters/tanstack-router'
import { parse, stringify } from 'jsurl2'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

import './styles.css'
import reportWebVitals from './reportWebVitals.ts'

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {},
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
  parseSearch: parseSearchWith(parse),
  stringifySearch: stringifySearchWith(stringify),

  // parseSearch: parseSearchWith((value) => {
  //   console.log("🌹🌹 parseSearch with value", value, `typeof value`, typeof value)
  //   return JSON.parse(decodeFromBinary(value))
  // }),
  // stringifySearch: stringifySearchWith((value) =>
  //   {
  //     console.log("🌹🌹 stringifySearch with value", value, `typeof value`, typeof value)
  //     return encodeToBinary(JSON.stringify(value))
  //   },
  // ),
})



// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render the app
const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <NuqsAdapter
        // stringifySearchWith={stringifySearchWith((value) =>
        //   encodeToBinary(JSON.stringify(value)),
        // )} 
        stringifySearchWith={stringifySearchWith(stringify)
        }
        parseSearchWith={parseSearchWith(parse)}  
        
        >
        <RouterProvider router={router} />
      </NuqsAdapter>
    </StrictMode>,
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
