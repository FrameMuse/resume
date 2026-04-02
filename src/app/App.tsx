import "./App.scss"

import BlogArticlePage from "@/pages/BlogArticlePage/BlogArticlePage"
import HomePage from "@/pages/HomePage/HomePage"
import LandingPage from "@/pages/LandingPage/LandingPage"
import { stripBaseUrl } from "@/shared/utils/baseUrl"


function App() {
  const pathname = stripBaseUrl(window.location.pathname)
  const normalizedPath = pathname.replace(/\/+$/, "") || "/"

  if (normalizedPath.startsWith("/blog/")) {
    const slug = decodeURIComponent(normalizedPath.replace(/^\/blog\//, ""))
    return (
      <div className="app-shell">
        <BlogArticlePage slug={slug} />
      </div>
    )
  }

  if (normalizedPath === "/plain" || normalizedPath === "/resume/plain") {
    return (
      <div className="app-shell">
        <HomePage />
      </div>
    )
  }

  return (
    <div className="app-shell">
      <LandingPage />
    </div>
  )
}

export default App
