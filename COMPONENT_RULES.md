# Component Creation Rules - Eventio

This document defines the standards and guidelines for creating components in the Eventio Next.js application.

## 1. Component Structure & Organization

### Directory Structure

```
src/components/
├── ComponentName/
│   ├── index.tsx                     # Main component
│   ├── ComponentName.module.scss     # Component styles (optional)
│   ├── types.ts                      # Component types (if complex)
│   └── SubComponentName              # Main component
│       ├── index.tsx                     # Sub component
│       ├── SubComponentName.module.scss  # Sub Component styles (optional)
│       ├── types.ts                      # Sub Component types (if complex)
```

### Naming Conventions

- **Directories**: `PascalCase` (e.g., `TextField`, `FormGroup`)
- **Components**: `PascalCase` (e.g., `TextField`, `FormGroup`)
- **Files**: `index.tsx` for main component, `ComponentName.module.scss` for styles
- **Interfaces**: `ComponentNameProps` (e.g., `TextFieldProps`, `ButtonProps`)

### Export Pattern

```typescript
// src/components/ComponentName/index.tsx
export { ComponentName } from './ComponentName'
export type { ComponentNameProps } from './types'

// OR for simple components:
function ComponentName(props: ComponentNameProps) {
  // implementation
}

export { ComponentName }
```

## 2. TypeScript Guidelines

### Interface Definition

```typescript
// Extend HTML element props when appropriate
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  variant?: 'primary' | 'secondary'
}

// For input components, use forwardRef pattern
interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
  label?: string
}
```

### Component Implementation Patterns

#### Standard Component

```typescript
interface ComponentProps {
  children: React.ReactNode
  variant?: 'default' | 'alternative'
}

function Component({
  children,
  variant = 'default',
  ...props
}: ComponentProps) {
  return (
    <div className={clsx('component', 'component--${variant}')} {...props}>
      {children}
    </div>
  )
}

export { Component }
```

#### ForwardRef Component (for form inputs)

```typescript
const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ error, label, ...props }, ref) => {
    return (
      <>
        {label && <label htmlFor={props.id}>{label}</label>}
        <input
          {...props}
          ref={ref}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${props.id}-error` : undefined}
        />
        {error && (
          <div id={`${props.id}-error`} role="alert">
            {error}
          </div>
        )}
      </>
    )
  }
)

export { TextField }
```

## 3. Styling Standards

### SCSS Integration

- Use existing design tokens from `src/styles/`
- Follow the established color, spacing, and typography system
- Use CSS modules for component-specific styles

```scss
// ComponentName.module.scss
@import '@/styles/colors';
@import '@/styles/spacing';
@import '@/styles/typography';

.component {
  color: var(--gray-1000);
  padding: $space-100;

  &--variant {
    background-color: var(--green-100);
  }
}
```

### Design Token Usage

```scss
// Colors (defined in _spacing.scss)
color: var(--gray-1000);
background-color: var(--green-100);

// Named colors (defined in _theme.scss)
color: var(--text-500);
background-color: var(--area-100);

// Spacing (defined in _spacing.scss)
padding: $space-100;
margin: $space-200;
gap: $space-300;
```

### Layout Components

- **Purpose**: Page structure and layout management
- **Location**: `src/components/Layout/`
- **Examples**: Container, Grid, Stack, PageHeader

### Module Components

- **Purpose**: Feature-specific components
- **Location**: `src/modules/{feature}/components/`
- **Pattern**: Can be more complex, integrate multiple UI components

## 5. Development Standards

### Accessibility Requirements

- Use semantic HTML elements
- Include proper ARIA attributes
- Support keyboard navigation
- Provide error announcements
- Ensure color contrast compliance

```typescript
// Good accessibility example
<button
  aria-label="Close modal"
  aria-expanded={isOpen}
  onClick={handleClose}
  onKeyDown={handleKeyDown}
>
  <CloseIcon aria-hidden="true" />
</button>
```

## 6. Form Integration

### React Hook Form Integration

```typescript
// Form component using React Hook Form
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextField } from '@/components/Form'

function MyForm() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <TextField
        {...form.register('fieldName')}
        error={form.formState.errors.fieldName?.message}
      />
    </form>
  )
}
```

## 7. Testing & Documentation

### Storybook Stories

```typescript
// ComponentName.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { ComponentName } from './ComponentName'

const meta: Meta<typeof ComponentName> = {
  title: 'Components/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Default state',
  },
}

export const Loading: Story = {
  args: {
    children: 'Loading state',
    loading: true,
  },
}
```

## 9. Checklist for New Components

### Before Creating

- [ ] Check if similar component already exists
- [ ] Determine if it should be in `components/` or `modules/`
- [ ] Plan the component API and props interface
- [ ] Consider accessibility requirements

### During Development

- [ ] Follow naming conventions
- [ ] Use TypeScript interfaces properly
- [ ] Implement proper error handling
- [ ] Add accessibility attributes
- [ ] Follow styling guidelines
- [ ] Test with different prop combinations

### After Implementation

- [ ] Create Storybook stories
- [ ] Document any special usage patterns
- [ ] Review with team if complex
- [ ] Ensure it integrates well with existing components

---

**Remember**: Consistency is key. When in doubt, look at existing components in the codebase for patterns and follow the established conventions.
