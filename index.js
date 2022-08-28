var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const products = [
    { productid: '1', name: 'book', price: 100, minquantity: 3, maximumquanty: null, discountapplyamount: 500, maximumdicount: 60, percentagediscount: 10 },
    { productid: '2', name: 'sanitizer', price: 250, minquantity: 10, maximumquanty: null, discountapplyamount: 3000, maximumdicount: 100, percentagediscount: null },
    { productid: '3', name: 'bag', price: 1500, minquantity: null, maximumquanty: 2, discountapplyamount: null, maximumdicount: null, percentagediscount: null },
]


function createUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
       var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
       return v.toString(16);
    });
 }
function groupBy(objectArray, property) {
    return objectArray.reduce(function (acc, obj) {
        var key = obj[property];
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
    }, {});
}

let cartitems = [];

//Routes
app.get('/', function (req, res) {
    res.send('Server is running..!');
});
//available products
app.get('/products', function (req, res) {
    res.jsonp(products)
});
//Items in the cart
app.get('/getcartitems', function (req, res) {
    if (cartitems.length == 0) {
        res.json('No items found!');
    } else {
        res.json(cartitems);
    }
});

app.delete('/deletefromcart/:id', function (req, res) {
    console.log(req.params)
    if (cartitems.length == 0) {
        res.json('No items found!');
    } else {

       var arrayindex=  cartitems.findIndex(x=>x.id == req.params.id);

       if(arrayindex == -1){
        res.json('Delete failed No items found!');
       }else{
        let item = cartitems[arrayindex].id;
        cartitems.splice(arrayindex,1);
        res.json('Item with id'+item+ ' is deleted');
       }

       console.log(cartitems)
       console.log(arrayindex)
    }

    res.json('No items found!');
});


app.get('/checkout', function (req, res) {
    let finalResponse = [];
    let errors = [];

    if (cartitems.length === 0) {
        res.json('No items found!');
    } else {
        var groupedproducts = Object.values(groupBy(cartitems, 'productid'));
        
        for (let i = 0; i < groupedproducts.length; i++) {

            const productCatgory = groupedproducts[i];
            let productcat = {
                name: productCatgory[0].name,
                itemPrice: 0,
                numberOfQuantity: 0,
                productid: productCatgory[0].productid,
                finalPriceafterdiscount: 0
            }
            var amount = 0;
            var minquantity = 0;
            var discountprice = 0;
            if (productCatgory.length > 0) {
                for (let z = 0; z < productCatgory.length; z++) {
                    const product = productCatgory[z];
                    amount = amount + product.price;
                    minquantity = product.minquantity;

                    if (productCatgory.length < product.minquantity) {
                        if (errors.findIndex(x => x.productid === product.productid) == -1) {
                            errors.push({
                                productid: product.productid,
                                msg: "minimum quantity of the product " + product.name + " should be " + product.minquantity
                            });
                        }
                    }

                    if (product.maximumquanty != null && product.maximumquanty < productCatgory.length) {
                        if (errors.findIndex(x => x.productid === product.productid) == -1) {
                            errors.push({
                                productid: product.productid,
                                msg: "maximum quantity of the product " + product.name + " must be " + product.maximumquanty
                            });
                        }
                    }
                }
                productcat.itemPrice = amount
                productcat.numberOfQuantity = productCatgory.length;
                if (productCatgory[0].discountapplyamount != null && productCatgory[0].discountapplyamount <= amount) {
                    // discount eligible 
                    //apply discount  
                    // percentagediscount == null when flat rate is there 

                    if (productCatgory[0].percentagediscount != null) {

                        var discountcalcamount = (amount * productCatgory[0].percentagediscount) / 100;
                        console.log("discountcalcamount" + discountcalcamount)
                        if (discountcalcamount > productCatgory[0].maximumdicount) {
                            discountcalcamount = productCatgory[0].maximumdicount
                            console.log("discountcalcamount", discountcalcamount)
                            productcat.finalPriceafterdiscount = amount - productCatgory[0].maximumdicount;
                        } else {
                            productcat.finalPriceafterdiscount = amount - discountcalcamount
                        }
                    } else {
                        if (amount >= productCatgory[0].discountapplyamount) {
                            productcat.finalPriceafterdiscount = amount - productCatgory[0].maximumdicount
                        }
                    }

                } else {
                    productcat.finalPriceafterdiscount = amount;
                }
                finalResponse.push(productcat)
            }
        }

        var OBJ = {
            errors: errors,
            finalResponse: errors.length === 0 ? finalResponse : [],
            totalsum: errors.length === 0 ? finalResponse.map(i => i.finalPriceafterdiscount).reduce((a, b) => a + b) : 0,
            isCouponCodeapplied: false,
            aftercouponappliedamount: 0
        }
        if (OBJ.totalsum >= 10000) { // final discount treshold amount
            OBJ.isCouponCodeapplied = true;
            OBJ.aftercouponappliedamount = OBJ.totalsum - 123;  // 123 -> final discount treshold amount (coupon code)

        } else {
            OBJ.isCouponCodeapplied = false;
        }
        res.jsonp(OBJ);

    }

    if (cartitems.length == 0) {
        res.json('No items found!');
    } else {
        res.json(cartitems);
    }
});

app.post('/addtocart', urlencodedParser, function (req, res) {
    var product = products.find(x => x.productid == Number.parseInt(req.body.productid));
    // product.id =  createUUID();

    var obj = {
        ...product,
        id: createUUID()
    }

  
    if (product) {
        //add to the cart 
        cartitems.push(obj);
        console.log(obj)

        res.json("Product added to cart succesfully!");
    }
    else {
        res.json('Invalid ProductID!');
    }

})


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
var server = app.listen(8000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('shopping cart app listening at http://%s:%s', host, port);
});  