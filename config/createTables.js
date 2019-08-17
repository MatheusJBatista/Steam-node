const pool = require("./dbConnection")()
const jogadorModel = require("../app/model/jogadorModel")

const createAll = async () => {
    await jogadorModel.createTable(pool)
}

createAll();
