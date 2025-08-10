import { Graph } from '@antv/g6';

// 定义一组漂亮的颜色
const colors = [
  '#1890ff',
  '#52c41a',
  '#fa8c16',
  '#722ed1',
  '#eb2f96',
  '#13c2c2',
  '#faad14',
  '#a0d911',
  '#2f54eb',
  '#fa541c',
  '#f5222d',
  '#52c41a',
  '#fa8c16',
  '#722ed1',
  '#eb2f96',
];

// 生成随机颜色的函数
const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

export const data1 = {
  nodes: [
    // 主产品节点
    {
      id: 'main-product',
      label: '测试火炮',
      color: getRandomColor(), // 为每个节点分配随机颜色
      data: { cluster: 'main' },
    },

    // 国家节点
    {
      id: 'country',
      label: '中国',
      color: getRandomColor(), // 为每个节点分配随机颜色
      data: { cluster: 'country' },
    },

    // 厂商节点
    {
      id: 'manufacturer',
      label: '测试厂商',
      color: getRandomColor(), // 为每个节点分配随机颜色
      data: { cluster: 'manufacturer' },
    },

    // 弹药组件
    {
      id: 'ammunition-1',
      label: '155mm高爆弹',
      color: getRandomColor(), // 为每个节点分配随机颜色
      data: { cluster: 'ammunition' },
    },
    {
      id: 'ammunition-2',
      label: '穿甲弹',
      color: getRandomColor(), // 为每个节点分配随机颜色
      data: { cluster: 'ammunition' },
    },
    {
      id: 'ammunition-3',
      label: '制导炮弹',
      color: getRandomColor(), // 为每个节点分配随机颜色
      data: { cluster: 'ammunition' },
    },

    // 引信组件
    {
      id: 'fuze-1',
      label: '近炸引信',
      color: getRandomColor(), // 为每个节点分配随机颜色
      data: { cluster: 'fuze' },
    },
    {
      id: 'fuze-2',
      label: '延时引信',
      color: getRandomColor(), // 为每个节点分配随机颜色
      data: { cluster: 'fuze' },
    },

    // 制导技术
    {
      id: 'guidance-1',
      label: 'GPS制导',
      color: getRandomColor(), // 为每个节点分配随机颜色
      data: { cluster: 'guidance' },
    },
    {
      id: 'guidance-2',
      label: '激光制导',
      color: getRandomColor(), // 为每个节点分配随机颜色
      data: { cluster: 'guidance' },
    },

    // 传感器组件
    {
      id: 'sensor-1',
      label: '地磁测量仪',
      color: getRandomColor(), // 为每个节点分配随机颜色
      data: { cluster: 'sensor' },
    },
    {
      id: 'sensor-2',
      label: '风速传感器',
      color: getRandomColor(), // 为每个节点分配随机颜色
      data: { cluster: 'sensor' },
    },
    {
      id: 'sensor-3',
      label: '温度传感器',
      color: getRandomColor(), // 为每个节点分配随机颜色
      data: { cluster: 'sensor' },
    },

    // 尾翼组件
    {
      id: 'fin-1',
      label: '可调尾翼',
      color: getRandomColor(), // 为每个节点分配随机颜色
      data: { cluster: 'fin' },
    },
    {
      id: 'fin-2',
      label: '稳定尾翼',
      color: getRandomColor(), // 为每个节点分配随机颜色
      data: { cluster: 'fin' },
    },

    // 火控技术
    {
      id: 'fire-control-1',
      label: '数字化火控',
      color: getRandomColor(), // 为每个节点分配随机颜色
      data: { cluster: 'fire-control' },
    },
    {
      id: 'fire-control-2',
      label: '弹道计算机',
      color: getRandomColor(), // 为每个节点分配随机颜色
      data: { cluster: 'fire-control' },
    },

    // 目标识别
    {
      id: 'target-1',
      label: '目标识别系统',
      color: getRandomColor(), // 为每个节点分配随机颜色
      data: { cluster: 'target' },
    },
    {
      id: 'target-2',
      label: '精确瞄准镜',
      color: getRandomColor(), // 为每个节点分配随机颜色
      data: { cluster: 'target' },
    },
  ],
  edges: [
    // 主产品与其他节点的连接
    { source: 'main-product', target: 'country' },
    { source: 'main-product', target: 'manufacturer', label: '生产厂商' },

    // 弹药相关
    { source: 'main-product', target: 'ammunition-1', label: '配套弹药' },
    { source: 'main-product', target: 'ammunition-2', label: '配套弹药' },
    { source: 'main-product', target: 'ammunition-3', label: '配套弹药' },

    // 引信相关
    { source: 'main-product', target: 'fuze-1', label: '引信类型' },
    { source: 'main-product', target: 'fuze-2', label: '引信类型' },

    // 制导相关
    { source: 'main-product', target: 'guidance-1', label: '制导方式' },
    { source: 'main-product', target: 'guidance-2', label: '制导方式' },

    // 传感器相关
    { source: 'main-product', target: 'sensor-1', label: '测量设备' },
    { source: 'main-product', target: 'sensor-2', label: '测量设备' },
    { source: 'main-product', target: 'sensor-3', label: '测量设备' },

    // 尾翼相关
    { source: 'main-product', target: 'fin-1', label: '尾翼组件' },
    { source: 'main-product', target: 'fin-2', label: '尾翼组件' },

    // 火控相关
    { source: 'main-product', target: 'fire-control-1', label: '火控系统' },
    { source: 'main-product', target: 'fire-control-2', label: '火控系统' },

    // 目标识别相关
    { source: 'main-product', target: 'target-1', label: '目标识别' },
    { source: 'main-product', target: 'target-2', label: '目标识别' },

    // 组件间的关联关系
    { source: 'ammunition-3', target: 'guidance-1', label: '制导方式' },
    { source: 'ammunition-3', target: 'guidance-2', label: '制导方式' },
    { source: 'fire-control-1', target: 'sensor-1', label: '数据输入' },
    { source: 'fire-control-1', target: 'sensor-2', label: '数据输入' },
    { source: 'fire-control-1', target: 'sensor-3', label: '数据输入' },
    { source: 'fire-control-2', target: 'target-1', label: '目标数据' },
    { source: 'fire-control-2', target: 'target-2', label: '目标数据' },
  ],
};

// 创建图表的工厂函数
export function createGraph(container: HTMLElement | string, productData?: any) {
  try {
    let targetContainer: HTMLElement;

    if (typeof container === 'string') {
      const element = document.getElementById(container);
      if (!element) {
        console.error(`找不到ID为 ${container} 的DOM元素`);
        return null;
      }
      targetContainer = element;
    } else {
      targetContainer = container;
    }

    // 使用传入的产品数据或默认数据
    const data = productData || data1;

    // 获取容器的实际尺寸
    const containerWidth = targetContainer.clientWidth || 600;
    const containerHeight = targetContainer.clientHeight || 500;

    const graph = new Graph({
      container: targetContainer,
      width: containerWidth,
      height: containerHeight,
      data,
      node: {
        style: {
          size: 40,
          labelText: (d: any) => d.label,
          // labelPlacement: 'middle' as any,
          labelFontSize: 12,
          labelFontWeight: 'bold',
          fill: (d: any) => d.color,
          stroke: '#fff',
          lineWidth: 2,
          r: 20,
          shadowColor: 'rgba(0,0,0,0.2)',
          shadowBlur: 8,
          shadowOffsetX: 2,
          shadowOffsetY: 2,
        },
      },
      edge: {
        style: {
          stroke: '#ccc',
          lineWidth: 1.5,
          endArrow: true as any, // 类型断言
          opacity: 1,
          labelText: (d: any) => d.label || ('' as any),
          labelFill: '#666',
          labelFontSize: 10,
          labelBackground: '#fff' as any,
          labelBackgroundPadding: [2, 4],
        },
      },
      layout: {
        type: 'd3-force',
        link: {
          distance: 100, // 减少连接距离，使节点更紧凑
          strength: 1, // 保持连接强度
        },
        collide: {
          radius: 35, // 减少碰撞半径，避免节点重叠
        },
        nodeStrength: -100, // 增加排斥力，使节点分布更均匀
        alpha: 0.6, // 增加初始能量
        alphaDecay: 0.02, // 减少衰减速度，让布局更稳定
        alphaMin: 0.001,
        // center: [containerWidth / 2, containerHeight / 2], // 设置布局中心点
        velocityDecay: 0.4, // 减少速度衰减，让布局更稳定
        maxIteration: 1000, // 增加最大迭代次数
      },
      plugins: [
        {
          type: 'tooltip',
          getContent: (e: any, items: any) => {
            let result = `<h4>节点信息</h4>`;
            items.forEach((item: any) => {
              result += `<p>名称: ${item.data.label}</p>`;
              if (item.data.cluster) {
                result += `<p>分类: ${item.data.cluster}</p>`;
              }
            });
            return result;
          },
          // 确保tooltip不被遮挡
          offset: [10, 10],
          position: 'top',
        },
        {
          type: 'legend',
          nodeField: 'cluster',
          titleText: '组件类型',
          y: 60,
          // position: 'right-bottom', // 改为右下角，避免遮挡右上角的tooltip
          itemLabelFontSize: 11,
          itemMarkerSize: 8,
          // 调整legend的样式，使其更紧凑
          itemSpacing: 8,
          itemMarginBottom: 4,
        },
      ],
      behaviors: ['drag-element-force', 'zoom-canvas', 'drag-canvas'],
    });

    console.log('图表实例创建成功，开始渲染...');

    // 渲染后调整布局
    graph.render();

    // 如果布局很快完成，设置一个备用定时器
    // setTimeout(() => {
    //   if (!graph.destroyed) {
    //     console.log('备用定时器：调整视图居中');
    //     // graph.zoomTo(30);
    //     graph.fitView();
    //   }
    // }, 100);

    console.log('图表渲染完成');

    return graph;
  } catch (error) {
    console.error('创建图表失败:', error);
    return null;
  }
}

// 为了向后兼容，保留原有的 graph 实例
export const graph = new Graph({
  container: 'container',
  data: data1,
  node: {
    style: {
      size: 40,
      labelText: (d: any) => d.label,
      labelPlacement: 'middle' as any,
      labelFontSize: 12,
      labelFontWeight: 'bold',
      fill: (d: any) => d.color,
      stroke: '#fff',
      lineWidth: 2,
      r: 20,
      shadowColor: 'rgba(0,0,0,0.2)',
      shadowBlur: 8,
      shadowOffsetX: 2,
      shadowOffsetY: 2,
    },
  },
  edge: {
    style: {
      stroke: '#ccc',
      lineWidth: 1.5,
      endArrow: true as any,
      opacity: 0.7,
      labelText: (d: any) => d.label || ('' as any),
      labelFill: '#666',
      labelFontSize: 10,
      labelBackground: '#fff' as any,
      labelBackgroundPadding: [2, 4],
    },
  },
  layout: {
    type: 'd3-force',
    link: {
      distance: 80,
      strength: 1,
    },
    collide: {
      radius: 35,
    },
    nodeStrength: -100,
    alpha: 0.6,
    alphaDecay: 0.02,
    alphaMin: 0.001,
    // center: [300, 250],
    velocityDecay: 0.4,
    maxIteration: 1000,
  },
  plugins: [
    {
      type: 'tooltip',
      getContent: (e: any, items: any) => {
        let result = `<h4>节点信息</h4>`;
        items.forEach((item: any) => {
          result += `<p>名称: ${item.data.label}</p>`;
          if (item.data.cluster) {
            result += `<p>分类: ${item.data.cluster}</p>`;
          }
        });
        return result;
      },
      offset: [10, 10],
      position: 'top',
    },
    {
      type: 'legend',
      nodeField: 'cluster',
      titleText: '组件类型',
      position: 'bottom-right',
      itemLabelFontSize: 11,
      itemMarkerSize: 8,
      itemSpacing: 8,
      itemMarginBottom: 4,
    },
  ],
  behaviors: ['drag-element-force', 'zoom-canvas', 'drag-canvas'],
});
