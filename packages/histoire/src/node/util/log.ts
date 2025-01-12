import pc from 'picocolors'

/**
 * 异步函数，用于包装一个回调函数并捕获执行过程中的错误日志
 *
 * @param id - 错误的唯一标识符，用于在错误日志中标识具体的错误来源
 * @param cb - 一个无参数的异步或同步回调函数，代表待执行的代码块
 */
export async function wrapLogError(id: string, cb: () => unknown) {
  try {
    await cb()
  }
  catch (e) {
    console.error(pc.red(`[Error] ${id}: ${e}`))
  }
}
