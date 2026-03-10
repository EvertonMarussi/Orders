const db = require('../config/database')

exports.create = async (order) => {

  const client = await db.connect()

  try {
    await client.query('BEGIN')

    // INSERT ORDER
    const orderResult = await client.query(
      `INSERT INTO orders
       (value, creationdate)
       VALUES ($1,$2)
       RETURNING orderid`,
      [
        order.value,
        order.creationDate
      ]
    )

    const orderId = orderResult.rows[0].orderid

    // INSERT ITEMS
    for (const item of order.items) {
      await client.query(
        `INSERT INTO items
         (orderid, productid, quantity, price)
         VALUES ($1,$2,$3,$4)`,
        [
          orderId,
          item.productId,
          item.quantity,
          item.price
        ]
      )
    }

    await client.query('COMMIT')

    return { orderId }

  } catch (err) {
    await client.query('ROLLBACK')
    throw err
  } finally {
    client.release()
  }
}

exports.findByNumber = async (id) => {

  const order = await db.query(
    `SELECT * FROM orders WHERE orderid=$1`,
    [id]
  )

  const items = await db.query(
    `SELECT * FROM items WHERE orderid=$1`,
    [id]
  )

  return {
    ...order.rows[0],
    items: items.rows
  }
}

exports.findAll = async () => {
  const result = await db.query(`SELECT * FROM orders`)
  return result.rows
}

exports.update = async (id, order) => {

  await db.query(
    `UPDATE orders
     SET value=$1,
         creationdate=$2
     WHERE orderid=$3`,
    [
      order.value,
      order.creationDate,
      id
    ]
  )
}

exports.delete = async (id) => {

  await db.query(
    `DELETE FROM orders
     WHERE orderid = $1`,
    [id]
  )

  return { message: 'Order deleted successfully' }
}