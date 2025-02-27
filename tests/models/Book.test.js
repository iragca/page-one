import Book from '../../src/models/Book.js';

test('should be not be undefined', () => {
    expect(Book).not.toBeNull();
})