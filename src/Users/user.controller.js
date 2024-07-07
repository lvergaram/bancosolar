import { userModel } from './user.model.js'

const getAll = async (req, res) => {
  try {
    const response = await userModel.getAll()
    res.json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false })
  }
}

const getOneById = async (req, res) => {
  try {
    const { id } = req.params
    const response = await userModel.getOneById(id)
    res.json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false })
  }
}

const create = async (req, res) => {
  try {
    if (!req.body.usuario || !req.body.url || !req.body.descripcion) {
      return res.status(400).json({ ok: false, msg: 'se requiere usuario,url y descripcion' })
    }
    const newRegister = req.body
    const response = await userModel.create(newRegister)
    res.json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false })
  }
}

const update = async (req, res) => {
  try {
    const { id } = req.params
    const response = await userModel.update(id)
    res.json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false })
  }
}

const remove = async (req, res) => {
  try {
    const { id } = req.params
    const response = await userModel.remove(id)
    res.json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false })
  }
}

export const userController = {
  getAll,
  getOneById,
  create,
  update,
  remove
}
