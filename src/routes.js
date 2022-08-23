const {
    addBook,
    getBooks,
    getBook,
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
]

module.exports = routes;