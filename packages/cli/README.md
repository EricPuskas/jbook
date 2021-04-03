An interactive coding environment. You can write Javascript, see it executed, and write comprehensive documentation using markdown.

### Quick start:

`npx jbook-cli serve`

### CLI:

`npx jbook-client serve test.js`

- Creates a `test.js` file where your content will be stored, you can also share this file with others.

`npx jbook-client serve -p 3001`

- Choose the port where to serve the app

### Features:

- Click cells to edit
- The code in each editor is all joined together into one file. If you define a variable in cell #1, you can refer to it in any following cell.
- You can show any React component, string, number, or anything else by calling the `show` function. This is a function built into this environment. Call show multiple times to show multiple values.
- Re-order or delete cells using the buttons on the top right.
- Add new cells by hovering on the divider between each cell.
