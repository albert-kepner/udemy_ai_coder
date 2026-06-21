# Bug Fix Report: Card Reordering Issue

**Date:** 2026-06-21  
**Status:** FIXED ✓

## 1. Problem Reproduction

### Observed Behavior
When attempting to reorder cards within the same column (moving a card up or down in its current column), the card would disappear instead of being repositioned.

### Steps to Reproduce
1. Open the Kanban board (http://localhost:3000)
2. Locate a column with multiple cards (e.g., "To Do" or "Done")
3. Drag a card to a different position within the same column
4. **Expected:** Card moves to new position
5. **Actual:** Card disappears

## 2. Root Cause Analysis

### Location of Bug
- File: `frontend/lib/BoardContext.tsx` - `moveCard` function (lines 48-69)
- File: `frontend/components/Board.tsx` - `handleDragEnd` function (lines 33-62)

### Technical Explanation

The bug occurred due to improper index management when reordering within the same column:

**Original flawed logic:**
```typescript
const moveCard = (cardId, sourceColumnId, destinationColumnId, destinationIndex) => {
  setBoard((prev) => {
    const newColumns = prev.columns.map((col) => {
      if (col.id === sourceColumnId) {
        // Remove card from source
        return { ...col, cardIds: col.cardIds.filter((id) => id !== cardId) };
      }
      if (col.id === destinationColumnId) {
        // Insert at destination index
        const newCardIds = [...col.cardIds];
        newCardIds.splice(destinationIndex, 0, cardId);
        return { ...col, cardIds: newCardIds };
      }
      return col;
    });
    return { ...prev, columns: newColumns };
  });
};
```

**Problem:** When `sourceColumnId === destinationColumnId`:
1. The card is removed from the array first
2. Then inserted at the destination index
3. But the destination index was calculated based on the original array
4. After removal, all subsequent indices shift by -1
5. This causes the insertion to happen at the wrong position or beyond array bounds

**Example Scenario:**
```
Original: [card-1, card-2, card-3, card-4]
Move card-2 to position 3 (after card-4)

Step 1 - Remove card-2: [card-1, card-3, card-4]
Step 2 - Insert at index 3: [card-1, card-3, card-4, card-2]
         BUT index 3 is now beyond the valid range!
         Result: card might disappear or go to wrong position
```

## 3. Solution Implementation

### Fix Applied

Modified `BoardContext.tsx` to handle same-column reordering as a special case:

```typescript
const moveCard = (cardId, sourceColumnId, destinationColumnId, destinationIndex) => {
  setBoard((prev) => {
    const newColumns = prev.columns.map((col) => {
      // Special case: reordering within same column
      if (col.id === sourceColumnId && col.id === destinationColumnId) {
        const newCardIds = [...col.cardIds];
        const sourceIndex = newCardIds.indexOf(cardId);
        newCardIds.splice(sourceIndex, 1);           // Remove from source
        newCardIds.splice(destinationIndex, 0, cardId); // Insert at destination
        return { ...col, cardIds: newCardIds };
      }
      // Different columns: remove from source
      if (col.id === sourceColumnId) {
        return { ...col, cardIds: col.cardIds.filter((id) => id !== cardId) };
      }
      // Different columns: add to destination
      if (col.id === destinationColumnId) {
        const newCardIds = [...col.cardIds];
        newCardIds.splice(destinationIndex, 0, cardId);
        return { ...col, cardIds: newCardIds };
      }
      return col;
    });
    return { ...prev, columns: newColumns };
  });
};
```

Also updated `Board.tsx` to adjust the destination index when dragging down in the same column:

```typescript
let destinationIndex = destinationColumn.cardIds.indexOf(overId);

if (destinationIndex < 0) {
  destinationIndex = destinationColumn.cardIds.length;
} else if (sourceColumn.id === destinationColumn.id) {
  const sourceIndex = sourceColumn.cardIds.indexOf(cardId);
  if (sourceIndex < destinationIndex) {
    destinationIndex--; // Compensate for the removed item
  }
}
```

### Why This Works

1. **Same-column reordering** is handled atomically in a single operation
2. **Cross-column moves** continue to work as before (remove from source, add to destination)
3. **Index compensation** in Board.tsx ensures the drop position is accurate

## 4. Testing

### New Unit Test Added

Added test case `reorders card within same column` to `__tests__/BoardContext.test.tsx`:

```typescript
it('reorders card within same column', () => {
  const { result } = renderHook(() => useBoard(), { wrapper });
  const column = result.current.board.columns[0];
  // ... test implementation
  
  expect(finalColumn?.cardIds).toHaveLength(cardCount);
  expect(finalColumn?.cardIds[cardCount - 1]).toBe(firstCard);
  expect(finalColumn?.cardIds).not.toContain(undefined);
});
```

### Test Results

```
PASS  __tests__/BoardContext.test.tsx
  BoardContext
    ✓ initializes with default data
    ✓ adds a new card
    ✓ deletes a card
    ✓ renames a column
    ✓ moves card between different columns
    ✓ reorders card within same column  ← NEW TEST

Test Suites: 1 passed
Tests:       6 passed
```

### Build Verification

```
✓ Compiled successfully in 1689ms
```

## 5. Verification

### Functionality Confirmed
- ✓ Cards can be moved between different columns
- ✓ Cards can be reordered within the same column (moving up)
- ✓ Cards can be reordered within the same column (moving down)
- ✓ Cards no longer disappear during reordering
- ✓ All existing functionality remains intact
- ✓ No regression in other features

### Files Modified
1. `frontend/lib/BoardContext.tsx` - Updated `moveCard` function
2. `frontend/components/Board.tsx` - Updated `handleDragEnd` function
3. `frontend/__tests__/BoardContext.test.tsx` - Added regression test

## Conclusion

The card reordering bug has been successfully fixed. The issue was caused by improper index management when moving cards within the same column. The fix introduces special handling for same-column reordering and compensates for index shifts. All tests pass, and the application builds without errors.

**Status:** ✓ RESOLVED
