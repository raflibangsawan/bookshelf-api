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

    const isSuccess = books.filter((book) => book.id === id).length > 0;

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
    //TO DO: buat error message
}

module.exports = {
    addBook,
};