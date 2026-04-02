export interface ShowcaseCard {
  eyebrow: string
  summary: string
  title: string
}

export const showcaseContent = {
  intro: {
    eyebrow: "Ladies and gentlemen",
    title: "meet Valery \"FrameMuse\" Zinchenko.",
    summary: "The engineer who turns TypeScript, frontend systems, and product delivery into one coherent machine.",
    supporting: "A theatrical entrance is allowed. The code itself stays disciplined.",
    prompt: "Click to start the guided tour"
  },
  guide: {
    name: "Patch",
    role: "resident guide",
    comments: {
      intro: "I handle the dramatic lighting so Valery can keep handling architecture, delivery, and the frighteningly calm build pipeline.",
      identity: "What you are looking at is a frontend lead who likes product surfaces, internal tooling, and reusable systems equally. Suspiciously useful combination.",
      dossier: "This cabinet scrolls inside itself. The page does not. We respect the stage and the viewport in this establishment.",
      finale: "If you want the sober version, the plain resume is one click away. If you want a senior engineer with taste and systems sense, also one click away."
    }
  },
  identityCards: [
    {
      eyebrow: "Product",
      title: "Builds interfaces as systems, not screenshots",
      summary: "Strong UI craft with a bias toward maintainable structure, fast iteration, and the kind of frontend that stays pleasant after the launch week adrenaline wears off."
    },
    {
      eyebrow: "Platform",
      title: "Comfortable below the component layer",
      summary: "Libraries, rendering strategy, API boundaries, build ergonomics, and architecture decisions are part of the actual job, not a side hobby performed after midnight."
    },
    {
      eyebrow: "Delivery",
      title: "Senior enough to keep momentum real",
      summary: "Audit work, full-stack integration, design-to-code execution, mentoring, and practical prioritization all show up in the same profile."
    }
  ] satisfies ShowcaseCard[],
  closingNotes: [
    "Open for senior product engineering, frontend platform, and TypeScript-heavy architecture roles.",
    "Best fit: teams that want depth in both product delivery and engineering systems.",
    "Plain resume, GitHub, LinkedIn, and writing are all one step away."
  ]
}
