  /* This is a database connection function*/
import mongoose from 'mongoose'

const connection = {} /* creating connection object*/

async function dbConnection() {
  /* check if we have connection to our database*/
  if (connection.isConnected) {
    return
  }

  /* connecting to our database */
  const db = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  connection.isConnected = db.connections[0].readyState
  console.log(`MongoDB Connected at - (${db.connection.host}`);

}

export default dbConnection