# Component Creation Rules - Eventio

This document defines the standards and guidelines for creating components in the Eventio Next.js application.

## 1. Component Structure & Organization

### Directory Structure

```
src/components/
├── ComponentName/
│   ├── index.tsx          # Main component
│   ├── ComponentName.module.scss  # Component styles (optional)
│   └── types.ts           # Component types (if complex)
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
export function ComponentName(props: ComponentNameProps) {
  // implementation
}
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

export function Component({
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
```

#### ForwardRef Component (for form inputs)

```typescript
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
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

TextField.displayName = 'TextField'
```

### Type Imports

```typescript
// Prefer type-only imports
import type { ButtonHTMLAttributes } from 'react'
import type { ComponentProps } from './types'

// Regular imports for components and utilities
import { forwardRef } from 'react'
import { clsx } from 'clsx'
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

## 4. Component Categories & Templates

### UI Components (Basic Building Blocks)

- **Purpose**: Reusable interface elements
- **Location**: `src/components/`
- **Examples**: Button, TextField, Label, Card
- **Pattern**: Extend HTML element props, focus on reusability

```typescript
// Example: Button component
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`btn btn--${variant} btn--${size}`}
    >
      {loading ? 'Loading...' : children}
    </button>
  )
}
```

### Form Components

- **Purpose**: Form inputs with validation support
- **Location**: `src/components/Form/`
- **Pattern**: Use forwardRef, integrate with React Hook Form
- **Accessibility**: Include proper ARIA attributes

```typescript
export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ error, required, label, ...props }, ref) => {
    const fieldId = props.id || generateId()

    return (
      <div className="form-field">
        {label && (
          <Label htmlFor={fieldId} required={required}>
            {label}
          </Label>
        )}
        <input
          {...props}
          ref={ref}
          id={fieldId}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${fieldId}-error` : undefined}
          aria-required={required}
        />
        {error && (
          <div
            id={`${fieldId}-error`}
            role="alert"
            className="form-field__error"
          >
            {error}
          </div>
        )}
      </div>
    )
  }
)
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

### Client vs Server Components

```typescript
// Server Component (default)
export function ServerComponent({ data }: Props) {
  return <div>{data}</div>
}

// Client Component (when needed)
;('use client')

import { useState } from 'react'

export function ClientComponent() {
  const [state, setState] = useState()
  // Interactive logic
}
```

### Import Conventions

```typescript
// 1. React and third-party imports
import { forwardRef } from 'react'
import { clsx } from 'clsx'

// 2. Type imports
import type { InputHTMLAttributes } from 'react'

// 3. Local imports (using @/ alias)
import { Button } from '@/components/Button'
import type { ComponentProps } from '@/types'

// 4. Relative imports
import { localUtility } from './utils'
```

### Error Handling

```typescript
interface ComponentProps {
  fallback?: React.ReactNode
}

export function Component({ fallback = null }: ComponentProps) {
  try {
    // Component logic
    return <div>Content</div>
  } catch (error) {
    console.error('Component error:', error)
    return fallback
  }
}
```

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

### Server Action Integration

```typescript
// Component with server action
import { useAuth } from '@/providers/AuthProvider'

function ActionComponent() {
  const { login, error, isExecuting } = useAuth()

  return (
    <Button
      onClick={() => login(data)}
      loading={isExecuting}
      disabled={isExecuting}
    >
      Submit
    </Button>
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

## 8. Performance Guidelines

### Code Splitting

```typescript
// Lazy load heavy components
import { lazy, Suspense } from 'react'

const HeavyComponent = lazy(() => import('./HeavyComponent'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  )
}
```

### Memoization

```typescript
import { memo, useMemo, useCallback } from 'react'

const ExpensiveComponent = memo(function ExpensiveComponent({ data }: Props) {
  const processedData = useMemo(() => {
    return expensiveProcessing(data)
  }, [data])

  const handleClick = useCallback(() => {
    // Handler logic
  }, [dependency])

  return <div>{processedData}</div>
})
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

## 10. Common Patterns

### Conditional Rendering

```typescript
// Use logical operators for simple conditions
{
  error && <ErrorMessage>{error}</ErrorMessage>
}

// Use ternary for if/else
{
  loading ? <Spinner /> : <Content />
}

// Use early returns for complex conditions
if (!data) {
  return <EmptyState />
}
```

### Props Forwarding

```typescript
// Spread remaining props to underlying element
function Component({ customProp, ...props }: Props) {
  return <div {...props}>{/* Component content */}</div>
}
```

### Compound Components

```typescript
// For related components that work together
function Form({ children }: FormProps) {
  return <form>{children}</form>
}

function FormField({ children }: FormFieldProps) {
  return <div className="form-field">{children}</div>
}

Form.Field = FormField

// Usage: <Form><Form.Field>...</Form.Field></Form>
```

---

**Remember**: Consistency is key. When in doubt, look at existing components in the codebase for patterns and follow the established conventions.
