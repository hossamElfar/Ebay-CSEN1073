import { Router } from 'express'
import {
    default as Amqp
} from 'amqplib'
const router = new Router()
import uuid from 'uuid/v4'
import when from 'when';
import {StringDecoder} from 'string_decoder';

/**
 * @apiDefine master Master access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine admin Admin access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine user User access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine listParams
 * @apiParam {String} [q] Query to search.
 * @apiParam {Number{1..30}} [page=1] Page number.
 * @apiParam {Number{1..100}} [limit=30] Amount of returned items.
 * @apiParam {String[]} [sort=-createdAt] Order of returned items.
 * @apiParam {String[]} [fields] Fields to be returned.
 */

  let connection = Amqp.connect("amqp://ebay:ebay@172.17.0.2:5672")
  console.log({ connection });
  // let data = { "action": "createItem", "data": { "itemName": "AAAA pro", "price": "70", "desc": "item created", "categoryID": "1", "quantity": "5", "sellerID": "1" } };
  let data = { "action": "createUser", "data": { "firstName": "test user", "lastName": "aa", "email": "test@test.com", "password": "123" } };
  connection.then((conn) => {
          return conn.createChannel();
      }).then((channel) => {
              for (let i = 0; i < 3; i++) {
              let data = { "action": "createUser", "data": { "firstName": `test user ${i}`, "lastName": `last ${i}`, "email": `test${i}@test.com`, "password": "123" } };
                let correlationId = uuid();
                when.all([
                  channel.assertQueue('EbayMerchantsRequest'),
                  channel.assertQueue('EbayMerchantsResponse'),

                  channel.sendToQueue('EbayMerchantsRequest', new Buffer(JSON.stringify(data)), { correlationId }),
                  channel.consume('EbayMerchantsResponse', (message) => {
                    let { content, fields, properties } = message;
                    let recievedCorrId = properties.correlationId;
                    let decoder = new StringDecoder('utf8');
                    content = decoder.write(content);
                    if (recievedCorrId === correlationId) {
                      console.log("CORRECT MESSAGE: ", {message});
                      channel.ack(message);
                    } else {
                      console.log("Discarded MESSAGE");
                      channel.nack(message);
                    }

                  })
                ]);
              }
      })

router.get("/", (req, res, next) => {

})
export default router
