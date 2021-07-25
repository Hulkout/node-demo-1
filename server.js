var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
    console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
    process.exit(1)
}

var server = http.createServer(function (request, response) {
    var parsedUrl = url.parse(request.url, true)
    var pathWithQuery = request.url
    var queryString = ''
    if (pathWithQuery.indexOf('?') >= 0) { queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
    var path = parsedUrl.pathname
    var query = parsedUrl.query
    var method = request.method

    /******** 从这里开始看，上面不要看 ************/

    // if (path === "/") {
    //     console.log("有人访问/了");
    //     response.setHeader('Content-Type', 'text/html;charset=utf-8')/*为了防止乱码 意思是我是一个文本语法是HTML*/
    //     /*加响应*/
    //     response.end("这就是响应内容\n");
    // }
    if (path === '/') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(`
        <!DOCTYPE html>
        <head>
        <link rel="stylesheet" href="/x">/*显示CSS*/
        </head>
        <body>
        <h1>标题</h1>
        <script src = "/y"></script>/*显示JS*/
        </body>
        `)/*这不是单引号注意是~上面那个*/
        response.end()
    } else if (path === '/x') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/css;charset=utf-8')
        response.write(`body{color: red;}`)
        response.end()
    } else if(path === '/y'){
  response.statusCode = 200
  response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
  response.write(`console.log('这是JS内容')`)
   response.end()
    }else{
        response.statusCode = 404
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(`你输入的路径不存在对应的内容`)
        response.end()
    }
    /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)
