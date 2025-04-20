import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookFilter from './BookFilter';
import { BookProvider } from '../../context/BookContext';

describe('BookFilter Component', () => {
  const mockSetFilteredBooks = jest.fn();

  const renderWithProvider = () => {
    return render(
      <BookProvider>
        <BookFilter setFilteredBooks={mockSetFilteredBooks} />
      </BookProvider>
    );
  };

  // Test 1: Component renders correctly
  test('renders search input and status select', () => {
    renderWithProvider();
    
    expect(screen.getByPlaceholderText('Cari judul...')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('Semua')).toBeInTheDocument();
  });

  // Test 2: Search input functionality
  test('updates search value when typing', () => {
    renderWithProvider();
    const searchInput = screen.getByPlaceholderText('Cari judul...');
    
    fireEvent.change(searchInput, { target: { value: 'Harry Potter' } });
    expect(searchInput.value).toBe('Harry Potter');
  });

  // Test 3: Status select functionality
  test('changes status when selecting different option', () => {
    renderWithProvider();
    const select = screen.getByRole('combobox');
    
    fireEvent.change(select, { target: { value: 'reading' } });
    expect(select.value).toBe('reading');
  });

  // Test 4: Filter function is called on search input change
  test('calls setFilteredBooks when search input changes', () => {
    renderWithProvider();
    const searchInput = screen.getByPlaceholderText('Cari judul...');
    
    fireEvent.change(searchInput, { target: { value: 'Test Book' } });
    expect(mockSetFilteredBooks).toHaveBeenCalled();
  });

  // Test 5: Filter function is called on status change
  test('calls setFilteredBooks when status changes', () => {
    renderWithProvider();
    const select = screen.getByRole('combobox');
    
    fireEvent.change(select, { target: { value: 'finished' } });
    expect(mockSetFilteredBooks).toHaveBeenCalled();
  });
});
