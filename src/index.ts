import "./polyfills"
import "@/shared/styles/reset.scss"
import "@/shared/styles/base.scss"

import { createElement } from "react"
import { createRoot } from "react-dom/client"

import App from "@/app/App"


const rootElement = document.getElementById("root")
createRoot(rootElement!).render(createElement(App))
