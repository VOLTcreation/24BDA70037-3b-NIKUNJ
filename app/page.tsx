'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { LibraryButton } from '@/components/library-button';

type Book = {
  id: number;
  title: string;
  author: string;
};

export default function Home() {
  const [query, setQuery] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editAuthor, setEditAuthor] = useState('');

  const filteredBooks = books.filter((book) => {
    const lowerQuery = query.toLowerCase();
    return (
      book.title.toLowerCase().includes(lowerQuery) ||
      book.author.toLowerCase().includes(lowerQuery)
    );
  });

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

  const handleRemove = (id: number) => {
    setBooks(books.filter((book) => book.id !== id));
  };

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

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
    setEditAuthor('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-white flex items-center gap-3">
            📚 My Library
          </h1>
          <p className="text-purple-100 mt-2">Manage your favorite books with joy!</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-purple-400">
              🔍
            </div>
            <Input
              type="text"
              placeholder="Search books by title or author..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 border-2 border-purple-200 focus:border-purple-400 bg-white/80 backdrop-blur"
            />
          </div>
        </div>

        {/* Add Book Form */}
        <Card className="p-6 mb-8 bg-white/90 backdrop-blur border-2 border-purple-200 shadow-lg">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-purple-800 flex items-center gap-2">
              ➕ Add a New Book
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  📖 Book Title
                </label>
                <Input
                  type="text"
                  placeholder="Enter book title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border-2 border-blue-200 focus:border-blue-400"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  ✍️ Author Name
                </label>
                <Input
                  type="text"
                  placeholder="Enter author name"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="border-2 border-blue-200 focus:border-blue-400"
                />
              </div>
            </div>
            <LibraryButton
              onClick={handleAdd}
              variant="add"
            >
              ➕ Add Book
            </LibraryButton>
          </div>
        </Card>

        {/* Books Display */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-purple-800 flex items-center gap-2">
            📚 My Collection {books.length > 0 && `(${filteredBooks.length})`}
          </h2>
          {filteredBooks.length === 0 ? (
            <div className="text-center py-16 bg-white/70 backdrop-blur rounded-lg border-2 border-dashed border-purple-300">
              <div className="text-6xl mb-4">📚</div>
              <p className="text-gray-600 text-lg">
                {query
                  ? 'No books match your search 🔍'
                  : 'Your library is empty. Start adding books! 🎉'}
              </p>
            </div>
          ) : (
            filteredBooks.map((book) => (
              <Card key={book.id} className="p-6 bg-white/90 backdrop-blur border-2 border-purple-200 shadow-md hover:shadow-xl hover:border-purple-400">
                {editingId === book.id ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">✏️</span>
                      <h3 className="font-semibold text-purple-700">Editing Book</h3>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">
                        📖 Book Title
                      </label>
                      <Input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        placeholder="Book title"
                        className="border-2 border-amber-200 focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">
                        ✍️ Author Name
                      </label>
                      <Input
                        type="text"
                        value={editAuthor}
                        onChange={(e) => setEditAuthor(e.target.value)}
                        placeholder="Author name"
                        className="border-2 border-amber-200 focus:border-amber-400"
                      />
                    </div>
                    <div className="flex gap-2">
                      <LibraryButton
                        onClick={() => handleSaveEdit(book.id)}
                        variant="add"
                      >
                        💾 Save
                      </LibraryButton>
                      <LibraryButton
                        onClick={handleCancelEdit}
                        variant="remove"
                      >
                        ❌ Cancel
                      </LibraryButton>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-start gap-3 mb-4">
                      <span className="text-3xl">📕</span>
                      <div className="flex-1">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-1">
                          {book.title}
                        </h2>
                        <p className="text-lg text-gray-600 flex items-center gap-2">
                          <span>✍️</span>
                          <span>{book.author}</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <LibraryButton
                        onClick={() => handleEdit(book)}
                        variant="edit"
                      >
                        ✏️ Edit
                      </LibraryButton>
                      <LibraryButton
                        onClick={() => handleRemove(book.id)}
                        variant="remove"
                      >
                        🗑️ Remove
                      </LibraryButton>
                    </div>
                  </div>
                )}
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  );
}