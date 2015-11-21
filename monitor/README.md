
所有的依赖：

npm init
npm install socket.io --save
npm install express --save 
npm install cookie-parser --save
npm install body-parser	--save
npm install axon --save
npm install jade --save


===========================================

大概的路径是：

所有的应用进程通过axon向monitor上报内存数据集来完成基础监控功能

该项目同时负责向外暴露界面来供管理员查看

并且需要链接微信以及各种短信接口