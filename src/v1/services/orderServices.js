

const insert = (data) => {
  return process.pool.query(
    'INSERT INTO "orders" (order_details, user_uuid)  VALUES ($1, $2) RETURNING id',
    [data.order_details, data.userId]
  );
 };
 
 
 const update = (data, client) => {
  try {
    const query = `
      UPDATE "orders"
      SET order_details = $1
      WHERE id = $2 AND user_uuid = $3
      RETURNING *`;

    const values = [data.order_details, data.order_id, data.userId];

    // Log the data and values being used in the query
    console.log("Updating order with the following data:", data);
    console.log("SQL query values:", values);

    if (client) {
      console.log("Using provided client for the query.");
      return client.query(query, values);
    } else {
      console.log("Using default pool for the query.");
      return process.pool.query(query, values);
    }
  } catch (err) {
    console.error("Error in update function:", err);
    // Handle or throw the error appropriately
  }
};

 
 
 const del = (data, client) => {
  try {
    const query = `DELETE FROM "orders" WHERE id=$1 AND user_uuid=$2 RETURNING *`;
    const values = [data.order_id, data.userId];
 
 
    if (client) return client.query(query, values);
    return process.pool.query(query, values);
  } catch (err) {
    console.log(err);
  }
 };
 
 
 const delAll = (data, client) => {
  try {
    const query = 'DELETE FROM "orders" WHERE user_uuid=$1 RETURNING *';
    const values = [data.userId];
 
 
    if (client) return client.query(query, values);
    return process.pool.query(query, values);
  } catch (err) {
    console.log(err);
  }
 };
 
 
 const getAll = (data, client) => {
  try {
    const query = 'SELECT "order_details", "id"  FROM "orders" WHERE user_uuid=$1 ORDER BY id ASC ';
    const values = [data.userId];
    if (client) return client.query(query, values);
    return process.pool.query(query, values);
  } catch (err) {
    console.log(err);
  }
 };
 module.exports = { insert, del, delAll, getAll, update };
 
 
 
 