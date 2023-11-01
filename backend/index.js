// Ska vi skapa kod eller hämta ?

const express = require('express'),
  path = require('path')

const app = express()

app.get('/api', (_request, response) => {
  response.send({ hello: 'World' })
})

app.use(express.static(path.join(path.resolve(), 'public')))

app.listen(3000, () => {
  console.log('Redo på http://localhost:3000/')
})
