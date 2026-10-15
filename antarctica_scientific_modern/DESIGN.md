---
name: Antarctica Scientific Modern
colors:
  surface: '#f8f9ff'
  surface-dim: '#ccdbf3'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e6eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d5e3fc'
  on-surface: '#0d1c2e'
  on-surface-variant: '#414750'
  inverse-surface: '#233144'
  inverse-on-surface: '#eaf1ff'
  outline: '#727781'
  outline-variant: '#c1c7d2'
  surface-tint: '#1261a3'
  primary: '#004275'
  on-primary: '#ffffff'
  primary-container: '#005a9c'
  on-primary-container: '#afd1ff'
  inverse-primary: '#a1c9ff'
  secondary: '#0060a9'
  on-secondary: '#ffffff'
  secondary-container: '#2b99ff'
  on-secondary-container: '#002f58'
  tertiary: '#00484a'
  on-tertiary: '#ffffff'
  tertiary-container: '#006264'
  on-tertiary-container: '#06e5e9'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d2e4ff'
  primary-fixed-dim: '#a1c9ff'
  on-primary-fixed: '#001c37'
  on-primary-fixed-variant: '#00487f'
  secondary-fixed: '#d3e4ff'
  secondary-fixed-dim: '#a2c9ff'
  on-secondary-fixed: '#001c38'
  on-secondary-fixed-variant: '#004881'
  tertiary-fixed: '#40fafd'
  tertiary-fixed-dim: '#00dce0'
  on-tertiary-fixed: '#002020'
  on-tertiary-fixed-variant: '#004f51'
  background: '#f8f9ff'
  on-background: '#0d1c2e'
  surface-variant: '#d5e3fc'
typography:
  display-lg:
    fontFamily: Noto Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 60px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Noto Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-xl:
    fontFamily: Noto Sans
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Noto Sans
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Noto Sans
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Noto Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Noto Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Noto Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Noto Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Noto Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 21px
  label-lg:
    fontFamily: Noto Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Noto Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Noto Sans
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.03em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  gutter-lg: 2rem
  margin: 1.5rem
  margin-sm: 1rem
  margin-lg: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system serves an institutional research and managed computing initiative dedicated to academic AI infrastructure. The brand identity balances sovereign institutional trust with high-performance computational rigour. It speaks directly to university rectors, principal investigators, laboratory directors, and national research agencies.

### Visual Aesthetic & Philosophy
- **Style Archetype:** Modern Academic Institutionalism infused with functional computational minimalism.
- **Atmosphere:** Clean, cold-calibrated, precise, and transparent. The interface feels like an advanced scientific instrument: silent, robust, and uncluttered.
- **Emotional Intent:** Authority, reproducibility, operational security, and high scientific output. It deliberately avoids startup clichés, neon gimmicks, and playful metaphors in favour of structural balance and high informational density.

## Colors

The palette is engineered to meet strict WCAG AAA and AA legibility standards, utilizing crystalline cold hues reminiscent of polar precision and computational infrastructure.

### Surfaces & Backgrounds
- **Primary Canvas:** `#FFFFFF` — clean clinical white base for optimal data contrast.
- **Alternate Surface (Subtle Mist):** `#F5F8FC` — deployed across alternating content bands, container cards, and technical metadata sidebars to divide information without structural noise.

### Typography & Content
- **Text Primary (Deep Midnight):** `#05183D` — authoritative near-black navy offering contrast ratios exceeding 13:1 on white surfaces.
- **Text Secondary (Slate Neutral):** `#475569` — balanced mid-tone for auxiliary labels, captions, and secondary metadata (WCAG AA compliant for regular text).

### Interactive Primary
- **Primary Base:** `#005A9C` — deep oceanic cobalt, providing reliable contrast (> 4.5:1) for primary calls to action.
- **Primary Hover:** `#004B82`
- **Primary Active:** `#003B6D`

### Strategic Accents
- **Accent Interactive / Focus:** `#048CF2` — used sparingly for active states, link adornments, and critical progress indicators.
- **Signal Cyan:** `#09E5E9` — restricted strictly to decorative edge-highlights, dark-mode badges, or non-text volumetric accents where contrast against pure white is not a factor. Never use this token as body text over white surfaces.

### Boundaries & Structural Separation
- **Subtle Hairline Borders:** `#D5DEE8` — structural bounds for cards, tables, and unselected input containers.
- **Solid Structural Divisors:** `#64748B` — high-contrast separator lines, axes, and interactive iconography.

### Semantic Feedback
- **Success Tone:** `#166534` (text/iconography) over `#F0FDF4` (background surface) with `#BBF7D0` outline.
- **Destructive/Error Tone:** `#B42318` (text/iconography) over `#FEF2F2` (background surface) with `#FECDD3` outline.

## Typography

Noto Sans governs the typography to guarantee global linguistic coverage, universal glyph compatibility, and high legibility across scientific notations and mixed character strings.

### Editorial Hierarchies
- **Comfortable Leading:** All body and editorial passages enforce a baseline line-height factor between 1.5 and 1.55 (`16px/24px`, `14px/21px`) to prevent eye fatigue during lengthy peer review and grant paper analyses.
- **Tabular Figures:** For dataset readouts, execution runtimes, GPU memory metrics, and computational telemetry, render Noto Sans with `font-variant-numeric: tabular-nums` to maintain vertical alignment in data tables.
- **Editorial Contrast:** Section titling leverages tighter tracking (`-0.01em` to `-0.02em`) and solid semi-bold weights (`600`) to articulate academic structure without shouting.

## Layout & Spacing

The structural layout uses a fixed-max-width responsive grid system engineered for content clarity and density control.

### Screen Adaptability & Grid Structure
- **Desktop (≥ 1280px):** 12-column grid, max-width `1280px`, centered with `margin-lg` (3rem / 48px) and `gutter` (1.5rem / 24px).
- **Tablet (768px – 1279px):** 8-column grid with `margin` (1.5rem / 24px) and `gutter-sm` (1rem / 16px).
- **Mobile (< 768px):** 4-column fluid grid, `margin-sm` (1rem / 16px) and `gutter-sm` (1rem / 16px).

### Section-Level Alternation
To avoid cognitive exhaustion from continuous white fields, alternate primary sections between the default canvas (`#FFFFFF`) and the secondary ambient mist (`#F5F8FC`). Apply vertical section spacing at `space-xl` scaled to double (`4rem`) on desktop displays.

## Elevation & Depth

This design system avoids heavy shadows, skewing instead toward clinical precision through low-contrast hairline outlines and tonal stacking.

### Depth Hierarchy
1. **Base Layer (Ground Zero):** Default canvas (`#FFFFFF`) or alternate mist (`#F5F8FC`).
2. **Surface Layer (Cards, Data Panels):** Pure white container with a 1px border (`#D5DEE8`). Shadows are avoided or limited to an ambient perimeter: `0 1px 3px 0 rgba(5, 24, 61, 0.04)`.
3. **Elevated Interactive Layer (Dropdowns, Menus, Hover Cards):** Outlined with `#D5DEE8`, backed by `#FFFFFF`, with a defined ambient drop: `0 4px 12px 0 rgba(5, 24, 61, 0.08)`.
4. **Modal Layer (Research Job Launchers, Confirmations):** Backdrop scrim set to `#05183D` at 40% opacity with a blur of `4px`. Modal container uses `0 12px 32px 0 rgba(5, 24, 61, 0.16)`.

## Shapes

The geometric vocabulary balances modern ergonomics with technical structure. The system implements a hierarchical radius rule:

- **Form Controls & Micro Elements:** `border-radius: 4px` (Inputs, textareas, code blocks, segment tags). Provides a clean, clinical edge suitable for high-density forms.
- **Interactive Action Elements:** `border-radius: 8px` (Buttons, action triggers, toggle groupings). Soft enough to clearly signify interactability without feeling playful.
- **Structural Containers:** `border-radius: 12px` (Cards, telemetry clusters, academic project abstracts).
- **Status Indicators & Avatars:** Fully rounded (`rounded-full` / `9999px`) for state indicators, status dots, and pill chips.

## Components

### 1. Buttons
- **Height & Layout:** Strict minimum height of `44px` across all primary and secondary buttons to ensure touch target accessibility. Inline padding of `20px` (`space-lg`), horizontal gap of `8px` between icons and text.
- **Typography:** Noto Sans `14px`, Weight `600`, Line-height `20px`.
- **Primary Action:** Solid background `#005A9C`, text `#FFFFFF`, border-radius `8px`. Hover: `#004B82`. Active: `#003B6D`. Focus: `2px` offset ring in `#048CF2`.
- **Secondary / Outline:** Background `transparent`, border `1px solid #D5DEE8`, text `#005A9C`. Hover: Background `#F5F8FC`, border `#005A9C`.
- **Ghost Action:** Background `transparent`, text `#05183D`. Hover: Background `#F5F8FC`.

### 2. Form Inputs & Selects
- **Geometry:** Border-radius `4px`, padding `10px 12px`, minimum height `44px` on mobile/tablet (or standard `42px` desktop container).
- **Borders & Fill:** 1px solid `#D5DEE8`, background `#FFFFFF`.
- **Text & Placeholder:** Input value `#05183D`, placeholder text `#64748B`.
- **Focus State:** Border color `#005A9C` with a `2px` ambient halo in `rgba(4, 140, 242, 0.25)`.
- **Validation Error:** Border color `#B42318`, background `#FEF2F2`, helper text `#B42318` (`12px` font size).

### 3. Cards & Panels
- **Structure:** Background `#FFFFFF`, 1px solid border `#D5DEE8`, border-radius `12px`, internal padding `24px`.
- **Header Treatment:** Card title in `#05183D` (`headline-sm`, `18px/600`), metadata or subtitles in `#475569` (`body-sm`, `14px`). Optional divider line `#D5DEE8` separating content and footer action zones.
- **Interactive Cards:** Hover shifts the border color to `#005A9C` and engages elevation layer 3 (`0 4px 12px 0 rgba(5, 24, 61, 0.08)`).

### 4. Chips & Tags
- **Structure:** Height `24px` to `28px`, padding `2px 10px`, border-radius `9999px`.
- **Neutral / Meta Tag:** Background `#F5F8FC`, border `1px solid #D5DEE8`, text `#475569` (`label-md`).
- **Success / Healthy Cluster State:** Background `#F0FDF4`, border `1px solid #BBF7D0`, text `#166534`.
- **Computational Allocation / Active Job:** Background `#E0F2FE`, border `1px solid #BAE6FD`, text `#0369A1`.

### 5. Selection Controls (Checkboxes & Radios)
- **Geometry:** Minimum target area of `44x44px` with visual indicator size of `18x18px`. Checkbox has a `3px` corner radius; radio is fully circular (`50%`).
- **Unchecked:** Border `1.5px solid #D5DEE8`, background `#FFFFFF`.
- **Checked:** Background `#005A9C`, border `#005A9C`, white glyph indicator.

### 6. Domain-Specific Component: Computational Cluster Monitor
- **Structure:** Clean tabular ledger. Headings in `#475569` (`label-sm`, uppercase, tracking `0.05em`).
- **Metric Row:** Height `48px`, row divider `1px solid #D5DEE8`. Text in tabular numbers (`#05183D`).
- **Telemetry Indicators:** Monospace subtext for node addresses (`12px`), accompanied by a `6px` status dot indicating node availability (Green `#166534`, Warning `#D97706`, Offline `#B42318`).