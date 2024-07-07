import { transferModel } from './transfer.model.js'

const getAll = async (req, res) => {
  try {
    const response = await transferModel.getAll()
    res.json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false })
  }
}

const getAllAndUserInfo = async (req, res) => {
  try {
    const response = await transferModel.getAllAndUserInfo()
    res.json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false })
  }
}

const getOneById = async (req, res) => {
  try {
    const { id } = req.params
    const response = await transferModel.getOneById(id)
    res.json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false })
  }
}

const create = async (req, res) => {
  try {
    if (!req.body.emisor || !req.body.receptor || !req.body.monto) {
      return res.status(400).json({ ok: false, msg: 'se requiere emisor, receptor y monto de la transferencia' })
    }
    const newRegister = req.body
    const response = await transferModel.create(newRegister)
    res.json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false })
  }
}

const update = async (req, res) => {
  try {
    const { id } = req.params
    const response = await transferModel.update(id)
    res.json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false })
  }
}

const remove = async (req, res) => {
  try {
    const { id } = req.params
    const response = await transferModel.remove(id)
    res.json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false })
  }
}

export const transferController = {
  getAll,
  getAllAndUserInfo,
  getOneById,
  create,
  update,
  remove
}
