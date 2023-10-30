import { createServer } from "http";

function onRequest(request, response) {
  const url = new URL(request.url, "http://localhost");
  const [action, ...args] = url.pathname.slice(1).split("/");
  const { method } = request;
  const route = `${method}/${action}`.trim();

  switch (route) {
    case "GET /":
      return response.end("OK");

    case "GET /c":
      return onServeComponent(request, response, url, args);

    default:
      response.writeHead(404).end("Unable to resolve " + route);
  }
}

function onServeComponent(_request, response, _, args) {
  response.writeHead(200, {
    "cache-control": "max-age=604800",
  });

  response.end("OK " + args);
}

createServer(onRequest).listen(Number(process.env.PORT));
