---
applyTo: '**/*.ts, **/*.js,**/*.tsx, **/*.jsx'
name: 'code'
description: '代码生成相关规范,必须遵守的规则和禁止的行为'
---
# TypeScript JSDoc 注释规范

## 1. 接口/类型注释

### 基础格式
```typescript
/**
 * @interface UserInfo
 * @description 用户信息
 * @property {string} id - 用户ID
 * @property {string} name - 用户名称
 * @property {number} age - 年龄
 * @property {string} [email] - 邮箱（可选）
 */
interface UserInfo {
  id: string
  name: string
  age: number
  email?: string
}
```

### 复杂类型注释
```typescript
/**
 * @interface UserLocation
 * @description 用户位置信息
 * @property {string} country - 国家
 * @property {string} province - 省份
 * @property {string} city - 城市
 * @property {string} [district] - 区县（可选）
 * @property {number} [longitude] - 经度（可选）
 * @property {number} [latitude] - 纬度（可选）
 */
interface UserLocation {
  country: string
  province: string
  city: string
  district?: string
  longitude?: number
  latitude?: number
}
```

### 嵌套类型注释
```typescript
/**
 * @interface User
 * @description 完整用户信息
 * @property {string} id - 用户ID
 * @property {string} name - 用户名称
 * @property {UserLocation} location - 位置信息
 * @property {Array<string>} tags - 标签列表
 * @property {Record<string, any>} metadata - 元数据
 */
interface User {
  id: string
  name: string
  location: UserLocation
  tags: string[]
  metadata: Record<string, any>
}
```

## 2. 函数注释

### 基础函数
```typescript
/**
 * 获取用户信息
 * @param {string} userId - 用户ID
 * @returns {Promise<UserInfo>} 用户信息
 * @throws {Error} 用户不存在时抛出错误
 * @example
 * const user = await getUserInfo('123')
 */
async function getUserInfo(userId: string): Promise<UserInfo> {
  // 实现
}
```

### 多参数函数
```typescript
/**
 * 创建用户
 * @param {string} name - 用户名称
 * @param {string} email - 邮箱
 * @param {number} [age=18] - 年龄（可选，默认18）
 * @param {UserLocation} [location] - 位置信息（可选）
 * @returns {Promise<User>} 创建的用户对象
 * @throws {Error} 邮箱已存在时抛出错误
 * @example
 * const user = await createUser('John', 'john@example.com', 25)
 */
async function createUser(
  name: string,
  email: string,
  age: number = 18,
  location?: UserLocation
): Promise<User> {
  // 实现
}
```

### 复杂返回值
```typescript
/**
 * 获取用户列表
 * @param {PageParams} params - 分页参数
 * @param {Object} [filters] - 过滤条件（可选）
 * @param {string} [filters.name] - 按名称过滤
 * @param {number} [filters.minAge] - 最小年龄
 * @param {number} [filters.maxAge] - 最大年龄
 * @returns {Promise<PageResult<User>>} 分页结果
 * @example
 * const result = await getUserList(
 *   { page: 1, pageSize: 10 },
 *   { name: 'John', minAge: 18 }
 * )
 */
async function getUserList(
  params: PageParams,
  filters?: {
    name?: string
    minAge?: number
    maxAge?: number
  }
): Promise<PageResult<User>> {
  // 实现
}
```

## 3. 类注释

```typescript
/**
 * @class UserService
 * @description 用户服务类
 * @example
 * const userService = new UserService()
 * const user = await userService.getById('123')
 */
class UserService {
  /**
   * @private
   * @type {string}
   * @description API基础路径
   */
  private baseUrl: string = '/api/users'

  /**
   * 根据ID获取用户
   * @param {string} id - 用户ID
   * @returns {Promise<User>} 用户对象
   * @memberof UserService
   */
  async getById(id: string): Promise<User> {
    // 实现
  }

  /**
   * 创建用户
   * @param {Omit<User, 'id'>} data - 用户数据（不含ID）
   * @returns {Promise<User>} 创建的用户对象
   * @memberof UserService
   */
  async create(data: Omit<User, 'id'>): Promise<User> {
    // 实现
  }
}
```

## 4. 常量/变量注释

```typescript
/**
 * @constant
 * @type {string}
 * @description API基础URL
 * @default '/api'
 */
const API_BASE_URL = '/api'

/**
 * @constant
 * @type {number}
 * @description 请求超时时间（毫秒）
 * @default 10000
 */
const REQUEST_TIMEOUT = 10000

/**
 * @constant
 * @type {Object}
 * @description HTTP状态码映射
 * @property {number} OK - 成功
 * @property {number} CREATED - 已创建
 * @property {number} BAD_REQUEST - 请求错误
 * @property {number} UNAUTHORIZED - 未授权
 */
const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401
} as const
```

## 5. 枚举注释

```typescript
/**
 * @enum {string}

 * @description 用户状态
 */
enum UserStatus {
   /** 激活状态 */
  ACTIVE = 'active',
  /** 未激活状态 */
  INACTIVE = 'inactive',
  /** 已禁用状态 */
  DISABLED = 'disabled',
  /** 已删除状态 */
  DELETED = 'deleted'
}
```

## 6. 类型别名注释

```typescript
/**
 * @typedef {Object} ApiResponse
 * @description 统一API响应格式
 * @property {number} code - 状态码
 * @property {string} message - 消息
 * @property {T} data - 响应数据
 * @property {boolean} success - 是否成功
 * @template T
 */
type ApiResponse<T = any> = {
  code: number
  message: string
  data: T
  success: boolean
}

/**
 * @typedef {string | number} ID
 * @description ID类型，可以是字符串或数字
 */
type ID = string | number
```

## 7. Vue 组件注释

```typescript
/**
 * @component UserCard
 * @description 用户卡片组件
 * @property {User} user - 用户信息
 * @property {boolean} [showActions=true] - 是否显示操作按钮
 * @emits {User} update - 用户信息更新时触发
 * @emits {string} delete - 删除用户时触发，传递用户ID
 * @example
 * <user-card :user="user" @update="handleUpdate" />
 */
```

## 8. 常用 JSDoc 标签

| 标签 | 说明 | 示例 |
|------|------|------|
| `@param` | 函数参数 | `@param {string} name - 参数说明` |
| `@returns` | 返回值 | `@returns {Promise<User>}` |
| `@throws` | 抛出异常 | `@throws {Error} 错误说明` |
| `@example` | 使用示例 | `@example const x = fn()` |
| `@description` | 详细描述 | `@description 这是详细说明` |
| `@see` | 参考链接 | `@see https://example.com` |
| `@since` | 版本信息 | `@since 1.0.0` |
| `@deprecated` | 废弃标记 | `@deprecated 使用 newFn 代替` |
| `@todo` | 待办事项 | `@todo 实现功能X` |
| `@private` | 私有成员 | `@private` |
| `@public` | 公有成员 | `@public` |
| `@readonly` | 只读 | `@readonly` |
| `@async` | 异步函数 | `@async` |
| `@template` | 泛型参数 | `@template T` |

## 9. 最佳实践

1. **所有导出的接口、类型、函数必须有 JSDoc 注释**
2. **描述要清晰明确，避免模糊不清**
3. **参数和返回值必须标注类型**
4. **可选参数使用 `[param]` 或 `@param {type} [param]` 标注**
5. **复杂逻辑提供使用示例 `@example`**
6. **废弃的 API 必须使用 `@deprecated` 标注**
7. **使用 `@see` 链接相关文档**
8. **保持注释与代码同步更新**
