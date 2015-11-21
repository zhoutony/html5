# html5

# wechat movie node.js base


## 项目依赖

本项目依赖
*   基于ruby的sass
*   node.js
*   gulp
*   webpack
*   jade

### 依赖安装
    
*   安装 sass （如果已经安装过ruby和gem）
``` bas
sudo gem install sass
```

*   安装 node.js
先安装homebrew （参见[<http://brew.sh/>]）
``` bas
brew install nodejs
```

*   安装 gulp`
``` bas
npm install gulp -g
```

*   安装 webpack
先安装 xcode
``` bas
npm install webpack -g
npm install webpack --save-dev
```

安装pm2启动管理工具
npm  install pm2 -g
创建pm2自启动脚本，命令执行后会生成 /etc/init.d/pm2-init.sh 启动脚本
pm2 startup centos
使用自启动脚本（初次使用时需先用pm2 start xxx 启动之后再用）
/etc/init.d/pm2-init.sh {start|stop|status|restart|reload}
 
pm2常用命令：
pm2 start /data/gondor/dev.js    //进程模式启动
pm2 start /data/gondor/dev.js  -i 3    //集群模式启动，3表示启动的进程数
pm2 delete dev    //停止并删除node工程
pm2 list            // 查看所有进程
pm2 logs         // 查看日志

## test子工程

test项目依赖mocha来运行，同时为了兼容jenkins，所以使用了junit的report格式
参考：http://www.douban.com/note/490183569/

test子工程依赖有request库，以及可以对全站对外请求request全部mock的库---nock

mock_apis.js

> HTTP请求的mock框架
> export NOCK_OFF=true  即可关闭nock
> export NOCK_OFF=false 即可mock全部请求
* 文档地址1：https://www.npmjs.com/package/nock

之后可以使用shell脚本启动和关闭做测试

## 启动工程

node server.js即可启动，没有使用任何特殊功能
生产级别需要注意console.log和文件写入对性能的巨大影响，log4js需要搞定upd传输的生产环境问题

修改根目录下log.js即可

## 工程依赖问题

package.json下的^括号问题

cookies库以及post库等基础库的行为，已经写在test.js来约束

## 目录结构
* /docs				存放所有重要依赖组件的文档
* server.js 		服务器的入口文件
* package.json 		npm依赖的项目依赖类描述文件
* gulpfile.js 		gulp的build用makefile，因为code里存放了node_modules，所以可以不用安装？
* /views 			jade默认的模板存放路径
* /test 			mocha默认的测试套间存放地址
* /dist 			前端使用webpack等套间打包好之后的发布级别地址，主要是纯前端的打包
* /static      		所有静态文件的存放地址
* /logs 			临时的logs的地址，从配置上来说开启了按天切分
* /gulp 			具体的gulp的tasks的子文件的地址
* /config  			存放配置文件？


## 生产环境的部署

pm2部署，nginx转发请求，后端使用jade渲染，然后call php的api，整合成全页面
其中前端不直接call后端的api？？所以api和route的部署在一起，
依赖负载均衡nginx或者智能负载均衡的服务发现机制来转发请求到不同的集群，比如：api集群渲染集群，node作为网关


## 工作流程

1. 添加路由：route目录
2. 添加jade模板：views目录
3. 模板下添加对前端js的引用：block prepend script script(src="/script/wecinema/common.js")script(src="/script/wecinema/choose_cinema.js")
4. 添加webpack入口：webpack.config.js==>choose_cinema: config.src.js + '/wecinema/choose_cinema.js'
5. 入口添加之后在static/script/wecinema下添加对应的前端文件
6. 添加后端接口mock====>在test/mocks_apis.js里添加对应接口
7. 路由层当中添加对model的调用，lib/model.js
8. 启动gulp==>根目录运行gulp即可
9. build js文件：在webpack.config.js同一级目录的话直接运行webpack即可，需要安装，另外sass依赖在这份文件的头部有写
10. 检查dist目录，检查webfont、检查pic目录，需要写gulp或者make脚本来更新到dist目录

## 配置支付

支付接口依赖用户的open_id，以及后端的支付接口，PHP转发到了JAVA，然后JAVA唤起微信端服务器签名认证
配置的支付地址必须带上/为结尾，所以传参必须走?query传参
唤起支付成功后就是回调结果页，传递订单ID号了，这里需要配置微信的回调号以及支付的回调地址，暂时使用老的API唤起微信支付
新的API需要后端配合签名认证
