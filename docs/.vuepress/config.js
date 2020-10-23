module.exports = {
  title: '我的网络日志',
  description: 'Just playing around',
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    lastUpdated: true
  },
  plugins: [
    // require('@vuepress/back-to-top'),
    // require('@vuepress/last-updated'),
    // require('@vuepress/blog')
  ],

  themeConfig: {
    smoothScroll: true,
    nav: [
      {
        text: 'CSS',
        link: '/css/'
      },
      {
        text: 'Webpack',
        link: '/webpack/'
      },
      {
        text: 'Linux',
        link: '/linux/'
      },
      {
        text: 'Nginx',
        link: '/nginx/'
      },
      {
        text: 'Docker',
        link: '/docker/'
      },
      // {
      //   text: '数据库',
      //   items: [
      //     { text: 'MySql', link: '/mysql/' },
      //     { text: 'MongoDB', link: '/mongodb/' },
      //   ]
      // },
      // {
      //   text: '更多',
      //   link: '/others/'
      // }
    ],
    // sidebar: 'auto'

    sidebar: {

      '/css/': [        
        '',
        "css-value"
      ],
    
      "/nginx/": [
        "",
        'nginx-install',
        'nginx-conf',
        'nginx-modues',
        'nginx-others',
      ],
      "/docker/": [
        ""
      ],
      "/linux/": [
        {
          title: "Linux",
          collapsable: false,
          children: [
            '',
            'linux-version',
            'linux-diff',
            'linux-vb',
            'linux-init',
          ]
        },
        {
          title: "目录和命令",
          collapsable: false,
          sidebarDepth: 3,
          children: [
            'linux-dir',
            'linux-order',
            'linux-zip',
            'linux-dish',
            'linux-service'
          ]
        },
        'linux-group',
        {
          title: "权限管理",
          collapsable: false,
          children: [
            'linux-permission',
            'linux-permission-umask',
            'linux-permission-acl',
            'linux-permission-sudo',
          ]
        },
        {
          title: "进程管理",
          collapsable: false,
          children: [
            'linux-process',
            'linux-job'
          ]
        },
        {
          title: "网络设置",
          collapsable: false,
          sidebarDepth: 3,
          children: [
            'linux-net',
            'linux-net-config',
            'linux-net-env',
            'linux-net-test',
            'linux-net-ssh',
          ]
        },
        {
          title: "Shell基础",
          collapsable: false,
          sidebarDepth: 3,
          children: [
            'shell',
            'shell-var',
            'shell-operator',
            'shell-path',
            'shell-flow-control',
            'shell-func',
            'shell-train',
          ]
        },
        {
          title: "软件包管理",
          collapsable: false,
          sidebarDepth: 3,
          children: [
            'linux-package',
            'linux-yum',
            'linux-origin-package',
            'linux-script-package',
          ]
        },
        {
          title: "定时任务",
          collapsable: false,
          sidebarDepth: 3,
          children: [
            'linux-timer-task',
          ]
        },

        {
          title: "VI编辑器",
          collapsable: false,
          children: [
            'vim',
            "vim-key"
          ]
        },
      ],
     
      'mysql':[
        '',
        'mysql-introduce'
        
      ],
      '/webpack/': [
        {
          title: "Plugin",
          collapsable: false,
          children: [
            '',
            'plugin'
          ]
        },
        {
          title: "Loader",
          collapsable: false,
          children: [
            'loader',
            'loader-config',
            'loader-use',
          ]
        },
      ]
    }
  }
}