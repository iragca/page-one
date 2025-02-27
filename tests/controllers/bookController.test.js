import { getBooks, postBook } from '../../src/controllers/bookController';
import { Book } from '../../src/models/Book';

// Mock the Book model
jest.mock('../../src/models/Book');

describe('Book Controller', () => {
  describe('getBooks', () => {
    let req, res

    beforeEach(() => {
      req = {};
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });

    afterEach(() => {
      jest.clearAllMocks();
    });
    it('should return all books', async () => {
      const mockBooks = [
        {
          title: 'The Great Gatsby',
          author: 'F. Scott Fitzgerald',
          genre: 'Fiction',
          year_published: 1925,
          publisher: 'Charles Scribner\'s Sons',
          isbn_issn: '9780743273565',
          cover_photo: 'https://example.com/great-gatsby.jpg'
        },
        {
          title: 'To Kill a Mockingbird',
          author: 'Harper Lee',
          genre: 'Fiction',
          year_published: 1960,
          publisher: 'J.B. Lippincott & Co.',
          isbn_issn: '9780061120084',
          cover_photo: 'https://example.com/to-kill-a-mockingbird.jpg'
        },
      ];

      Book.find.mockResolvedValue(mockBooks);

      await getBooks(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockBooks);
    });

    it('should handle errors', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      const errorMessage = 'Error fetching books';
      Book.find.mockRejectedValue(new Error(errorMessage));

      await getBooks(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  describe('postBook', () => {
    it('should create a new book', async () => {
      const req = { body: { title: 'New Book' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      const newBook = { title: 'New Book', save: jest.fn().mockResolvedValue() };
      Book.mockImplementation(() => newBook);

      await postBook(req, res);

      expect(newBook.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(newBook);
    });

    it('should handle errors', async () => {
      const req = { body: { title: 'New Book' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      const errorMessage = 'Error creating book';
      Book.mockImplementation(() => {
        throw new Error(errorMessage);
      });

      await postBook(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });
});