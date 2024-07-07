import { ddbb } from '../DATABASE/connection.ddbb.js'
import { userModel } from '../Users/user.model.js'

const getAll = async () => {
  try {
    const query = {
      text: `
        SELECT * FROM transferencias
      `,
      rowMode: 'array'
    }
    const { rows: response } = await ddbb.query(query)
    return response
  } catch (error) {
    console.log('error en petición a bbdd', error)
    throw error
  }
}

const getAllAndUserInfo = async () => {
  try {
    const query = {
      text: `
        SELECT t.id, ue.nombre, ur.nombre, t.monto , t.fecha
        FROM transferencias t
        JOIN usuarios ue ON t.emisor = ue.id
        JOIN usuarios ur ON t.emisor = ur.id
      `,
      rowMode: 'array'
    }
    const { rows: response } = await ddbb.query(query)
    return response
  } catch (error) {
    console.log('error en petición a bbdd', error)
    throw error
  }
}

const getOneById = async (id) => {
  try {
    const query = {
      text: `
        SELECT * FROM transferencias
        WHERE id = $1
      `,
      values: [+id]
    }
    const { rows: response } = await ddbb.query(query)
    return response[0]
  } catch (error) {
    console.log('error en petición a bbdd', error)
    throw error
  }
}

const create = async (newRegister) => {
  try {
    const {
      emisor,
      receptor,
      monto
    } = newRegister
    console.log({ emisor, receptor, monto })
    await ddbb.query('BEGIN')
    await userModel.updateBalance(emisor, -monto)
    await userModel.updateBalance(receptor, monto)

    const query = {
      text: `
        INSERT INTO transferencias (emisor, receptor, monto) VALUES 
        ($1,$2,$3)
        RETURNING *
      `,
      values: [emisor, receptor, monto]
    }
    const { rows: response } = await ddbb.query(query)
    await ddbb.query('COMMIT')

    return response[0]
  } catch (error) {
    await ddbb.query('ROLLBACK')
    console.log('error en petición a bbdd', error)
    throw error
  }
}

const update = async (id) => {
  try {
    const query = {
      text: `
        UPDATE POSTS
        SET 
        LIKES = LIKES + 1
        WHERE id = $1
        RETURNING *
      `,
      values: [id]
    }
    const { rows: response } = await ddbb.query(query)
    return response[0]
  } catch (error) {
    console.log('error en petición a bbdd', error)
    throw error
  }
}

const remove = async (id) => {
  try {
    const query = {
      text: `
        DELETE FROM POSTS
        WHERE ID = $1
        RETURNING *
      `,
      values: [id]
    }
    const { rows: response } = await ddbb.query(query)
    return response[0]
  } catch (error) {
    console.log('error en petición a bbdd', error)
    throw error
  }
}

export const transferModel = {
  getAll,
  getAllAndUserInfo,
  getOneById,
  create,
  update,
  remove
}
