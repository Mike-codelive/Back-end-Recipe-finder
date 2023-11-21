import app from './app.js'
import { connectToDB } from './utils/mongoose.js'


async function loadApp() {
    await connectToDB()
    app.listen(3000)
    console.log('server is up port', 3000 )
}

loadApp()