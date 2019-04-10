import path from 'path'

export const publicPath = path.join(__dirname, '../../', process.env.PUBLIC_PATH)
export const reportPath = path.join(__dirname, '../../', process.env.REPORTS_PATH)
