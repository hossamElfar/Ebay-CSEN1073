
// run using node.js pick one of the below libraries
//var request = require('request');
var unirest = require('unirest');
//var http    =  require('http');

function handleError( jqXHR, textStatus, errorThrown ){
    console.log("Connection With Server Failed", textStatus + ' ' +  errorThrown);
}

function stripNewLineCharacter( strText ){
    strText = strText.replace(/(?:\r\n|\r|\n)/g, '<br />');
    return strText;
}


function sendRequest_vista( strJSON, callbackfunc ){
   
    request.cookie("");
    request.post('http://localhost:3000/',
                { form: { SrvReq: strJSON } },
                function(err,httpResponse,body){callbackfunc(err,httpResponse,body)}
    );
}

function sendRequest_win8( strJSON, callbackfunc ){

    unirest.post('http://localhost:3000/')
    .header('Accept', 'application/json')
    .send({ "SrvReq": strJSON })
    .end(function (response) {
        console.log(response.body);
    });
}

function sendRequest( strJSON, callbackfunc ){
    console.log( "trying to send " + strJSON );
    sendRequest_win8(strJSON, callbackfunc);
}

function deleteItemCategory(itemID, categoryID){
    var gsRequest           =   new Object( );
    gsRequest.action        =   "deleteItemCategory";
    var gsRequestData       =   new Object( );
    gsRequestData.itemID    =   itemID;
    gsRequestData.categoryID=   categoryID;
    gsRequest.data          =   gsRequestData;
    var strJSON = JSON.stringify(gsRequest);    
    sendRequest( strJSON, attemptLoginResponse );
}

function createCart(userID){
    var gsRequest           =   new Object( );
    gsRequest.action        =   "createCart";
    var gsRequestData       =   new Object( );
    gsRequestData.userID    =   userID;
    gsRequest.data          =   gsRequestData;
    var strJSON = JSON.stringify(gsRequest);    
    sendRequest( strJSON, attemptLoginResponse );
}

function deleteCart(ID){
    var gsRequest           =   new Object( );
    gsRequest.action        =   "deleteCart";
    var gsRequestData       =   new Object( );
    gsRequestData.ID        =   ID;
    gsRequest.data          =   gsRequestData;
    var strJSON = JSON.stringify(gsRequest);    
    sendRequest( strJSON, attemptLoginResponse );
}

function findCart(ID){
    var gsRequest           =   new Object( );
    gsRequest.action        =   "findCart";
    var gsRequestData       =   new Object( );
    gsRequestData.ID        =   ID;
    gsRequest.data          =   gsRequestData;
    var strJSON = JSON.stringify(gsRequest);    
    sendRequest( strJSON, attemptLoginResponse );
}

function addItemToCart(cartID, itemID, quantity){
    var gsRequest           =   new Object( );
    gsRequest.action        =   "addItemToCart";
    var gsRequestData       =   new Object( );
    gsRequestData.cartID    =   cartID;
    gsRequestData.itemID    =   itemID;
    gsRequestData.quantity  =   quantity;
    gsRequest.data          =   gsRequestData;
    var strJSON = JSON.stringify(gsRequest);    
    sendRequest( strJSON, attemptLoginResponse );
}

function updateItemInCart(cartID, itemID, quantity){
    var gsRequest           =   new Object( );
    gsRequest.action        =   "updateItemInCart";
    var gsRequestData       =   new Object( );
    gsRequestData.cartID    =   cartID;
    gsRequestData.itemID    =   itemID;
    gsRequestData.quantity  =   quantity;
    gsRequest.data          =   gsRequestData;
    var strJSON = JSON.stringify(gsRequest);    
    sendRequest( strJSON, attemptLoginResponse );
}

function deleteItemInCart(cartID, itemID){
    var gsRequest           =   new Object( );
    gsRequest.action        =   "deleteItemInCart";
    var gsRequestData       =   new Object( );
    gsRequestData.cartID    =   cartID;
    gsRequestData.itemID    =   itemID;
    gsRequest.data          =   gsRequestData;
    var strJSON = JSON.stringify(gsRequest);    
    sendRequest( strJSON, attemptLoginResponse );
}

function viewItemsInCart(cartID){
    var gsRequest           =   new Object( );
    gsRequest.action        =   "viewItemsInCart";
    var gsRequestData       =   new Object( );
    gsRequestData.cartID    =   cartID;
    gsRequest.data          =   gsRequestData;
    var strJSON = JSON.stringify(gsRequest);    
    sendRequest( strJSON, attemptLoginResponse );
}
  

function addUserResponse( err,httpResponse,body ){
    console.log( body );
}

function attemptLoginResponse(){
    console.log("life is so easy you know");
}
//// Nesreen ////
// ITEM
function createItem(itemName, price, desc,categoryID, quantity, sellerID){
   var gsRequest           =   new Object( );
   gsRequest.action        =   "createItem";
   var gsRequestData       =   new Object( );
   gsRequestData.itemName     =   itemName;
   gsRequestData.price  =   price;
   gsRequestData.desc     =   desc;
   gsRequestData.categoryID     =   categoryID;
   gsRequestData.quantity  =   quantity;
   gsRequestData.sellerID  =   sellerID;
   gsRequest.data          =   gsRequestData;
   var strJSON = JSON.stringify(gsRequest);    
   sendRequest( strJSON, attemptLoginResponse );
}

function editItem(itemID, itemName, price, quantity,desc, sellerID){
   var gsRequest           =   new Object( );
   gsRequest.action        =   "editItem";
   var gsRequestData       =   new Object( );
   gsRequestData.itemID    =   itemID;
   gsRequestData.itemName  =   itemName;
   gsRequestData.price     =   price;
   gsRequestData.desc      =   desc;
   gsRequestData.quantity  =   quantity;
   gsRequestData.sellerID  =   sellerID;
   gsRequest.data          =   gsRequestData;
   var strJSON = JSON.stringify(gsRequest);    
   sendRequest( strJSON, attemptLoginResponse );
}
function deleteItem(itemID){
   var gsRequest           =   new Object( );
   gsRequest.action        =   "deleteItem";
   var gsRequestData       =   new Object( );
   gsRequestData.itemID    =   itemID;
   gsRequest.data          =   gsRequestData;
   var strJSON = JSON.stringify(gsRequest);    
   sendRequest( strJSON, attemptLoginResponse );
}
function findItem(itemID){
   var gsRequest           =   new Object( );
   gsRequest.action        =   "findItem";
   var gsRequestData       =   new Object( );
   gsRequestData.itemID    =   itemID;
   gsRequest.data          =   gsRequestData;
   var strJSON = JSON.stringify(gsRequest);    
   sendRequest( strJSON, attemptLoginResponse );
}
function viewItem(){
   var gsRequest           =   new Object( );
   gsRequest.action        =   "viewItem";
   var gsRequestData       =   new Object( );
   gsRequest.data          =   gsRequestData;
   var strJSON = JSON.stringify(gsRequest);    
   sendRequest( strJSON, attemptLoginResponse );
}
// Command
function createComment(comment_text, itemID, userID){
   var gsRequest           =   new Object( );
   gsRequest.action        =   "createComment";
   var gsRequestData       =   new Object( );
   gsRequestData.comment_text  =   comment_text;
   gsRequestData.itemID     =   itemID;
   gsRequestData.userID      =   userID;
   gsRequest.data          =   gsRequestData;
   var strJSON = JSON.stringify(gsRequest);    
   sendRequest( strJSON, attemptLoginResponse );
}
function editComment(comment_text, itemID, userID,commentID){
   var gsRequest           =   new Object( );
   gsRequest.action        =   "editComment";
   var gsRequestData       =   new Object( );
   gsRequestData.comment_text  =   comment_text;
   gsRequestData.itemID     =   itemID;
   gsRequestData.userID      =   userID;
   gsRequestData.commentID = commentID
   gsRequest.data          =   gsRequestData;
   var strJSON = JSON.stringify(gsRequest);    
   sendRequest( strJSON, attemptLoginResponse );
}
function viewComment(){
   var gsRequest           =   new Object( );
   gsRequest.action        =   "viewComment";
   var gsRequestData       =   new Object( );
   gsRequest.data          =   gsRequestData;
   var strJSON = JSON.stringify(gsRequest);    
   sendRequest( strJSON, attemptLoginResponse );
}
function findComment(commentID){
   var gsRequest           =   new Object( );
   gsRequest.action        =   "findComment";
   var gsRequestData       =   new Object( );
   gsRequestData.commentID = commentID;
   gsRequest.data          =   gsRequestData;
   var strJSON = JSON.stringify(gsRequest);    
   sendRequest( strJSON, attemptLoginResponse );
}
//Rating
function createUserRating(rating, itemID, userID){
   var gsRequest           =   new Object( );
   gsRequest.action        =   "createUserRating";
   var gsRequestData       =   new Object( );
   gsRequestData.rating  =   rating;
   gsRequestData.itemID     =   itemID;
   gsRequestData.userID      =   userID;
   gsRequest.data          =   gsRequestData;
   var strJSON = JSON.stringify(gsRequest);    
   sendRequest( strJSON, attemptLoginResponse );
}
function editUserRating(rating, itemID, userID){
   var gsRequest           =   new Object( );
   gsRequest.action        =   "editUserRating";
   var gsRequestData       =   new Object( );
   gsRequestData.rating  =   rating;
   gsRequestData.itemID     =   itemID;
   gsRequestData.userID      =   userID;
   gsRequest.data          =   gsRequestData;
   var strJSON = JSON.stringify(gsRequest);    
   sendRequest( strJSON, attemptLoginResponse );
}
function deleteUserRating(itemID, userID){
   var gsRequest           =   new Object( );
   gsRequest.action        =   "deleteUserRating";
   var gsRequestData       =   new Object( );
   gsRequestData.itemID     =   itemID;
   gsRequestData.userID      =   userID;
   gsRequest.data          =   gsRequestData;
   var strJSON = JSON.stringify(gsRequest);    
   sendRequest( strJSON, attemptLoginResponse );
}
function viewItemUserRating(itemID){
    var gsRequest           =   new Object( );
   gsRequest.action        =   "viewItemUserRating";
   var gsRequestData       =   new Object( );
   gsRequestData.itemID     =   itemID;
   gsRequest.data          =   gsRequestData;
   var strJSON = JSON.stringify(gsRequest);    
   sendRequest( strJSON, attemptLoginResponse );
}
function findItemRating(itemID,userID){
    var gsRequest           =   new Object( );
   gsRequest.action        =   "findItemRating";
   var gsRequestData       =   new Object( );
   gsRequestData.itemID     =   itemID;
   gsRequestData.userID     =   userID;
   gsRequest.data          =   gsRequestData;
   var strJSON = JSON.stringify(gsRequest);    
   sendRequest( strJSON, attemptLoginResponse );
}
function calculateRating(itemID){
    var gsRequest           =   new Object( );
   gsRequest.action        =   "calculateRating";
   var gsRequestData       =   new Object( );
   gsRequestData.itemID     =   itemID;
   gsRequest.data          =   gsRequestData;
   var strJSON = JSON.stringify(gsRequest);    
   sendRequest( strJSON, attemptLoginResponse );
}
// end nesreen's func//

//----------Rana's part ----------
function createCategory(categoryName){
  var gsRequest           =   new Object( );
  gsRequest.action        =   "createCategory";
  var gsRequestData       =   new Object( );
  gsRequestData.categoryName    =   categoryName;
  gsRequest.data          =   gsRequestData;
  var strJSON = JSON.stringify(gsRequest);
  sendRequest( strJSON, attemptLoginResponse );
}

function createCategory(categoryName){
  var gsRequest           =   new Object( );
  gsRequest.action        =   "createCategory";
  var gsRequestData       =   new Object( );
  gsRequestData.categoryName    =   categoryName;
  gsRequest.data          =   gsRequestData;
  var strJSON = JSON.stringify(gsRequest);
  sendRequest( strJSON, attemptLoginResponse );
}

function editCategory(id, categoryName){

 var gsRequest           =   new Object( );
 gsRequest.action        =   "editCategory";
 var gsRequestData       =   new Object( );
 gsRequestData.id    =   id;
 gsRequestData.categoryName    =   categoryName;
 gsRequest.data          =   gsRequestData;
 var strJSON = JSON.stringify(gsRequest);
 sendRequest( strJSON, attemptLoginResponse );
}


function createItemCategory(itemID, categoryID){

 var gsRequest           =   new Object( );
 gsRequest.action        =   "createItemCategory";
 var gsRequestData       =   new Object( );
 gsRequestData.itemid    =   itemID;
 gsRequestData.categoryid    =   categoryID;
 gsRequest.data          =   gsRequestData;
 var strJSON = JSON.stringify(gsRequest);
 sendRequest( strJSON, attemptLoginResponse );
}

function deleteCategory(id){

 var gsRequest           =   new Object( );
 gsRequest.action        =   "deleteCategory";
 var gsRequestData       =   new Object( );
 gsRequestData.id    =   id;
 gsRequest.data          =   gsRequestData;
 var strJSON = JSON.stringify(gsRequest);
 sendRequest( strJSON, attemptLoginResponse );
}

function findCategory(categoryID){

 var gsRequest           =   new Object( );
 gsRequest.action        =   "findCategory";
 var gsRequestData       =   new Object( );
 gsRequestData.id    =   categoryID;
 gsRequest.data          =   gsRequestData;
 var strJSON = JSON.stringify(gsRequest);
 sendRequest( strJSON, attemptLoginResponse );
}

function findItemCategory(itemID, categoryID){

 var gsRequest           =   new Object( );
 gsRequest.action        =   "findItemCategory";
 var gsRequestData       =   new Object( );
 gsRequestData.itemid    =   itemID;
 gsRequestData.categoryid    =   categoryID;
 gsRequest.data          =   gsRequestData;
 var strJSON = JSON.stringify(gsRequest);
 sendRequest( strJSON, attemptLoginResponse );
}

function viewCategory(){

 var gsRequest           =   new Object( );
 gsRequest.action        =   "viewCategory";
 var gsRequestData       =   new Object( );
 gsRequest.data          =   gsRequestData;
 var strJSON = JSON.stringify(gsRequest);
 sendRequest( strJSON, attemptLoginResponse );
}
//----------Rana's part ----------

// To start sending messages:
// deleteItemCategory('3','1');
// createCart('1');
// deleteCart('2');
// findCart('3');
// addItemToCart('3','4','3');
// updateItemInCart('3','4','5');
// deleteItemInCart('3','4');
// viewItemsInCart('3');

// nesreens msgs

/////////////////////////////////////////////Item/////////////////////////////////
  createItem('jsonItemTest', '50', 'item created','1', '5', '1');
// editItem('8','nesreen2', '500', '1', 'item created', '1');
// deleteItem('13');
// findItem('4');
// viewItem();
/////////////////////////////////////////////Comment/////////////////////////////////
// createComment('2nd comment because why not','4','1');
// editComment('test edit comment command', '4','1','15');
// viewComment();
// findComment('16');
/////////////////////////////////////////////Rating/////////////////////////////////
// createUserRating('3', '4' , '1');
// createUserRating('5', '4' , '3');
// createUserRating('2', '5' , '3');

// editUserRating('5','4','1');
// deleteUserRating('4','1');
// viewItemUserRating('4');
// findItemRating('4','3');
// calculateRating('4');
// end nesreens msgs
//attemptLogin("mohamed@m.com","johnpass");
// createCategory('testMongo2');
// viewItemRating('3');
// editCategory('9','Nesreen Category');
// createItemCategory('3','3');
// deleteCategory('11');
// findCategory('3');
// findItemCategory('3','3');
// viewCategory();



      

                  
