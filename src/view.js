
//输入出当前执行的脚本名称
console.log(process.env.npm_lifecycle_event);

//输出当前项目名
console.log(process.env.npm_package_name);

//输出当前项目版本号
console.log(process.env.npm_package_version);

//输出当前项目config字段中的port的值
console.log(process.env.npm_package_config_port);

//输出npm配置文件中设置的port值
console.log(process.env.npm_config_port);


//输出执行时的环境变量
//console.log(process.env);
