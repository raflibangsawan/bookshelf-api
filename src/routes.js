const {
    addBook,
    getBooks,
    getBook,
    updateBook,
    deleteBook,
} = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBook,
    },
    {
        method: 'GET',
        path: '/books',
        handler: getBooks,
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: getBook,
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: updateBook,
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: deleteBook,
    },
]

module.exports = routes;