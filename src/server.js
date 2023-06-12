import app from './app.js'
import db from './db.js'

const server = app

const port = process.env.PORT

try {
  await db.sync()
  console.log('Tables synchronized successfully')

  server.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })
} catch (error) {
  console.error('Error synchronizing tables:', error)
}
