import { PORT_HTTP_DEFAULT, PORT_WEBSOCKET_DEFAULT } from './src/lib/constants';
import { httpServer } from './src/http_server';
import { WebSocketServerExtended } from './src/websocket_server';

const PORT_HTTP = +(process.env.PORT_HTTP ?? PORT_HTTP_DEFAULT);
httpServer.listen(PORT_HTTP);
console.log(`Start static http server on the ${PORT_HTTP} port!`);

const PORT_WEBSOCKET = +(process.env.PORT_WEBSOCKET ?? PORT_WEBSOCKET_DEFAULT);
new WebSocketServerExtended(PORT_WEBSOCKET);
console.log(`Start static websocket server on the ${PORT_WEBSOCKET} port!`);
