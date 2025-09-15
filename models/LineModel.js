import mongoose from 'mongoose'
import { lineSchema } from '../Schemas/lineSchema.js'

const Line = mongoose.model('Line', lineSchema)

export class LineModel {
  static async getAllLines () {
    return await Line.find()
  }

  static async createLine (data) {
    return await Line.create(data)
  }

  static async getLineById (id) {
    return await Line.findById(id)
  }

  static async updateLine (id, data) {
    return await Line.findByIdAndUpdate(id, data, { new: true })
  }

  static async deleteLine (id) {
    return await Line.findByIdAndDelete(id)
  }
}
