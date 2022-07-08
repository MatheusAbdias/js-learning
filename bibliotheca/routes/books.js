const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const Author = require('../models/author')
const Book = require('../models/book')
const uplodadPath = path.join('public', Book.coverImageNameBasePath)
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']
const upload = multer({
    dest: uplodadPath,
    fileFilter: (request, file, callback) => {
        callback(null, imageMimeTypes.includes(file.mimetype))
    }
})

router.get('/', async (request, response) => {
    response.send('All book')
})

router.get('/new', async (request, response) => {
    renderNewPage(response, new Book())

})

router.post('/', upload.single('cover'), async (request, response) => {
    const fileName = request.file != null ? request.file.fieldname : null
    const book = new Book({
        title: request.body.title,
        author: request.body.author,
        publishDate: new Date(request.body.publishDate),
        pageCount: request.body.pageCount,
        coverImageName: fileName,
        description: request.body.description
    })
    try {
        console.log(fileName)
        const newBook = await book.save()
        // response.redirect(`books/${newBook.id}`)
        response.redirect(`books`)
    } catch {
        if (book.coverImageName != null) {
            removeBookCover(book.coverImageName)
        }
        renderNewPage(response, book, true)
    }
})

function removeBookCover(filerName) {
    fs.unlink(path.join(uplodadPath, filerName), err => {
        if (err) console.error(err)
    })
}

async function renderNewPage(response, book, hasError = false) {
    try {
        const authors = await Author.find({})
        const params = {
            authors: authors,
            book: book
        }

        if (hasError) params.errorMessage = 'Erro Creating Book'
        response.render('books/new', params)

    } catch {
        response.redirect('/books')
    }
}


module.exports = router