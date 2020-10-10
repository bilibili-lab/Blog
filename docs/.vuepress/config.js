module.exports = {
  title: '我的网络日志',
  description: 'Just playing around',
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    lastUpdated: '上次更新', // string | boolean
  },
  themeConfig: {
    smoothScroll: true,

    nav: [
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
      {
        text: '其他',
        link: '/others/'
      },
      // {
      //   text: '了解更多',
      //   ariaLabel: '了解更多',
      //   items: [
      //     {
      //       text: 'API',
      //       items: [
      //         {
      //           text: 'CLI',
      //           link: '/zh/api/cli.html'
      //         },
      //         {
      //           text: 'Node',
      //           link: '/zh/api/node.html'
      //         }
      //       ]
      //     },
      //     {
      //       text: '开发指南',
      //       items: [
      //         {
      //           text: '本地开发',
      //           link: '/zh/miscellaneous/local-development.html'
      //         },
      //         {
      //           text: '设计理念',
      //           link: '/zh/miscellaneous/design-concepts.html'
      //         },
      //         {
      //           text: 'FAQ',
      //           link: '/zh/faq/'
      //         },
      //         {
      //           text: '术语',
      //           link: '/zh/miscellaneous/glossary.html'
      //         }
      //       ]
      //     },
      //     {
      //       text: '其他',
      //       items: [
      //         {
      //           text: '从 0.x 迁移',
      //           link: '/zh/miscellaneous/migration-guide.html'
      //         },
      //         {
      //           text: 'Changelog',
      //           link: 'https://github.com/vuejs/vuepress/blob/master/CHANGELOG.md'
      //         }
      //       ]
      //     }
      //   ]
      // },
      // {
      //   text: '0.x',
      //   link: 'https://v0.vuepress.vuejs.org/'
      // }
    ],
    // sidebar: 'auto'

    sidebar: {
      // "/nginx/": [
      //   {
      //     title: "nginx",
      //     collapsable: false,
      //     children: [
      //       '',
      //       'nginx-install',
      //       'nginx-conf',
      //       'nginx-log',
      //     ]
      //   },
      // ],
      "/nginx/": [
        "",
        'nginx-install',
        'nginx-conf',
        'nginx-modues',
        // 'nginx-log',
        'nginx-others',
      ],
      "/docker/": [
        {
          title: "docker",
          collapsable: false,
          sidebarDepth: 2,
          children: [
            ''
          ]
        },
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
        // 'linux-net',
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
            // 'linux-origin-package-mng',
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
      '/webpack/': [
        {
          title: "进阶",
          collapsable: false,
          children: [
            '',
            'tapable',
            'plugin'
          ]
        },
        // {
        //   title: "2",
        //   collapsable: false,
        //   children: [
        //     'frontmatter',
        //     'permalinks',
        //     'markdown-slot',
        //     'global-computed'
        //   ]
        // }
      ]
    }
  }
}