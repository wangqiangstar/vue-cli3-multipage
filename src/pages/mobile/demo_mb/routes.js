const Index = () => import('./views/index');
const HelloWorld = () => import('./views/common/HelloWorld');

export default {
  routes: [
    {
      path: '/',
      component: Index,
      name: 'index',
      children: [
        // 课件
        {
          path: '/kejian',
          name: 'kejian',
          component: HelloWorld,
          meta: {
            pad: 'aw332'
          }
        }
      ]
    }
  ]
};
