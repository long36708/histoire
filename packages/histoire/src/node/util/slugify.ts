// From vitepress

// string.js slugify drops non ascii chars so we have to
// use a custom implementation here
import { remove as removeDiacritics } from 'diacritics'
// eslint-disable-next-line no-control-regex
const rControl = /[\u0000-\u001F]/g
const rSpecial = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'<>,.?/]+/g

/**
 * 将字符串转换为slug格式。
 *
 * 该函数接受一个字符串作为输入，并生成一个可用于URL或文件名的slug。
 * 它通过去除重音符号、将特殊字符替换为连字符、去除连续的连字符，并确保slug不以数字或控制字符开头来实现这一点。
 *
 * @param str 输入的字符串，将被转换为slug格式。
 * @returns 转换后的slug字符串。
 */
export function slugify(str: string): string {
  return (
    removeDiacritics(str)
      // Remove control characters
      // 去除控制字符
      .replace(rControl, '')
      // Replace special characters
      // 将特殊字符替换为连字符
      .replace(rSpecial, '-')
      // Remove continuous separators
      // 去除连续的连字符
      .replace(/-{2,}/g, '-')
      // Remove prefixing and trailing separators
      // 去除前导和尾随的连字符
      .replace(/^-+|-+$/g, '')
      // ensure it doesn't start with a number (#121)
      // 确保slug不以数字开头 (#121)
      .replace(/^(\d)/, '_$1')
      // lowercase
      // 转换为小写
      .toLowerCase()
  )
}
