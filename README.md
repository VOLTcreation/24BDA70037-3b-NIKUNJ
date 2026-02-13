# ***24BDA70037***
# 📚 Book Library App

Hey there! Welcome to this simple book library application. Think of it as your personal digital bookshelf where you can keep track of all your books in one place.

## What Is This?

This is a web app I built to help manage a book collection. You can add books, search through them, edit their details, and remove ones you don't need anymore. It's pretty straightforward and does exactly what you'd expect from a book manager.

## What Can You Do With It?

- **Add books** - Just type in the title and author, click a button, and boom—it's in your library
- **Search your collection** - Looking for a specific book? The search bar makes it easy to find
- **Edit book info** - Made a typo? No worries, you can fix it anytime
- **Remove books** - Don't need a book anymore? Just remove it with one click
- **Nice layout** - Everything's organized in cards so it's easy to browse

## What's It Built With?

I used some popular and modern tools to build this:

- **Next.js 15+** - A powerful React framework that makes building web apps easier
- **React 19+** - The popular library for creating interactive user interfaces
- **TypeScript** - Adds type checking to JavaScript, which helps catch bugs early
- **Tailwind CSS** - Makes styling super quick with utility classes
- **shadcn/ui** - Pre-built UI components that look great out of the box
- **pnpm** - A fast package manager (though npm or yarn work too)

## How Everything Is Organized

Here's a quick tour of the project structure:

```
app/
  ├── page.tsx        - The main page where all the magic happens
  ├── layout.tsx      - Wraps everything with a consistent layout
  └── global.css      - Global styling for the whole app

components/
  ├── ui/             - shadcn components (button, card, input)
  └── library-button.tsx - Custom button with color variants

lib/
  └── utils.ts        - Helper functions for the app

public/             - Images and other static files
```

## Getting Started

### What You Need First

- Node.js version 18 or newer
- Either pnpm, npm, or yarn installed

### How to Run It

**1. Go to the project folder**
```bash
cd project
```

**2. Install everything**
```bash
pnpm install
```

**3. Add UI components** (if they're missing)
```bash
pnpm dlx shadcn@latest add button input card
```

**4. Start the dev server**
```bash
pnpm dev
```

**5. Open your browser**

Just go to `http://localhost:3000` and you're good to go!

## How to Actually Use It

### Adding a New Book

It's super easy:
1. Type the book's title in the first field
2. Type the author's name in the second field
3. Click the blue **"Add Book"** button
4. Your book shows up at the top of the list

### Searching for Books

The search bar at the top lets you find books quickly:
- Just start typing—it searches both titles and authors
- Results show up instantly as you type
- Clear the search box to see everything again

### Editing Book Details

Need to fix something?
1. Find the book you want to change
2. Click the amber **"Edit"** button
3. The card turns into a form with the current info
4. Make your changes
5. Click **"Save"** to keep them or **"Cancel"** to forget it

### Removing a Book

Simple as that:
1. Find the book you don't want
2. Click the red **"Remove"** button
3. Poof—it's gone!

## The Cool Technical Stuff

### How the App Remembers Things

The app uses React's state management to keep track of:
- What you're searching for
- The form inputs when adding a book
- All your books in an array
- Which book you're editing (if any)

### What a Book Looks Like (In Code)

Each book is just an object with three things:
```typescript
{
  id: number,      // A unique ID based on when you added it
  title: string,   // The book's title
  author: string   // Who wrote it
}
```

### The Main Functions

Here's what happens behind the scenes:
- **filteredBooks** - Filters your books based on what you search
- **handleAdd** - Adds a new book to the library
- **handleRemove** - Deletes a book
- **handleEdit** - Puts a book into edit mode
- **handleSaveEdit** - Saves your changes
- **handleCancelEdit** - Cancels editing without saving

## Code Snippets & How They Work

Let me show you some of the key code that makes this app tick!

### 1. Setting Up the State

```typescript
const [query, setQuery] = useState('');
const [title, setTitle] = useState('');
const [author, setAuthor] = useState('');
const [books, setBooks] = useState<Book[]>([]);
const [editingId, setEditingId] = useState<number | null>(null);
const [editTitle, setEditTitle] = useState('');
const [editAuthor, setEditAuthor] = useState('');
```

**What's happening here?**  
This is where we set up all the "memory" for the app using React hooks. Each `useState` creates a piece of state that the app can remember and update. For example, `books` holds all your books, `query` remembers what you're searching for, and `editingId` keeps track of which book you're currently editing (if any).

### 2. The Smart Search Feature

```typescript
const filteredBooks = books.filter((book) => {
  const lowerQuery = query.toLowerCase();
  return (
    book.title.toLowerCase().includes(lowerQuery) ||
    book.author.toLowerCase().includes(lowerQuery)
  );
});
```

**What's happening here?**  
This creates a filtered list of books based on your search. It converts everything to lowercase so searches aren't case-sensitive (searching "harry" will find "Harry Potter"). The `includes()` method checks if your search term appears anywhere in either the title or author name. Pretty neat, right?

### 3. Adding a Book to Your Library

```typescript
const handleAdd = () => {
  if (!title.trim() || !author.trim()) {
    return;
  }

  const newBook: Book = {
    id: Date.now(),
    title: title.trim(),
    author: author.trim(),
  };

  setBooks([newBook, ...books]);
  setTitle('');
  setAuthor('');
};
```

**What's happening here?**  
First, we check if both fields actually have something in them (after removing extra spaces with `trim()`). Then we create a new book object with a unique ID using the current timestamp. The cool part is `[newBook, ...books]`—this puts the new book at the beginning of the array, so it shows up first. Finally, we clear the form inputs so you can add another book.

### 4. Removing a Book

```typescript
const handleRemove = (id: number) => {
  setBooks(books.filter((book) => book.id !== id));
};
```

**What's happening here?**  
This is probably the simplest function! It creates a new list that includes every book EXCEPT the one with the ID you want to remove. The `filter()` method only keeps books where `book.id !== id` is true.

### 5. Editing Books

```typescript
const handleEdit = (book: Book) => {
  setEditingId(book.id);
  setEditTitle(book.title);
  setEditAuthor(book.author);
};

const handleSaveEdit = (id: number) => {
  if (!editTitle.trim() || !editAuthor.trim()) {
    return;
  }

  setBooks(
    books.map((book) =>
      book.id === id
        ? { ...book, title: editTitle.trim(), author: editAuthor.trim() }
        : book
    )
  );
  setEditingId(null);
  setEditTitle('');
  setEditAuthor('');
};
```

**What's happening here?**  
`handleEdit` enters "edit mode" by storing which book you're editing and copying its current info. `handleSaveEdit` does the actual updating using `map()`—it goes through all books and only changes the one with the matching ID. The spread operator `{...book}` copies the book object, then we override just the title and author. Finally, we exit edit mode.

### 6. The Custom Button Component

```typescript
export function LibraryButton({
  onClick,
  variant,
  children,
}: LibraryButtonProps) {
  const variantStyles = {
    add: 'bg-blue-600 hover:bg-blue-700',
    remove: 'bg-red-600 hover:bg-red-700',
    edit: 'bg-amber-600 hover:bg-amber-700',
  };

  return (
    <Button
      onClick={onClick}
      className={cn(
        'text-white cursor-pointer font-medium',
        variantStyles[variant]
      )}
    >
      {children}
    </Button>
  );
}
```

**What's happening here?**  
This is a reusable button component with three color variants. Instead of writing separate buttons for each action, we just pass a `variant` prop ("add", "remove", or "edit"), and it applies the right colors. The `cn()` function merges the base styles with the variant-specific colors. Super handy for keeping the code DRY (Don't Repeat Yourself)!

### 7. Conditional Rendering for Edit vs. View Mode

```typescript
{editingId === book.id ? (
  // Edit mode - show input fields
  <div className="space-y-4">
    <Input 
      value={editTitle} 
      onChange={(e) => setEditTitle(e.target.value)} 
    />
    <Input 
      value={editAuthor} 
      onChange={(e) => setEditAuthor(e.target.value)} 
    />
    <LibraryButton onClick={() => handleSaveEdit(book.id)} variant="add">
      Save
    </LibraryButton>
  </div>
) : (
  // View mode - show book details
  <div>
    <h2>{book.title}</h2>
    <p>{book.author}</p>
    <LibraryButton onClick={() => handleEdit(book)} variant="edit">
      Edit
    </LibraryButton>
  </div>
)}
```

**What's happening here?**  
This is how we switch between viewing and editing a book. If the book's ID matches `editingId`, we show input fields. Otherwise, we just display the title and author. It's a ternary operator—basically a shorthand if/else statement that React uses to decide what to render.

## Design and Style

The app looks modern and clean thanks to:
- **Tailwind CSS** - Makes everything responsive and pretty
- **shadcn/ui** - Provides consistent, professional-looking components
- **Custom button variants** - Blue for adding, amber for editing, red for removing

It works great on phones, tablets, and desktops!

## What Makes This App Nice

✨ Clean interface that's easy to understand  
🔍 Live search that updates as you type  
📱 Looks good on any screen size  
✏️ Edit books anytime without hassle  
🗑️ Remove books with a single click  
🎨 Pretty card layout that's easy on the eyes  
⚡ Smooth and fast—no annoying loading times

## Error Prevention

The app won't let you make common mistakes:
- Can't add a book with an empty title or author
- Can't save edits if you leave fields blank
- If you try, the button just won't do anything (no scary error messages though)

## 🛠️ Troubleshooting Common Issues

Running into problems? Here are some common issues and how to fix them:

### "Module not found" errors
If you see errors about missing modules:
```bash
# Delete node_modules and reinstall
rm -rf node_modules
pnpm install
```

### Port 3000 is already in use
If you get a port conflict error:
```bash
# Either kill the process using port 3000
# Or run on a different port
pnpm dev -- -p 3001
```

### shadcn/ui components not working
Make sure you've added all required components:
```bash
pnpm dlx shadcn@latest add button input card
```

### Styling looks broken
Check that Tailwind CSS is properly configured in `tailwind.config.js` and that `global.css` imports Tailwind directives:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### TypeScript errors
If you're getting type errors, make sure all dependencies are installed and try restarting your editor's TypeScript server.

## 💡 React Best Practices Used

This project follows several React best practices:

### Immutable State Updates
Instead of modifying state directly, we always create new arrays:
```typescript
// Good ✅
setBooks([newBook, ...books]);

// Bad ❌
books.push(newBook);
setBooks(books);
```

### Controlled Components
All form inputs are controlled by React state, meaning React is the single source of truth:
```typescript
<Input value={title} onChange={(e) => setTitle(e.target.value)} />
```

### Component Reusability
The `LibraryButton` component is a great example of writing reusable code. Instead of creating three different button components, we use one with variants.

### Meaningful Variable Names
Using descriptive names like `filteredBooks`, `handleSaveEdit`, and `editingId` makes the code self-documenting and easier to understand.

## ⚡ Performance Considerations

The app is pretty fast, but here's why:

### Efficient Filtering
The search filter only runs when the query or books array changes. React is smart enough to not recalculate this on every render.

### Minimal Re-renders
By keeping state close to where it's used and using controlled components properly, we avoid unnecessary re-renders.

### Timestamp IDs
Using `Date.now()` for IDs is simple and efficient. For a small personal library, it's perfect. (For production apps with multiple users, you'd want a more robust solution like UUIDs.)

## 🔄 Development Workflow

Here's how I typically work on this project:

**1. Start the dev server**
```bash
pnpm dev
```

**2. Make changes**  
Edit files in your code editor. The browser auto-refreshes with changes thanks to Next.js Fast Refresh!

**3. Test in the browser**  
Try adding, editing, searching, and removing books to make sure everything works.

**4. Check for TypeScript errors**  
Your editor should highlight any type errors as you code.

**5. Build for production** (optional)
```bash
pnpm build
```

This checks for any build-time errors and optimizes the app.

## 📚 Learning Resources

If you want to learn more about the technologies used:

- **Next.js** - [nextjs.org/docs](https://nextjs.org/docs)
- **React** - [react.dev](https://react.dev)
- **TypeScript** - [typescriptlang.org/docs](https://typescriptlang.org/docs)
- **Tailwind CSS** - [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **shadcn/ui** - [ui.shadcn.com](https://ui.shadcn.com)

## 🎯 Key Takeaways

What I learned building this:
- How to manage state in React
- Working with TypeScript for type safety
- Building reusable components
- Creating a good user experience with instant search
- Using modern tools like Next.js and Tailwind CSS
- The importance of validation and error prevention

## Ideas for the Future

Some things I might add later:
- **LocalStorage persistence** - Save books to your browser so they stick around when you refresh
- **Categories/genres** - Organize books by fiction, non-fiction, sci-fi, etc.
- **Star ratings** - Let you rate books (like 5 stars)
- **Export/import** - Download your library as JSON or import from a file
- **Dark mode** - Toggle for night reading
- **Book covers** - Upload images for each book
- **Reading progress** - Track if you're currently reading, finished, or want to read
- **Sort options** - Sort by title, author, or date added
- **Pagination** - If your library gets huge, show books in pages
- **Advanced search** - Filter by multiple criteria at once

## 🤝 Want to Contribute?

This is a learning project, but if you have ideas or improvements:
1. Fork the repository
2. Make your changes
3. Test everything works
4. Submit a pull request with a clear description

All contributions are welcome—whether it's fixing a typo, adding a feature, or improving the code!

## Who Made This

Just a student learning web development and having fun with Next.js!

## License

Feel free to use this for learning or personal use!

