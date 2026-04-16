I’m working on an Ionic Framework + React.js (TypeScript) project, and I encountered an issue after updating one of my functions.

Previously, everything was working fine, but after I made some changes, I can no longer navigate to the vendor/products page.

Changes I made:
Added bulk quantity controls:
“Add” and “Reduce” quantity buttons
With Confirm and Cancel actions
Implemented functionality to make existing products editable
Issue:
After these updates, navigation to the vendor/products page stopped working.
No major structural changes were made aside from the features above.
What I need help with:
Identify possible causes why navigation to vendor/products is failing
Check if the issue could be related to:
State management changes
Routing issues (React Router / Ionic navigation)
Event handling from the new bulk actions
Component re-rendering or conditional rendering problems
Suggest debugging steps and fixes
If possible, provide a corrected or improved version of the logic
Additional context:
Framework: Ionic + React
Language: TypeScript
Navigation likely uses useHistory or IonReactRouter