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
