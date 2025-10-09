# Services Architecture

This project follows SOLID principles to create a maintainable, testable, and extensible architecture.

## SOLID Principles Applied

### 1. Single Responsibility Principle (SRP)
Each service has one clear responsibility:
- **IProgressStorage**: Interface defining storage operations
- **LocalStorageService**: Handles localStorage persistence
- **SupabaseStorageService**: Handles Supabase database persistence
- **BadgeService**: Manages badge calculation logic
- **ProgressCalculationService**: Handles score and percentage calculations
- **QuizDifficultyAdapter**: Manages quiz difficulty transitions

### 2. Open/Closed Principle (OCP)
The system is open for extension but closed for modification:
- New storage backends can be added by implementing `IProgressStorage`
- New badge rules can be added via `BadgeService.addCustomRule()`
- No need to modify existing code to extend functionality

### 3. Liskov Substitution Principle (LSP)
Any implementation of `IProgressStorage` can be substituted:
```typescript
const storage = useLocalStorage
  ? new LocalStorageService()
  : new SupabaseStorageService(url, key);
```

### 4. Interface Segregation Principle (ISP)
Interfaces are focused and specific:
- `IProgressStorage` only defines what's needed for storage operations
- Services expose only the methods they need to perform their function

### 5. Dependency Inversion Principle (DIP)
High-level modules depend on abstractions:
- `ProgressProvider` depends on `IProgressStorage` interface, not concrete implementations
- Can easily inject different storage implementations for testing or production

## Architecture Overview

```
┌─────────────────────────────────────────┐
│          React Components               │
│  (Dashboard, CTF, Profile, etc.)        │
└───────────────┬─────────────────────────┘
                │ useProgress()
                ▼
┌─────────────────────────────────────────┐
│        ProgressProvider                 │
│  (Orchestrates services)                │
└─────┬───────┬──────────┬────────┬───────┘
      │       │          │        │
      ▼       ▼          ▼        ▼
┌─────────┐ ┌──────┐ ┌────────┐ ┌──────────┐
│ Storage │ │Badge │ │Progress│ │Difficulty│
│ Service │ │Service│ │Calc    │ │Adapter   │
└─────────┘ └──────┘ └────────┘ └──────────┘
      │
      ▼
┌─────────────────┐
│  IProgressStorage│
│   (Interface)    │
└────────┬─────────┘
         │
    ┌────┴─────┐
    ▼          ▼
┌─────────┐ ┌──────────┐
│LocalStorage│ Supabase  │
│Service   │ │Service   │
└─────────┘ └──────────┘
```

## Switching Storage Backends

### Using LocalStorage (Default)
```typescript
<ProgressProvider>
  <App />
</ProgressProvider>
```

### Using Supabase
```typescript
import { SupabaseStorageService } from './services/storage/SupabaseStorageService';

const supabaseStorage = new SupabaseStorageService(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

<ProgressProvider storage={supabaseStorage}>
  <App />
</ProgressProvider>
```

## Creating Custom Storage
Implement the `IProgressStorage` interface:

```typescript
export class CustomStorage implements IProgressStorage {
  async load(): Promise<ProgressState | null> {
    // Your implementation
  }

  async save(state: ProgressState): Promise<void> {
    // Your implementation
  }

  async clear(): Promise<void> {
    // Your implementation
  }
}
```

## Testing
Services can be easily mocked for unit testing:

```typescript
const mockStorage: IProgressStorage = {
  load: jest.fn().mockResolvedValue(mockProgress),
  save: jest.fn().mockResolvedValue(undefined),
  clear: jest.fn().mockResolvedValue(undefined),
};

<ProgressProvider storage={mockStorage}>
  <ComponentUnderTest />
</ProgressProvider>
```

## Benefits

1. **Maintainability**: Each service is small and focused
2. **Testability**: Services can be tested in isolation
3. **Extensibility**: Easy to add new features without breaking existing code
4. **Flexibility**: Swap implementations at runtime or configuration
5. **Type Safety**: Full TypeScript support with clear interfaces
