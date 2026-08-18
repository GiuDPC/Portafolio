import React from "react"
import { useTheme } from "./ThemeProvider"

import bashDark from "../assets/tech-stack/Bash_dark.svg"
import bashLight from "../assets/tech-stack/Bash_light.svg"
import mongoDark from "../assets/tech-stack/MongoDB_dark.svg"
import mongoLight from "../assets/tech-stack/MongoDB_light.svg"
import reactDark from "../assets/tech-stack/React_dark.svg"
import reactLight from "../assets/tech-stack/React_light.svg"
import cppSvg from "../assets/tech-stack/c-plusplus.svg"
import cssSvg from "../assets/tech-stack/css_old.svg"
import dockerSvg from "../assets/tech-stack/docker.svg"
import gitSvg from "../assets/tech-stack/git.svg"
import htmlSvg from "../assets/tech-stack/html5.svg"
import jsSvg from "../assets/tech-stack/javascript.svg"
import linuxSvg from "../assets/tech-stack/linux.svg"
import nodeSvg from "../assets/tech-stack/nodejs.svg"
import postgresSvg from "../assets/tech-stack/postgresql.svg"
import tsSvg from "../assets/tech-stack/typescript.svg"
import viteSvg from "../assets/tech-stack/vite.svg"
import tailwindSvg from "../assets/tech-stack/tailwindcss.svg"
import expressSvg from "../assets/tech-stack/express.svg"
import vercelSvg from "../assets/tech-stack/vercel.svg"

interface TechIconProps {
  name: string
  className?: string
  style?: React.CSSProperties
}

export function TechIcon({ name, className = "w-7 h-7", style }: TechIconProps) {
  const { resolvedTheme } = useTheme()
  const isLight = resolvedTheme === "light"
  const icon = name.toLowerCase().trim()

  let src: string

  switch (icon) {
    case "typescript":
    case "ts":
      src = tsSvg
      break

    case "js":
    case "javascript":
      src = jsSvg
      break

    case "nodejs":
    case "node":
      src = nodeSvg
      break

    case "react":
    case "react native":
      src = isLight ? reactLight : reactDark
      break

    case "c++":
    case "cpp":
      src = cppSvg
      break

    case "postgresql":
    case "postgres":
      src = postgresSvg
      break

    case "mongodb":
    case "mongo":
      src = isLight ? mongoLight : mongoDark
      break

    case "docker":
      src = dockerSvg
      break

    case "git":
      src = gitSvg
      break

    case "linux":
      src = linuxSvg
      break

    case "html5":
    case "html":
      src = htmlSvg
      break

    case "css3":
    case "css":
      src = cssSvg
      break

    case "tailwindcss":
    case "tailwind":
      src = tailwindSvg
      break

    case "bash":
      src = isLight ? bashLight : bashDark
      break

    case "vitejs":
    case "vite":
      src = viteSvg
      break

    case "express":
      src = expressSvg
      break

    case "vercel":
      src = vercelSvg
      break

    default:
      src = ""
      break
  }

  if (!src) {
    return (
      <span className={`inline-flex items-center justify-center font-mono text-xs font-bold ${className}`} style={style}>
        {name.slice(0, 3)}
      </span>
    )
  }

  return (
    <img
      src={src}
      alt={name}
      className={`object-contain inline-block ${className}`}
      style={style}
      width={36}
      height={36}
      loading="lazy"
      decoding="async"
      draggable={false}
    />
  )
}
