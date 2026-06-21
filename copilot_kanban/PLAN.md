# Kanban MVP Implementation Plan

## Problem Statement
Build a minimal viable product (MVP) for a Kanban-style project management web application with a focus on simplicity and elegant UI/UX. The application will be a modern Next.js client-rendered app with no persistence, featuring a single board with 5 customizable columns, drag-and-drop functionality, and basic card management.

## Proposed Approach
Follow the strategy outlined in AGENTS.md:
1. Create comprehensive plan with success criteria
2. Execute plan with rigorous unit testing
3. Perform extensive integration testing with Playwright
4. Deliver tested, running MVP

## Workplan

### Phase 1: Project Setup & Scaffolding
- [x] Create Next.js application in `frontend` subdirectory
- [x] Configure TypeScript and ESLint
- [x] Set up proper `.gitignore` file
- [x] Install core dependencies (React, Next.js latest versions)
- [x] Install drag-and-drop library (e.g., @dnd-kit or react-beautiful-dnd)
- [x] Configure Tailwind CSS or similar for styling
- [x] Set up project structure (components, types, utils)
- [x] Verify dev server runs successfully

**Success Criteria:**
- Next.js app created in `frontend/` directory
- All dependencies installed without errors
- Dev server starts and shows default Next.js page
- `.gitignore` properly excludes node_modules, .next, etc.

### Phase 2: Data Model & State Management
- [x] Define TypeScript interfaces for Card and Column
- [x] Create initial dummy data structure (1 board, 5 columns, sample cards)
- [x] Set up state management (React hooks or context)
- [x] Implement data initialization on app load

**Success Criteria:**
- Type-safe data models defined
- Dummy data loads on application start
- State updates work correctly

### Phase 3: Core UI Components
- [x] Create Board component (main container)
- [x] Create Column component with rename functionality
- [x] Create Card component (title + details)
- [x] Implement color scheme from AGENTS.md specifications
- [x] Apply professional, modern styling
- [x] Ensure responsive layout

**Success Criteria:**
- All components render with dummy data
- Color scheme matches specifications exactly
- UI looks professional and polished
- Layout works on different screen sizes

### Phase 4: Drag & Drop Functionality
- [x] Integrate drag-and-drop library
- [x] Implement card dragging between columns
- [x] Update state when cards are moved
- [x] Add visual feedback during drag operations
- [x] Ensure smooth animations and transitions

**Success Criteria:**
- Cards can be dragged between any columns
- State updates persist during session
- Visual feedback is clear and intuitive
- No flickering or layout issues

### Phase 5: Card Management Features
- [x] Implement "Add Card" functionality for each column
- [x] Create card input form (title + details)
- [x] Implement "Delete Card" functionality
- [x] Add appropriate UI controls (buttons, icons)

**Success Criteria:**
- New cards can be added to any column
- Cards can be deleted from any column
- Form validation works properly
- UI controls are intuitive

### Phase 6: Column Customization
- [x] Implement column rename functionality
- [x] Add inline editing for column titles
- [x] Preserve renamed column titles in state

**Success Criteria:**
- Column titles can be renamed
- Renamed titles persist during session
- Editing UI is smooth and intuitive

### Phase 7: Unit Testing
- [x] Set up Jest and React Testing Library
- [x] Write unit tests for Card component
- [x] Write unit tests for Column component
- [x] Write unit tests for Board component
- [x] Write tests for state management logic
- [x] Write tests for data initialization
- [x] Achieve good test coverage for core functionality

**Success Criteria:**
- All unit tests pass
- Core components have test coverage
- State management logic is tested
- No regression errors

### Phase 8: Integration Testing with Playwright
- [x] Install and configure Playwright
- [x] Write test: Board loads with dummy data
- [x] Write test: Drag card between columns
- [x] Write test: Add new card to column
- [x] Write test: Delete existing card
- [x] Write test: Rename column title
- [x] Write test: Full user workflow (add, move, delete cards)
- [x] Fix any defects discovered during testing

**Success Criteria:**
- Playwright configured and running
- All integration tests pass
- No critical bugs in user workflows
- Edge cases handled gracefully

### Phase 9: Final Polish & Validation
- [x] Review UI/UX for consistency and polish
- [x] Verify all color scheme values match specifications
- [x] Test application thoroughly by hand
- [x] Ensure no console errors or warnings
- [x] Verify all AGENTS.md requirements are met
- [x] Update README with build/run instructions (keep minimal, no emojis)

**Success Criteria:**
- UI is slick, professional, and gorgeous
- No console errors or warnings
- All requirements from AGENTS.md satisfied
- README provides clear instructions

### Phase 10: Deployment Readiness
- [x] Start development server
- [x] Perform final smoke test
- [x] Verify app is ready for user demonstration

**Success Criteria:**
- Server runs without errors
- All features work as expected
- Application is ready for user

## Key Technical Decisions

### Technology Stack
- **Framework:** Next.js (latest version, client-rendered)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (or CSS Modules)
- **Drag & Drop:** @dnd-kit (modern, accessible) or react-beautiful-dnd
- **Testing:** Jest + React Testing Library + Playwright
- **State Management:** React Context + Hooks (no Redux for simplicity)

### Color Palette
- Accent Yellow: #ecad0a (accent lines, highlights)
- Blue Primary: #209dd7 (links, key sections)
- Purple Secondary: #753991 (submit buttons, important actions)
- Dark Navy: #032147 (main headings)
- Gray Text: #888888 (supporting text, labels)

### Constraints & Principles
- No persistence (in-memory only)
- No user management
- No archive or search features
- Keep implementation simple - avoid over-engineering
- Focus on UI/UX quality over feature quantity
- Use latest idiomatic approaches
- No unnecessary defensive programming
- No emojis in documentation

## Notes & Considerations

1. **Simplicity First:** The AGENTS.md explicitly emphasizes keeping things simple and avoiding over-engineering. Every decision should favor simplicity.

2. **UI/UX Priority:** The priority is a "slick, professional, gorgeous UI/UX" - this should be the main focus, not adding extra features.

3. **Testing Strategy:** Rigorous testing is required - both unit tests and integration tests must be comprehensive.

4. **No Persistence:** Since there's no backend or persistence, all state lives in React during the session. This simplifies the architecture significantly.

5. **Fixed Scope:** Resist any temptation to add features beyond what's specified. The requirements explicitly state: no archive, no search/filter, no user management.

6. **Modern Practices:** Use the latest versions of libraries and follow current best practices as of 2026.

## Bug Fixes

### Card Reordering Bug (Fixed 2026-06-21)
**Issue:** Cards disappeared when trying to reorder them within the same column.

**Root Cause:** When moving a card within the same column, the `moveCard` function was:
1. Removing the card from the source column
2. Inserting it at the destination index

This caused index shifting issues because the destination index was calculated before removal, but insertion happened after removal.

**Fix:** Modified `BoardContext.tsx` `moveCard` function to handle same-column reordering as a special case:
- When source and destination columns are the same, perform atomic remove+insert operation
- Adjusted `Board.tsx` `handleDragEnd` to compensate for index shifting when dragging down in the same column

**Testing:** Added unit test "reorders card within same column" to prevent regression.
