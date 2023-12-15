const loginUser = (username) => {

    return process.pool.query('SELECT * FROM "User" WHERE username = $1', [username]);
  };
  
  const findOne = (userid) => {
      return process.pool.query('SELECT * FROM "User" WHERE uuid = $1', [userid])
  }
  

  const insert = (data) => {
    return process.pool.query('INSERT INTO "User" (Username, Passwordhash, Email, Itin) VALUES ($1, $2, $3, $4) RETURNING uuid', [
        data.Username,
        data.hashedPassword,
        data.Email,
        data.Itin
    ])
}


  
  module.exports = { loginUser, findOne, insert };
  