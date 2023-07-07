/**
 * @author lishaohui
 * @description
 *  该文件定义了后端接口的返回码常量信息。
 *  注：该返回码需要与后端一一对应
 * @version 2.0
 */

/**
 * 成功状态码
 */
export const SUCCESS_CODE = 200

/**
 * 失败状态码
 */
export const FAIL_CODE = -1

/**
 * 查询到的标签信息记录为空
 */
export const TAG_LIST_NULL_ERROR = -212

/**
 * 对应分类信息不存在
 */
export const CATEGORY_NULL_ERROR = -213

/**
 * 查询到的分类信息记录为空
 */
export const CATEGORY_LIST_NULL_ERROR = -214

/**
 * 查询到的热门文章信息记录为空
 */
export const HOT_ARTICLE_LIST_NULL_ERROR = -215

/**
 * 该邮箱已经被注册,请输入合适的邮箱
 */
export const EMAIL_HAS_EXIST_ERROR = -216

/**
 * 两次输入的密码不一致，请检查输入是否有误
 */
export const PASSWORD_NOT_EQUALS_ERROR = -217

/**
 * 该账户已注册
 */
export const USER_NOT_NULL_ERROR = -218

/**
 * 未查询到日志信息
 */
export const LOGS_NULL_ERROR = -219

/**
 * 当前账户不是系统用户，请检查输入是否有误
 */
export const NO_REGISTER_ERROR = -220

/**
 *  登录信息过期，请重新登录
 */
export const TOKEN_EXPIRED_ERROR = -221

/**
 *  访问过于频繁，请稍候重试
 */
export const VISITED_TOO_FREQUENTLY_ERROR = -222

/**
 * 验证码错误
 */
export const INVALID_VERIFY_CODE_ERROR = -223

/**
 * 验证码已过期
 */
export const VERIFY_CODE_EXPIRED_ERROR = -224

/**
 * 非法修改密码请求
 */
export const INVALID_CODE_EXPIRED_ERROR = -225
