const express = require('express')
require('dotenv').config()
const app = express()
const PORT = process.env.DB_PORT || 9976
const sequelize = require('./database/database')
const organisationRouter = require('./router/organizationRouter')
const staffRouter = require('./router/staffRouter')
const equipmentRouter = require('./router/equipmentRouter')
const orderRouter = require('./router/orderRouter')

app.use(express.json()),
app.use(organisationRouter)
app.use(staffRouter)
app.use(equipmentRouter)
app.use(orderRouter)



const dbConnection =  async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error.message);
    }
}
dbConnection();

app.listen(PORT, ()=>{
    console.log('app is listening to PORT:', PORT);
    
})