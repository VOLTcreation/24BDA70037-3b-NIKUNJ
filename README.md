***24BDA70037***

---
# 📚 Book Library Application

A clean and user-friendly book library web app built with modern technologies. This project allows users to organize and manage a personal book collection by adding, searching, updating, and deleting books.

---

## 🎯 Project Overview

This application, built with Next.js, enables users to:

- Add books with title and author details  
- Search through their collection instantly  
- Update existing book information  
- Delete books from the list  
- View all books displayed in a structured card layout  

---

## 🛠️ Technologies Used

- **Next.js 15+** – React framework for building high-performance web apps  
- **React 19+** – Library for creating interactive user interfaces  
- **TypeScript** – Provides static typing for safer JavaScript code  
- **Tailwind CSS** – Utility-first framework for styling  
- **shadcn/ui** – Pre-built, accessible React UI components  
- **pnpm** – Fast package manager for handling dependencies  

---

## 📦 Project Structure

```
📁 app/
  📄 page.tsx       - Main page containing core application logic
  📄 layout.tsx     - Root layout component
  📄 global.css     - Global styling

📁 components/
  📁 ui/
    📄 button.tsx   - shadcn Button component
    📄 card.tsx     - shadcn Card component
    📄 input.tsx    - shadcn Input component
  📄 library-button.tsx - Custom reusable button

📁 lib/
  📄 utils.ts       - Utility helpers (cn for merging class names)

📁 public/         - Static files
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)  
- pnpm (or npm/yarn)  

### Installation

1. **Navigate to the project folder**
   ```bash
   cd project
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Install shadcn/ui components (if required)**
   ```bash
   pnpm dlx shadcn@latest add button input card
   ```

4. **Start the development server**
   ```bash
   pnpm dev
   ```

5. **Open the app in your browser**
   ```
   http://localhost:3000
   ```

---

## 📚 How to Use

### ➕ Adding a Book

1. Enter the **Book title**  
2. Enter the **Author name**  
3. Click **Add Book** (blue button)  
4. The new book appears at the top of the list  

### 🔍 Searching for Books

1. Type in the search field at the top  
2. Search works for both titles and authors  
3. Results update in real time  
4. Clear the input to display all books again  

### ✏️ Editing a Book

1. Locate the book you want to modify  
2. Click the **Edit** (amber) button  
3. The card switches to editable input fields  
4. Update the title and/or author  
5. Click **Save** to confirm or **Cancel** to discard changes  

### 🗑️ Removing a Book

1. Find the book you want to delete  
2. Click the **Remove** (red) button  
3. The book is instantly removed from the list  

---

## 💻 Component Details

### LibraryButton Component

A reusable button component with three style variants:

- **Add (Blue)** – Used for adding or saving  
- **Edit (Amber)** – Used when editing  
- **Remove (Red)** – Used for deleting or canceling  

### Main Page Component (Home)

Handles the entire book management logic, including:

- State management with React hooks  
- Search filtering  
- CRUD operations (Create, Read, Update, Delete)  

---

## 🔧 Technical Highlights

### State Management

The app uses React’s `useState` to manage:

- `query` – Search input  
- `title` & `author` – Form inputs for new books  
- `books` – Array storing all book objects  
- `editingId`, `editTitle`, `editAuthor` – Edit mode state  

### Data Structure

```typescript
type Book = {
  id: number;
  title: string;
  author: string;
};
```

The `id` is generated using `Date.now()` to ensure uniqueness.

### Core Functions

- **filteredBooks** – Filters books based on a case-insensitive search  
- **handleAdd()** – Adds a new book  
- **handleRemove(id)** – Deletes a book by ID  
- **handleEdit(book)** – Activates edit mode  
- **handleSaveEdit(id)** – Saves updated details  
- **handleCancelEdit()** – Cancels editing  

---

## 🎨 Styling

The app uses:

- Tailwind CSS for a modern, responsive layout  
- shadcn/ui for consistent UI components  
- A custom `cn()` utility for combining class names  

---

## ✅ Features

- ✨ Simple and intuitive interface  
- 🔍 Instant search functionality  
- 📱 Fully responsive design  
- ✏️ Smooth editing experience  
- 🗑️ Quick book removal  
- 🎨 Attractive card-based layout  
- ⚡ Fast performance  

---

## 🐛 Error Handling

The application validates user input:

- Title and author cannot be empty when adding  
- Edits must contain valid values  
- Invalid submissions are ignored  

---

## 📝 Future Enhancements

Possible improvements:

- Persist data with localStorage  
- Add genres or categories  
- Implement a rating system  
- Enable import/export functionality  
- Add dark mode  
- Support book cover images  
- Track reading progress  

---

## 👨‍💻 Author

Developed by a student exploring Next.js and modern web development.

---

## 📄 License

This project is intended for educational use.
