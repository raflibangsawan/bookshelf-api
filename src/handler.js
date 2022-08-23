const { nanoid } = require('nanoid');
const books = require('./bookshelves');

const addBook = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading, } = request.payload;
    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const finished = pageCount === readPage;

    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt,
    };

    books.push(newBook);

    const isSuccess = (books.filter((book) => book.id === id).length > 0) && (name != null) && (readPage <= pageCount);

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        });
    
        response.code(201);
        return response;
    }

    else {
        if (name == null) {
            const response = h.response({
                status: 'fail',
                message: 'Gagal menambahkan buku. Mohon isi nama buku',
            });
            response.code(400);
            return response;
        }
        
        else if (readPage > pageCount) {
            const response = h.response({
                status: 'fail',
                message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
            });
            response.code(400);
            return response;
        }

        else {
            const response = h.response({
                status: 'error',
                message: 'Buku gagal ditambahkan',
            });
            response.code(500);
            return response;
        }
    }
}

const getBooks = () => ({
    status: 'success',
    data: {
        books
    },
});

const getBook = (request, h) => {
    const { bookId } = request.params;

    const book = books.filter((eachBook) => eachBook.id == bookId)[0];

    if (book !== undefined) {
        return {
            status: 'success',
            data: {
                book,
              },
            };     
    }
    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });    
    response.code(404);
    return response;
};

const updateBook = (request, h) => {
    const { bookId } = request.params;

    const { name, year, author, summary, publisher, pageCount, readPage, reading, } = request.payload;

    const updatedAt = new Date().toISOString();

    const idx = books.findIndex((eachBook) => eachBook.id == bookId);

    const finished = pageCount === readPage;

    const isSuccess = (name != null) && (readPage <= pageCount) && (idx !== -1);

    if (isSuccess) {
        books[idx] = {
            ...books[idx],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            finished,
            reading,
            ...books[idx],
            updatedAt,
        }

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
          });
          response.code(200);
          return response;      
    }

    if (name == null) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }

    else if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }

    else if (idx === -1) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan',
        });
        response.code(400);
        return response;
    }

};

const deleteBook = (request, h) => {
    const { bookId } = request.params;
};

module.exports = {
    addBook,
    getBooks,
    getBook,
    updateBook,
    deleteBook,
};