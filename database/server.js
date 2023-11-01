import jsonServer from 'json-server';

const server = jsonServer.create();
const router = jsonServer.router('contacts.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
router.render = (req, res) => {
  if (Array.isArray(res.locals.data)) {
    return res.jsonp({
      contacts: res.locals.data
    });
  }
  return res.jsonp(res.locals.data);
};
server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});
