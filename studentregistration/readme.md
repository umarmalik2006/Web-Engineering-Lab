Files 
- `index.html` — main HTML file (semantic markup, accessibility attributes)
- `styles.css` — all styling (responsive, CSS variables, grid/flex)
- `preview.png` — (optional) screenshot preview if provided
## How to run
1. Save `index.html` and `styles.css` into the same folder.
2. Open `index.html` in any modern browser (Chrome, Firefox, Edge, Safari).
3. No server or JavaScript required.
## What is assessed
- Use of semantic HTML (`header`, `main`, `form`, `fieldset`, `legend`, `label`,
etc.).
- Variety of form controls: text, email, tel, date, file, radio, checkbox,
select, optgroup, datalist, textarea.
- Accessibility: `label` elements, ARIA grouping for radio buttons, `required`
attributes, helper text with `aria-describedby`.
- Responsive layout: two-column desktop, stacked mobile using CSS Grid and media
queries.
- Visual polish: CSS variables, focus states, transitions, and consistent
spacing.
## Notes
- Password validation uses a HTML `pattern` for a simple rule (minimum 8 chars,
1 uppercase, 1 digit). In real deployments, server-side validation is mandatory.
- This solution intentionally uses only HTML and CSS as required by the task.
