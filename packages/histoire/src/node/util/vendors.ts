import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

// Resolve an absolute path to e.g. node_modules/.pnpm/histoire@0.11.7_vite@3.2.4/node_modules/histoire/dist/node/vendors/controls.js
// https://github.com/histoire-dev/histoire/issues/282
export const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://github.com/vitejs/vite/issues/9661
const alias = {
  'histoire-vendors/vue': path.resolve(__dirname, '../vendors/vue.js'),
  'histoire-controls': path.resolve(__dirname, '../vendors/controls.js'),
}

/**
 * 将给定的请求字符串转换为注入的导入路径
 * 此函数主要用于处理模块导入路径，支持别名替换和绝对路径转换为文件URL
 *
 * @param request {string} - 请求字符串，可以是别名或路径
 * @returns {string} - 转换后的导入路径，以JSON字符串形式返回
 */
export function getInjectedImport(request: string) {
  // 初始化id为请求字符串
  let id: string = request

  // 如果id在别名映射中找到，则替换id为对应的别名值
  if (alias[id]) {
    id = alias[id]
  }

  // 检查id是否为绝对路径
  if (path.isAbsolute(id)) {
    // 如果是绝对路径，将其转换为文件URL并返回
    return JSON.stringify(pathToFileURL(id).href)
  }
  else {
    // 如果不是绝对路径，直接返回id
    return JSON.stringify(id)
  }
}
