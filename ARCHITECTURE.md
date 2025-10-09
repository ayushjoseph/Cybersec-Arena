# CyberSec Arena - Architecture Overview

## SOLID Principles Implementation

This project has been refactored to follow SOLID principles, creating a clean, maintainable, and extensible architecture.

## Project Structure

```
src/
├── types/
│   └── progress.ts                    # Shared type definitions
├── services/
│   ├── storage/
│   │   ├── IProgressStorage.ts        # Storage interface (abstraction)
│   │   ├── LocalStorageService.ts     # localStorage implementation
│   │   └── SupabaseStorageService.ts  # Supabase implementation
│   ├── BadgeService.ts                # Badge calculation logic
│   ├── ProgressCalculationService.ts  # Score/percentage calculations
│   ├── QuizDifficultyAdapter.ts       # Quiz difficulty adaptation
│   └── README.md                      # Detailed service documentation
├── config/
│   └── storage.ts                     # Storage factory (DI configuration)
├── lib/
│   └── progress.tsx                   # Progress provider (orchestration)
└── ...
```

## Key Architectural Decisions

### 1. Storage Abstraction Layer
- **Interface**: `IProgressStorage` defines the contract
- **Implementations**: LocalStorage and Supabase
- **Benefit**: Can swap storage backends without changing application code

### 2. Service-Based Architecture
Each service has a single, well-defined responsibility:

- **BadgeService**: Determines which badges users earn based on progress
- **ProgressCalculationService**: Calculates overall scores and percentages
- **QuizDifficultyAdapter**: Manages adaptive quiz difficulty
- **Storage Services**: Handle data persistence

### 3. Dependency Injection
The `ProgressProvider` accepts a storage service as a prop:
```typescript
<ProgressProvider storage={storageService}>
  <App />
</ProgressProvider>
```

This allows for:
- Easy testing with mock services
- Runtime storage backend switching
- No hard-coded dependencies

### 4. Factory Pattern
`createStorageService()` automatically selects the appropriate storage:
- Uses Supabase if credentials are configured
- Falls back to localStorage otherwise

## Data Flow

```
User Action (CTF solved, quiz answered, etc.)
    ↓
Component calls useProgress() hook
    ↓
ProgressProvider updates state
    ↓
Services process the update:
  • BadgeService computes new badges
  • ProgressCalculationService calculates scores
  • QuizDifficultyAdapter adjusts difficulty
    ↓
Storage Service persists the data
    ↓
UI updates with new state
```

## SOLID Principles Demonstrated

### Single Responsibility Principle (SRP)
✅ Each service has one reason to change
- `BadgeService` only changes if badge rules change
- `LocalStorageService` only changes if localStorage logic changes

### Open/Closed Principle (OCP)
✅ Open for extension, closed for modification
- Add new storage backend by implementing `IProgressStorage`
- Add new badge rules via `BadgeService.addCustomRule()`

### Liskov Substitution Principle (LSP)
✅ Storage implementations are interchangeable
```typescript
const storage: IProgressStorage =
  useSupabase
    ? new SupabaseStorageService(url, key)
    : new LocalStorageService();
```

### Interface Segregation Principle (ISP)
✅ Focused, minimal interfaces
- `IProgressStorage` only defines what's needed for storage
- Services expose only necessary methods

### Dependency Inversion Principle (DIP)
✅ Depend on abstractions, not concretions
- `ProgressProvider` depends on `IProgressStorage` interface
- Concrete implementations injected at runtime

## Testing Strategy

The architecture enables comprehensive testing:

```typescript
// Unit test a service
const badgeService = new BadgeService();
const badges = badgeService.computeBadges(mockProgress);

// Integration test with mock storage
const mockStorage: IProgressStorage = {
  load: jest.fn().mockResolvedValue(testData),
  save: jest.fn(),
  clear: jest.fn(),
};

render(
  <ProgressProvider storage={mockStorage}>
    <Dashboard />
  </ProgressProvider>
);
```

## Benefits Achieved

1. **Maintainability**: Small, focused modules
2. **Testability**: Services can be tested in isolation
3. **Extensibility**: Easy to add new features
4. **Flexibility**: Runtime configuration of storage backend
5. **Type Safety**: Full TypeScript support
6. **No Breaking Changes**: All existing functionality preserved

## Current State

- ✅ All functionality working as before
- ✅ SOLID principles applied throughout
- ✅ Ready for Supabase integration (when configured)
- ✅ Builds successfully
- ✅ No breaking changes to existing features

## Next Steps

When ready to add Supabase:
1. Configure Supabase credentials in `.env`
2. Run database migrations (see `SUPABASE_SETUP.md`)
3. The app automatically switches to Supabase storage

No code changes required!
