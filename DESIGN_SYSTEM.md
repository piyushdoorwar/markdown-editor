# Premium Dark Design System

## Color Palette

### Primary Colors
- **Purple**: `#6739B7` - Main brand color, used for interactive elements
- **Purple Light**: `#8B5CF6` - Hover states and highlights
- **Purple Dark**: `#5B21B6` - Active states

### Secondary Colors
- **Yellow/Gold**: `#FFD700` - Primary CTAs and accents
- **Yellow Dark**: `#FFC700` - Hover states for yellow elements
- **Yellow Light**: `#FFE55C` - Highlights

### Additional Accents
- **Green**: `#00D09C` - Success states and positive actions
- **Pink**: `#FF6B9D` - Special highlights
- **Blue**: `#5DADE2` - Information and links

### Backgrounds
- **Primary BG**: `#0d0d0d` - Main background
- **Secondary BG**: `#1a1a1a` - Secondary surfaces
- **Panel BG**: `#1e1e1e` - Card/panel backgrounds
- **Panel BG Elevated**: `#252525` - Elevated panels and modals

### Text Colors
- **Primary Text**: `#FFFFFF` - Main content
- **Secondary Text**: `#B8B8B8` - Supporting text
- **Muted Text**: `rgba(255, 255, 255, 0.6)` - Disabled or less important text
- **Disabled Text**: `rgba(255, 255, 255, 0.3)` - Completely disabled elements

### Borders
- **Default Border**: `rgba(255, 255, 255, 0.06)` - Subtle borders
- **Light Border**: `rgba(255, 255, 255, 0.1)` - More prominent borders

### Shadows
- **Small**: `0 2px 8px rgba(0, 0, 0, 0.3)`
- **Medium**: `0 8px 24px rgba(0, 0, 0, 0.4)`
- **Large**: `0 16px 48px rgba(0, 0, 0, 0.5)`
- **Purple Glow**: `0 8px 24px rgba(103, 57, 183, 0.3)`
- **Yellow Glow**: `0 8px 24px rgba(255, 215, 0, 0.3)`

## Typography

### Font Families
- **Primary**: Inter (clean, modern sans-serif)
- **Secondary**: Gilroy (headlines and accent text)
- **Monospace**: JetBrains Mono (code blocks)

### Font Weights
- **Regular**: 400
- **Medium**: 500
- **Semibold**: 600
- **Bold**: 700
- **Extra Bold**: 800

## Atmospheric Blueprint

### Surface Spectrum
- **Base Layer**: Start with the solid `--bg` (#0d0d0d) and stack the animated radial gradients defined in `body::before` (purple, yellow, and lavender glows). Keep the animation (`gradientShift` 20s ease infinite) so every tool carries the same slow-breathing premium feel.
- **Secondary Planes**: Use `--bg-secondary`, `--panel-bg`, and `--panel-bg-elevated` to layer panels. Borders stay at `--border` or `--border-light`, and drop in the soft purple/yellow glows (`--shadow-purple` or `--shadow-yellow`) only on interactive lifted states.
- **Viewport Treatment**: Maintain the fixed overlay (`pointer-events: none`) so tools built on this system always sit above that atmospheric wash without blocking inputs.

### App Name & Identity
- Position the name inside the `app-header` with `Inter` 800 weight, 2rem size, and tight letter spacing (–0.02em)
- Use diagonal gradient: `linear-gradient(135deg, var(--accent-yellow), var(--accent-purple-light))`
- Apply with `-webkit-background-clip: text` and `-webkit-text-fill-color: transparent` for text gradient effect
- Keep clean without additional shadows—the gradient provides premium feel

### Action Bar (Toolbar) System
- The `toolbar` is a flexible surface (`display: flex; gap: 0.5rem`) padded with `1rem 1.25rem`, rounded to 20px, and framed by `var(--border)` so it reads as a dedicated action band.
- Give it the same background as elevated panels (`var(--panel-bg)`) plus `var(--shadow-md)` so it hovers above the editor. Keep overflow visible so grouped tooltips can peek through.
- Within that band, group buttons inside `toolbar-group` pods—each group has a semi-transparent fill (`rgba(255, 255, 255, 0.03)`), a subtle border, and 0.25rem vertical padding to visually separate sections without splitting the flow.

### Action Bar Typography & States
- Labels remain uppercase at `0.65rem`, letter-spaced (.12em), and use `var(--text-disabled)` so they read as system captions. The buttons/selects inside the toolbar inherit `Inter` or `JetBrains Mono` (where monospace is needed) and sit at 36px square for consistent touch targets.
- Hovering a `toolbar-btn` shifts it up (`translateY(-2px)`), recolors its background to `var(--accent-purple)`, and turns the icon/text to `var(--text)`. Active/pressed states scale slightly down (0.95) while keeping the purple glow (`--shadow-purple`). Disabled states fade to 0.3 opacity and stop animating.
- Select controls and color swatches mimic the same hover idea: lighten the background, tint the border to `var(--accent-purple)`, and add the purple shadow, while tooltips appear below the hitting target.

### Tooltip Language
- All toolbar tooltips (`toolbar-btn`, `toolbar-select`, `toolbar-color`, `align-btn`, etc.) share the same blueprint: 0.75rem text at weight 500, 0.5rem vertical padding, rounded 10px borders, and the `var(--panel-bg-elevated)` fill with `var(--border-light)` rims. They fade in with a 0.2s transition, slide up from 4px under the trigger, and sit above everything else (`z-index: 1000`).
- When showing success messages (like a copied state), switch the background/border to `var(--accent-yellow)` and text to `var(--bg)` so feedback reads instantly.

### Consuming the System
- Any new tool under this umbrella should reuse the same CSS hooks: apply the radial gradient overlay to the body, keep the gradient-filled title treatment, wrap actions inside the toolbar pattern, and keep hover/tooltip language synchronized. This keeps tools feeling like members of the same premium app family.

## Design Principles

### 1. Dark First
- All backgrounds use dark colors (#0d0d0d to #252525)
- High contrast white text on dark surfaces
- Subtle gradients for depth

### 2. Bold Accents
- Yellow (#FFD700) for primary CTAs and important actions
- Purple (#6739B7) for interactive states and hover effects
- Gradients between yellow and purple for premium feel

### 3. Rounded Corners
- Small elements: 8-12px border-radius
- Cards/Panels: 20-24px border-radius
- Buttons: 10-12px border-radius

### 4. Micro-interactions
- Hover states with `translateY(-2px)` for lift effect
- Active states with `scale(0.95-0.98)`
- Smooth transitions (0.2s ease)
- Glowing shadows on interactive elements

### 5. Subtle Animations
- Animated gradient background
- Smooth color transitions
- Transform-based hover effects

## Component Patterns

### Buttons
- **Primary**: Yellow gradient background with dark text
- **Secondary**: Transparent with purple hover state
- All buttons lift on hover and compress on active

### Cards/Panels
- Dark background (#1e1e1e)
- Subtle top border highlight
- Large border radius (24px)
- Drop shadows for elevation

### Form Inputs
- Dark background with subtle transparency
- Purple border on focus
- Purple glow shadow on focus
- Rounded corners (12px)

### Code Blocks
- Very dark background (rgba(0,0,0,0.4-0.5))
- Purple borders
- Yellow language labels
- Syntax highlighting with brand colors

### Tables
- Purple gradient headers
- Yellow bottom border on headers
- Purple hover effect on rows
- Rounded corners with overflow hidden

## Usage Guidelines

### When to Use Yellow
- Primary call-to-action buttons
- Important labels (like code language tags)
- Links and interactive text
- Active/selected states

### When to Use Purple
- Hover states for buttons and interactive elements
- Focus states for inputs
- Table headers
- Secondary accents
- Scrollbar thumbs

### When to Use Gradients
- Headers and titles (yellow to purple)
- Active button states
- Scrollbars
- Special highlights

## Accessibility

- High contrast ratios (white on dark)
- Clear focus states with purple borders
- Adequate spacing for touch targets (36-44px minimum)
- Readable font sizes (minimum 0.75rem)
