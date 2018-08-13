// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 配置 eslint 允许有分号存在
    'semi':['error','always'],
    // 设置缩进
    'indent':0,
    // 将 eslint 规则设置为0，表不去检查它 , function() {}
    'space-before-function-paren':0,
    // 禁止在计算属性中对属性修改
    // @off 太严格了
    'vue/no-side-effects-in-computed-properties': 'off'
  }
}
