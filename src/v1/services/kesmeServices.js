const insert = (data) => {
  return process.pool.query(
    'INSERT INTO "Kesme" (kesme_details, user_uuid)  VALUES ($1, $2) RETURNING id',
    [data.kesme_details, data.userId]
  );
};

const del = (data, client) => {
  try {
    const query = `DELETE FROM "Kesme" WHERE id=$1 AND user_uuid=$2 RETURNING *`;
    const values = [data.kesme_id, data.userId];

    if (client) return client.query(query, values);
    return process.pool.query(query, values);
  } catch (err) {
    console.log(err);
  }
};

const delAll = (data, client) => {
  try {
    const query = 'DELETE FROM "Kesme" WHERE user_uuid=$1 RETURNING *';
    const values = [data.userId];

    if (client) return client.query(query, values);
    return process.pool.query(query, values);
  } catch (err) {
    console.log(err);
  }
};

const getAll = (data, client) => {
  try {
    const query = 'SELECT "kesme_details", "id"  FROM "Kesme" WHERE user_uuid=$1 ORDER BY id ASC ';
    const values = [data.userId];
    if (client) return client.query(query, values);
    return process.pool.query(query, values);
  } catch (err) {
    console.log(err);
  }
};
module.exports = { insert, del, delAll, getAll };
