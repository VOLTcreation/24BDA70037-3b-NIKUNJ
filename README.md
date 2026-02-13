# 📚 Book Library Application

A simple and interactive book library web application built with modern web technologies. This project helps manage a personal book collection with features to add, search, edit, and remove books.

## 🎯 Project Overview

This is a Next.js-based application that allows users to:
- Add new books with title and author information
- Search through their book collection
- Edit existing book details
- Remove books from the library
- View all books in an organized card layout

## 🛠️ Technologies Used

- **Next.js 15+** - React framework for building fast web applications
- **React 19+** - JavaScript library for building user interfaces
- **TypeScript** - Adds type safety to JavaScript
- **Tailwind CSS** - Utility-first CSS framework for styling
- **shadcn/ui** - High-quality React component library
- **pnpm** - Fast and efficient package manager

## 📦 Project Structure

```
📁 app/
  📄 page.tsx       - Main page component with all application logic
  📄 layout.tsx     - Root layout wrapper
  📄 global.css     - Global styles

📁 components/
  📁 ui/
    📄 button.tsx   - shadcn Button component
    📄 card.tsx     - shadcn Card component
    📄 input.tsx    - shadcn Input component
  📄 library-button.tsx - Custom styled button wrapper

📁 lib/
  📄 utils.ts       - Utility functions (cn for className merging)

📁 public/         - Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- pnpm (or npm/yarn)

### Installation

1. **Clone/navigate to the project directory**
   ```bash
   cd project
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Add shadcn/ui components** (if needed)
   ```bash
   pnpm dlx shadcn@latest add button input card
   ```

4. **Run development server**
   ```bash
   pnpm dev
   ```

5. **Open in browser**
   - Navigate to `http://localhost:3000`

## 📚 How to Use

### Adding a Book
1. Fill in the **"Book title"** field in the form
2. Fill in the **"Author name"** field
3. Click the **"Add Book"** button (blue)
4. Your book appears at the top of the library list

### Searching Books
1. Type in the **search bar** at the top
2. Search works on both title and author names
3. Results update instantly as you type
4. Clear the search to see all books again

### Editing a Book
1. Find the book you want to edit
2. Click the **"Edit"** button (amber color)
3. The book card will show input fields with current data
4. Modify the title and/or author
5. Click **"Save"** to confirm or **"Cancel"** to discard changes

### Removing a Book
1. Find the book you want to remove
2. Click the **"Remove"** button (red color)
3. The book is immediately deleted from the library

## 💻 Component Details

### LibraryButton Component
A reusable button component with three color variants:
- **Add** (Blue) - Used for adding and saving
- **Edit** (Amber) - Used for editing books
- **Remove** (Red) - Used for removing and canceling

### Main Page Component (Home)
Contains all the logic for managing the book library:
- State management using React hooks
- Search filtering functionality
- Book CRUD operations (Create, Read, Update, Delete)

## 🔧 Technical Highlights

### State Management
The app uses React's `useState` hook to manage:
- `query` - Current search input
- `title` & `author` - New book form inputs
- `books` - Array of all books
- `editingId`, `editTitle`, `editAuthor` - Edit mode state

### Data Structure
Each book is an object with:
```typescript
type Book = {
  id: number;        // Unique ID (millisecond timestamp)
  title: string;     // Book title
  author: string;    // Author name
};
```

### Key Functions
- **filteredBooks** - Filters books based on search query (case-insensitive)
- **handleAdd()** - Creates and adds new book to library
- **handleRemove(id)** - Removes book by ID
- **handleEdit(book)** - Enters edit mode for a book
- **handleSaveEdit(id)** - Updates book with new values
- **handleCancelEdit()** - Exits edit mode without saving

## 📖 Code Snippets & Explanations

### 1. Book Type Definition
```typescript
type Book = {
  id: number;
  title: string;
  author: string;
};
```
**Explanation:** This TypeScript type defines the structure of each book object. The `id` uses a timestamp (`Date.now()`) to ensure uniqueness, while `title` and `author` store the book's information.

### 2. State Management Setup
```typescript
const [query, setQuery] = useState('');
const [title, setTitle] = useState('');
const [author, setAuthor] = useState('');
const [books, setBooks] = useState<Book[]>([]);
const [editingId, setEditingId] = useState<number | null>(null);
const [editTitle, setEditTitle] = useState('');
const [editAuthor, setEditAuthor] = useState('');
```
**Explanation:** 
- `query` - Stores the search input for filtering books
- `title` & `author` - Control the "Add Book" form inputs
- `books` - Main array holding all book data
- `editingId` - Tracks which book is currently being edited (null if none)
- `editTitle` & `editAuthor` - Temporary values while editing a book

### 3. Search Filtering Logic
```typescript
const filteredBooks = books.filter((book) => {
  const lowerQuery = query.toLowerCase();
  return (
    book.title.toLowerCase().includes(lowerQuery) ||
    book.author.toLowerCase().includes(lowerQuery)
  );
});
```
**Explanation:** This creates a filtered list based on the search query. It converts both the search term and book data to lowercase for case-insensitive matching, and checks if either the title or author contains the search term.

### 4. Adding a Book
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
**Explanation:** 
- **Validation:** Checks that both fields have content (after trimming whitespace)
- **ID Generation:** Uses `Date.now()` for a unique millisecond timestamp
- **Immutable Update:** Creates a new array with the new book at the start
- **Form Reset:** Clears the input fields after adding

### 5. Editing a Book
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
**Explanation:**
- **handleEdit:** Enters edit mode by storing the book's ID and copying its current values to the edit state
- **handleSaveEdit:** 
  - Validates the edited fields
  - Uses `map()` to create a new array with the updated book
  - Only modifies the book with matching ID (immutable pattern)
  - Exits edit mode and clears edit state

### 6. Removing a Book
```typescript
const handleRemove = (id: number) => {
  setBooks(books.filter((book) => book.id !== id));
};
```
**Explanation:** Uses `filter()` to create a new array excluding the book with the specified ID. This is the React way of removing items while maintaining immutability.

### 7. LibraryButton Component
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
**Explanation:** 
- **Variant System:** Uses an object to map variant names to Tailwind classes
- **cn() Utility:** Merges base classes with variant-specific classes
- **Reusability:** Single component handles all button variants in the app

### 8. Conditional Rendering for Edit Mode
```typescript
{editingId === book.id ? (
  // Show edit form
  <div className="space-y-4">
    <Input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
    <Input value={editAuthor} onChange={(e) => setEditAuthor(e.target.value)} />
    <LibraryButton onClick={() => handleSaveEdit(book.id)} variant="add">
      Save
    </LibraryButton>
  </div>
) : (
  // Show book details
  <div>
    <h2>{book.title}</h2>
    <p>{book.author}</p>
    <LibraryButton onClick={() => handleEdit(book)} variant="edit">
      Edit
    </LibraryButton>
  </div>
)}
```
**Explanation:** Uses a ternary operator to conditionally render either the edit form or the book display based on whether this book is currently being edited.

## 🎨 Styling

The application uses:
- **Tailwind CSS** for responsive and modern design
- **shadcn/ui components** for consistent UI elements
- **Custom ClassNames** merged with the `cn()` utility function

## ✅ Features

- ✨ Clean and intuitive user interface
- 🔍 Real-time search functionality
- 📱 Responsive design (works on mobile, tablet, desktop)
- ✏️ Easy to edit existing books
- 🗑️ Quick removal of books
- 🎨 Beautiful card-based layout
- ⚡ Fast and smooth interactions

## 🐛 Error Handling

The app validates user input:
- Empty title or author fields are not allowed when adding
- Empty fields are not allowed when saving edits
- Invalid input is silently ignored (button does nothing)

## 📝 Notes for Future Work

Potential improvements could include:
- Save books to localStorage for persistence
- Add genre/category tags
- Rating system for books
- Export/import functionality
- Dark mode theme
- Book cover images
- Reading progress tracking

## 👨💻 Author

Written by a student learning Next.js and modern web development!

## 📄 License

This project is open for educational purposes.
