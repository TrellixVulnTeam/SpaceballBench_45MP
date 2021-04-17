var http = require('http'), httpProxy = require('http-proxy');
require('http-shutdown').extend();

let RULES = {}
let PROXY_HANDLERS = {}

let PORTS = {}
// handle url proxy
// data : {
//   id: <int>,
//   dst_hostname: <string>,
// }

function add_rule(rule){
    console.log(rule)

    if(!rule.hasOwnProperty('id') ||
       !rule.hasOwnProperty('dst_hostname')
       ) return;

    if(rule.dst_port === 5002) return;

    RULES[rule.id] = rule.dst_hostname
}

function remove_rule(rule){
    delete RULES[rule.id]
}

function open_port(port){
    PORTS[port] = true

    if(!PROXY_HANDLERS.hasOwnProperty(port)){
        server = http.createServer(ProxyHandler).withShutdown();
        server.listen(port);
        PROXY_HANDLERS[port] = server;
    }
}

function close_port(port){
    if(!PORTS.hasOwnProperty(port)) return;

    delete PORTS[port]
    PROXY_HANDLERS[port].shutdown()
}

const VALID_PATHS = {
    "PUT": ["/api/rules/add", "/api/rules/remove", "/api/port/add", "/api/port/remove"],
    "GET": ["/api/rules/list", "/api/port/list"]
}

// API for rules
http.createServer(function (req, res) {

    const reqPathString = new URL(req.url, `http://${req.headers.host}`).pathname
    let reqPath_ = reqPathString.split('/')
    reqPath_.shift()
    const reqPath = reqPath_

    if(!(req.method in VALID_PATHS ) || !VALID_PATHS[req.method].includes(reqPathString)){
        res.writeHead(404)
        res.end()
        return;
    }

    if(req.method === "PUT" && reqPath[0] === 'api' && reqPath[1] === 'rules' && reqPath[2] === 'add'){
        let data = "";
        req.on('data', chunk => {data += chunk;})
        req.on("end",()=>{
            res.end()
            add_rule(JSON.parse(data))
        }) 
    }

    else if(req.method === "PUT" && reqPath[0] === 'api' && reqPath[1] === 'rules' && reqPath[2] === 'remove'){
        let data = "";
        req.on('data', chunk => {data += chunk;})
        req.on("end",()=>{
            res.end()
            remove_rule(JSON.parse(data))
        }) 
    }

    else if(req.method === "GET" && reqPath[0] === 'api' && reqPath[1] === 'rules' && reqPath[2] === 'list'){
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write(JSON.stringify(RULES, true, 2));
        res.end();
    }



    else if(req.method === "PUT" && reqPath[0] === 'api' && reqPath[1] === 'port' && reqPath[2] === 'add'){
        let data = "";
        req.on('data', chunk => {data += chunk;})
        req.on("end",()=>{
            res.end()
            open_port(JSON.parse(data).port)
        }) 
    }

    else if(req.method === "PUT" && reqPath[0] === 'api' && reqPath[1] === 'port' && reqPath[2] === 'remove'){
        let data = "";
        req.on('data', chunk => {data += chunk;})
        req.on("end",()=>{
            res.end()
            close_port(JSON.parse(data).port)
        }) 
    }

    else if(req.method === "GET" && reqPath[0] === 'api' && reqPath[1] === 'port' && reqPath[2] === 'list'){
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write(JSON.stringify(PORTS, true, 2));
        res.end();
    }


    return;
}).listen(5002);

var proxy = httpProxy.createProxyServer({});

function ProxyHandler(req, res){
    let url = new URL(req.url, `http://${req.headers.host}`);
    let domain = url.hostname
    let port = url.port
    let path = url.pathname
    let id = 0

    let reqPath_ = path.split('/')
    reqPath_.shift()
    const reqPath = reqPath_

    if(reqPath.length > 0){
        id = reqPath[0]
        reqPath.shift()
        path = reqPath.join('/')
    } else {
        res.writeHead(404)
        res.end()
        return;
    }

    if(!RULES.hasOwnProperty(id)){
        res.writeHead(404)
        res.end()
        return;
    }

    let hostname = RULES[id]

    console.log(hostname, id, path, `http://${hostname}:${port}/${path}`)

    proxy.web(req, res, { target: `http://${hostname}:${port}/${path}` });
}















