npm scripts总结

一、原理

每次运行npm run 命令的时候会新建一个shell， 在里面运行相应的脚本。 

1、运行时会把当前项目的node_modules/.bin子目录加入path环境变量； 

2、运行结束时还原path变量。

3、node_modules/.bin子目录加入环境变量的好处时，可以直接用脚本名调用，不必加上路径。

经测试，运行脚本时npm 配置变量及 pakage.json中字段也会以名称级联的形式加入env环境变量，结束则还原。

二、查看及执行脚本命令

1、npm run 

查看当前项目下所有的脚本命令

2、npm run commandName 

执行相应的某个脚本命令，commandName是指调用的名称

三、通配符

1、*
 
\* 表示任意文件及目录

\*.js 任意文件名

a.* 任意扩展名

2、**

\** 表示任意目录及其子目录， 还包含当前目录下同级的任意文件

**/ 表示任意目录及其子目录

四、传参

向npm脚本传入参数，要使用--标明

* 当遇见第一个 -- 明确标明时, 无论后面是否再有--或者-开头的变量或再出现同样的--两个中横线，均视为实际传入参数(但这时的第一个--必须也只能是两个中横线字符( -- )，不能带变量名）;  &nbsp;&nbsp;

* 否则，按默认行为处理（包含：脚本命令符号后面 到 --之前中间这段距离声明的）。

默认行为： --name 或 -name 格式 的都是变量，不带--或-前辍的块为实际传入参数。

五、执行顺序

1、& 符号

并行执行（即同时平行执行）

npm run scripts1 & npm run scripts2

2、&& 符号

串行执行，又称继发执行。（一个任务完成，再执行下一个任务）

npm run scripts1 && npm run script2

六、常用简写形式

1、npm start 等同于 npm run start

2、npm stop 等同于 npm run stop

3、npm test 赞同于 npm run test;

4、npm restart 等同于 npm run restart;

备注：

通过测试发现，现在版本npm已经不再等同于npm stop && npm run restart && npm run start，只会运行npm run restart；

如有需要，可以pre, post钩子做相应的挂载操作

七、钩子

npm脚本有pre 和 post 两个钩子；分别表示执行前和执行后

{

&nbsp; &nbsp; &nbsp; &nbsp; "prebuild": "echo before build",

&nbsp; &nbsp; &nbsp; &nbsp; "build": "echo build",

&nbsp; &nbsp; &nbsp; &nbsp; "postbuild": "echo build after"

}

赞同于

npm run prebuild && npm run build && npm run postbuild


备注* 

process.env.npm\_lifycycle\_event 返回当前正在执行的脚本名称

可以在对应的 ‘执行文件’ 中使用，拿到后做相应的处理操作。

八、变量

npm run 执行脚本时，可在文件中通过process.env.npm\_package\_*级联的方式拿到相应的package.json文件里相应字段的具体某项值（拿不到相应字段的整个对象值）。

node file.js 直接执行是拿不到的npm的内部变量的，可放到通过npm脚本的方式运行解决

1、例子：

process.env.npm\_package\_name 

返回项目名

process.env.npm\_package\_version 

返回项目版本号

process.env.npm\_package\_devDependencies 

此指令是拿不到整个开发依赖对象的，会返回undefined, npm_package\_devDependencies\_包名才可以拿到对应值。

2、npm 配置变量

可以通过process.env.npm\_config\_*的方式拿到npm配置变量，即npm config set 设置的变量。如果不带项目名，默认获取的是整体的（不是某个项目的），有项目名时才表示某个项目的（通过对项目名_级联的方式获取，如npm\_config\_program\_fieldName, 遇到驼峰形式转换为_级联形式）。

\*  package.json中config字段配置的某项值会被npm config set配置的当前项目的相应值所覆盖。整体的配置(不带项目名，直接设置时）不会覆盖当前项目中config中的值。。

\*  设置形式如：npm config set program:fieldName value；program为当前项目名。fieldName为字段名。

例子：

设置命令：npm config set npm-scripts-demo:port = "5000"

配置文件生成中的结果是：npm-scripts-demo:port = "5000"

运行时会生成的环境变量是它们：

npm_config\_npm\_scripts\_demo\_port: '5000',

npm_package\_config\_port: '5000'


\* 总结：当package.json文件中配置config字段及其port时，只要运行了例子中的设置命令，实际运行时也会有npm_package\_config\_port环境变量。设置命令的生成的比config字段中优先级更高。
















 
  



