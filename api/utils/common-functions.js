import mongoose from 'mongoose'

export const asyncMiddleware = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

export const mongooseTransaction = async (fn) => {
  const session = await mongoose.startSession()
  session.startTransaction()
  return new Promise(async (resolve, reject) => {
    try {
      const result = await fn(session)
      await session.commitTransaction()
      resolve(result)
    } catch (error) {
      if (session && session.abortTransaction) {
        await session.abortTransaction()
      }
      reject(error)
    }
  })
}
