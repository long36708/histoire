import fs from 'node:fs'
import path from 'pathe'

/**
 * 从当前目录向上查找指定文件。
 *
 * 该函数用于在当前目录及其父目录中查找指定文件列表中的第一个匹配文件。它从给定的工作目录开始，
 * 如果没有提供工作目录，则默认使用进程的当前工作目录。函数会逐层向上查找，直到找到文件或到达根目录。
 *
 * @param cwd - 当前工作目录，默认为进程的当前工作目录。
 * @param fileNames - 需要查找的文件名数组。
 * @returns 返回找到的第一个文件的路径，如果未找到任何文件则返回 null。
 */
export function findUp(cwd: string = process.cwd(), fileNames: string[]): string {
  // 解析当前工作目录的根路径。
  let { root } = path.parse(cwd)
  // 初始化搜索目录为当前工作目录。
  let dir = cwd

  // 在 Windows 上，根路径可能只返回 `C:`，需要添加尾部的 `/`
  // 确保根路径以 '/' 结尾，以便后续路径操作。
  if (root[1] === ':' && root[2] === undefined) {
    root += '/'
  }

  // 当前目录不是根目录时继续循环。
  while (dir !== root) {
    // 遍历文件名列表，检查每个文件是否存在。
    for (const fileName of fileNames) {
      const searchPath = path.join(dir, fileName)
      if (fs.existsSync(searchPath)) {
        return searchPath
      }
    }
    // 移动到上一级目录继续查找。
    dir = path.dirname(dir)
  }

  // 如果未找到任何文件，返回 null。
  return null
}
