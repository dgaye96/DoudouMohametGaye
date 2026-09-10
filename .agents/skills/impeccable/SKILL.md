---
name: impeccable
description: "UI/UX design, visual polish, front-end craftsmanship, typography, micro-interactions, layout, accessibility, and impeccable design standards. Use when designing, reviewing, or refining user interfaces and front-end code."
---

# Impeccable Design & Front-End Craftsmanship Skill

## Overview
This skill enforces world-class standards for UI/UX design, visual hierarchy, responsive layouts, micro-interactions, accessibility (WCAG), and front-end engineering.

---

## Core Principles

### 1. Typography & Visual Hierarchy
- **Scales & Proportions**: Use mathematical typography scales with fluid sizing via `clamp()`.
- **Line Heights & Letter Spacing**:
  - Headings: tight line-height (`1.0` - `1.2`), negative letter-spacing (`-0.03em` to `-0.07em`).
  - Body text: generous line-height (`1.5` - `1.65`), neutral letter-spacing.
  - Eyebrows & Monospace: uppercase, tracked out (`0.08em` - `0.15em`), smaller font-size.
- **Font Pairings**: Combine a high-personality display font (sans/serif) with a clean, legible sans-serif body font, and a precise monospace font for data/code.

### 2. Color System & Contrast
- **CSS Variables**: Define all colors in semantic CSS custom properties (`:root`).
- **Contrast Ratios**: Strictly adhere to WCAG AA/AAA standards (minimum 4.5:1 for body text, 3:1 for large text).
- **Theme Adaptation**: Support dark and light modes seamlessly with smooth transitions and persistent user preference in `localStorage`.

### 3. Layout & Spacing
- **8px Grid System**: All margins, paddings, gaps, and component dimensions adhere to a consistent 8px/4px spacing system.
- **Fluid Layouts**: Use CSS Grid and Flexbox with `min()`, `max()`, and `clamp()` for responsive adaptations without breakpoint layout shifts.
- **Whitespace**: Embrace negative space to allow content to breathe and guide visual flow.

### 4. Motion & Micro-Interactions
- **60fps Transitions**: Animate only hardware-accelerated properties (`transform`, `opacity`).
- **Easing & Timing**: Use custom cubic-bezier curves (`cubic-bezier(0.2, 0.8, 0.2, 1)`) and timing under 400ms for immediate feedback.
- **Accessibility**: Respect `prefers-reduced-motion`media queries.
- **Interactive Feedback**: Every interactive element must feature distinct hover, focus-visible, and active states.

### 5. Accessibility (a11y)
- **Semantic HTML**: Use proper tags (`<main>`, `<nav>`, `<article>`, `<section>`, `<header>`, `<footer>`, `<button>`).
- **Keyboard Navigation**: Clear, visible `:focus-visible` focus rings. Logical tab order.
- **Screen Readers**: Meaningful `aria-label`, `aria-expanded`, `aria-live`, and `alt` text for images.

### 6. Component Quality & Edge States
- **State Coverage**: Design and implement for loading states, empty states, error states, and success feedback.
- **Touch Targets**: Minimum 44x44px touch targets on mobile devices.
- **Performance**: Lazy-load assets, use modern formats (WebP/SVG), and keep JavaScript lightweight.
