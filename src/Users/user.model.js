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
    const { usuario, url, descripcion } = newRegister
    const query = {
      text: `
        INSERT INTO posts(usuario,url,descripcion) 
        VALUES
        ($1,$2,$3)
        RETURNING *
      `,
      values: [usuario, url, descripcion]
    }
    const { rows: response } = await ddbb.query(query)
    return response[0]
  } catch (error) {
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

export const userModel = {
  getAll,
  getOneById,
  create,
  update,
  remove
}
