import { ddbb } from '../DATABASE/connection.ddbb.js'

const getAll = async () => {
  try {
    const query = {
      text: `
        SELECT * FROM usuarios
      `
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
        SELECT * FROM usuarios
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
    const { nombre, balance } = newRegister
    const query = {
      text: `
        INSERT INTO usuarios (nombre, balance) VALUES 
        ($1,$2)
        RETURNING *
      `,
      values: [nombre, balance]
    }
    const { rows: response } = await ddbb.query(query)
    return response[0]
  } catch (error) {
    console.log('error en petición a bbdd', error)
    throw error
  }
}

const update = async (id, newRegister) => {
  try {
    const { nombre, balance } = newRegister
    console.log({ id, nombre, balance })
    const query = {
      text: `
        UPDATE usuarios
        SET 
        nombre = $2,
        balance = $3
        WHERE id = $1 
        RETURNING *
      `,
      values: [id, nombre, +balance]
    }
    const { rows: response } = await ddbb.query(query)
    return response[0]
  } catch (error) {
    console.log('error en petición a bbdd', error)
    throw error
  }
}

const updateBalance = async (id, monto) => {
  try {
    const query = {
      text: `
        UPDATE usuarios
        SET 
        balance = balance + $2
        WHERE id = $1 
        RETURNING *
      `,
      values: [id, monto]
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
        DELETE FROM usuarios
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

export const userModel = {
  getAll,
  getOneById,
  create,
  update,
  updateBalance,
  remove
}
