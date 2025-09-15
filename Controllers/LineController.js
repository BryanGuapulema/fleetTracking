import { LineModel } from '../models/LineModel.js'
import { validateLine, validatePartialLine } from '../validations/LineValidation.js'

export class LineController {
  static async getAllLines (req, res) {
    const lines = await LineModel.getAllLines()
    return res.json(lines)
  }

  static async createLine (req, res) {
    const result = validateLine(req.body)

    if (!result.success) return res.status(400).json({ message: JSON.parse(result.error) })

    const newLine = await LineModel.createLine(result.data)
    return res.status(201).json(newLine)
  }

  static async getLineById (req, res) {
    const { id } = req.params
    const line = await LineModel.getLineById(id)
    if (!line) return res.status(404).json({ message: 'Line not found' })
    return res.json(line)
  }

  static async updateLine (req, res) {
    const result = validatePartialLine(req.body)

    if (!result.success) return res.status(400).json({ message: JSON.parse(result.error) })
    const { id } = req.params

    const lineUpdated = await LineModel.updateLine(id, result.data)
    if (!lineUpdated) return res.status(404).json({ message: 'Line not found' })
    return res.json(lineUpdated)
  }

  static async deleteLine (req, res) {
    const { id } = req.params

    const lineDeleted = await LineModel.deleteLine(id)
    if (!lineDeleted) return res.status(404).json({ message: 'Line not found' })
    return res.json(lineDeleted)
  }
}
