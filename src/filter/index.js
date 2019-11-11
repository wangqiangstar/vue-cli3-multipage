export default (Vue) => {
  /**
   * 转换学期
   * 1：春 2：夏 3：秋 4：冬
   */
  Vue.filter('filterPerid', (value) => {
    const map = {
      1: '春季',
      2: '暑假',
      3: '秋季',
      4: '寒假'
    };
    return map[value];
  });
};
