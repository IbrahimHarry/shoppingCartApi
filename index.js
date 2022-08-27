var express = require('express');
var app = express();

const products = [
    { productid: '1', name: 'book', price: 100, minquantity: 3, maximumquanty: null, discountapplyamount: 500, maximumdicount: 60, percentagediscount: 10 },
    { productid: '2', name: 'sanitizer', price: 250, minquantity: 10, maximumquanty: null, discountapplyamount: 3000, maximumdicount: 100, percentagediscount: null },
    { productid: '3', name: 'bag', price: 1500, minquantity: null, maximumquanty: 2, discountapplyamount: null, maximumdicount: null, percentagediscount: null },
]

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

let cartitems = [
    { productid: '1', name: 'book', price: 100, minquantity: 3, maximumquanty: null, discountapplyamount: 500, maximumdicount: 60, percentagediscount: 10 },
    { productid: '1', name: 'book', price: 100, minquantity: 3, maximumquanty: null, discountapplyamount: 500, maximumdicount: 60, percentagediscount: 10 },
    { productid: '1', name: 'book', price: 100, minquantity: 3, maximumquanty: null, discountapplyamount: 500, maximumdicount: 60, percentagediscount: 10 },
    { productid: '1', name: 'book', price: 100, minquantity: 3, maximumquanty: null, discountapplyamount: 500, maximumdicount: 60, percentagediscount: 10 },
    { productid: '1', name: 'book', price: 100, minquantity: 3, maximumquanty: null, discountapplyamount: 500, maximumdicount: 60, percentagediscount: 10 },
    { productid: '1', name: 'book', price: 100, minquantity: 3, maximumquanty: null, discountapplyamount: 500, maximumdicount: 60, percentagediscount: 10 },
    { productid: '1', name: 'book', price: 100, minquantity: 3, maximumquanty: null, discountapplyamount: 500, maximumdicount: 60, percentagediscount: 10 },
    { productid: '2', name: 'sanitizer', price: 250, minquantity: 10, maximumquanty: null, discountapplyamount: 3000, maximumdicount: 100, percentagediscount: null },
    { productid: '2', name: 'sanitizer', price: 250, minquantity: 10, maximumquanty: null, discountapplyamount: 3000, maximumdicount: 100, percentagediscount: null },
    { productid: '2', name: 'sanitizer', price: 250, minquantity: 10, maximumquanty: null, discountapplyamount: 3000, maximumdicount: 100, percentagediscount: null },
    { productid: '2', name: 'sanitizer', price: 250, minquantity: 10, maximumquanty: null, discountapplyamount: 3000, maximumdicount: 100, percentagediscount: null },
    { productid: '2', name: 'sanitizer', price: 250, minquantity: 10, maximumquanty: null, discountapplyamount: 3000, maximumdicount: 100, percentagediscount: null },
    { productid: '2', name: 'sanitizer', price: 250, minquantity: 10, maximumquanty: null, discountapplyamount: 3000, maximumdicount: 100, percentagediscount: null },
    { productid: '2', name: 'sanitizer', price: 250, minquantity: 10, maximumquanty: null, discountapplyamount: 3000, maximumdicount: 100, percentagediscount: null },
    { productid: '2', name: 'sanitizer', price: 250, minquantity: 10, maximumquanty: null, discountapplyamount: 3000, maximumdicount: 100, percentagediscount: null },
    { productid: '2', name: 'sanitizer', price: 250, minquantity: 10, maximumquanty: null, discountapplyamount: 3000, maximumdicount: 100, percentagediscount: null },
    { productid: '2', name: 'sanitizer', price: 250, minquantity: 10, maximumquanty: null, discountapplyamount: 3000, maximumdicount: 100, percentagediscount: null },
    { productid: '2', name: 'sanitizer', price: 250, minquantity: 10, maximumquanty: null, discountapplyamount: 3000, maximumdicount: 100, percentagediscount: null },
    { productid: '2', name: 'sanitizer', price: 250, minquantity: 10, maximumquanty: null, discountapplyamount: 3000, maximumdicount: 100, percentagediscount: null },
    { productid: '3', name: 'bag', price: 1500, minquantity: null, maximumquanty: 2, discountapplyamount: null, maximumdicount: null, percentagediscount: null },
    { productid: '3', name: 'bag', price: 1500, minquantity: null, maximumquanty: 2, discountapplyamount: null, maximumdicount: null, percentagediscount: null },
    { productid: '2', name: 'sanitizer', price: 250, minquantity: 10, maximumquanty: null, discountapplyamount: 3000, maximumdicount: 100, percentagediscount: null },
    { productid: '2', name: 'sanitizer', price: 250, minquantity: 10, maximumquanty: null, discountapplyamount: 3000, maximumdicount: 100, percentagediscount: null },
    { productid: '2', name: 'sanitizer', price: 250, minquantity: 10, maximumquanty: null, discountapplyamount: 3000, maximumdicount: 100, percentagediscount: null },
    { productid: '2', name: 'sanitizer', price: 250, minquantity: 10, maximumquanty: null, discountapplyamount: 3000, maximumdicount: 100, percentagediscount: null },
    { productid: '2', name: 'sanitizer', price: 250, minquantity: 10, maximumquanty: null, discountapplyamount: 3000, maximumdicount: 100, percentagediscount: null },
    { productid: '2', name: 'sanitizer', price: 250, minquantity: 10, maximumquanty: null, discountapplyamount: 3000, maximumdicount: 100, percentagediscount: null },
    { productid: '2', name: 'sanitizer', price: 250, minquantity: 10, maximumquanty: null, discountapplyamount: 3000, maximumdicount: 100, percentagediscount: null },
    { productid: '2', name: 'sanitizer', price: 250, minquantity: 10, maximumquanty: null, discountapplyamount: 3000, maximumdicount: 100, percentagediscount: null },
    { productid: '2', name: 'sanitizer', price: 250, minquantity: 10, maximumquanty: null, discountapplyamount: 3000, maximumdicount: 100, percentagediscount: null },
    { productid: '2', name: 'sanitizer', price: 250, minquantity: 10, maximumquanty: null, discountapplyamount: 3000, maximumdicount: 100, percentagediscount: null },
    { productid: '2', name: 'sanitizer', price: 250, minquantity: 10, maximumquanty: null, discountapplyamount: 3000, maximumdicount: 100, percentagediscount: null },
    { productid: '2', name: 'sanitizer', price: 250, minquantity: 10, maximumquanty: null, discountapplyamount: 3000, maximumdicount: 100, percentagediscount: null },
    { productid: '2', name: 'sanitizer', price: 250, minquantity: 10, maximumquanty: null, discountapplyamount: 3000, maximumdicount: 100, percentagediscount: null },
    { productid: '2', name: 'sanitizer', price: 250, minquantity: 10, maximumquanty: null, discountapplyamount: 3000, maximumdicount: 100, percentagediscount: null },
];

//Routes
app.get('/', function (req, res) {
    res.send('Server is running..!');
});

app.get('/products', function (req, res) {
    res.jsonp(products)
});

app.get('/getcartitems', function (req, res) {
    res.json(cartitems.length == 0 ? 'No items found!' : cartitems);

    // if (cartitems.length == 0) {
    //     res.json('No items found!');
    // } else {
    //     res.json(cartitems);
    // }
});


app.get('/checkout', function (req, res) {
    let resss = [];
    let errors = [];

    if (cartitems === 0) {
        res.json('No items found!');
    } else {
        var groupedproducts = Object.values(groupBy(cartitems, 'productid'));

        for (let i = 0; i < groupedproducts.length; i++) {

            const productCatgory = groupedproducts[i];

            let productcat = {
                name: productCatgory[0].name,
                itemPrice: 0,
                numberofquaNTITY: 0,
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
                productcat.numberofquaNTITY = productCatgory.length;


                console.log("amount   " + amount)


                if (productCatgory[0].discountapplyamount != null && productCatgory[0].discountapplyamount <= amount) {
                    // dicount eligible 
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
                resss.push(productcat)
            }
        }

        var OBJ = {
            errors: errors,
            resss: errors.length === 0 ? resss : [],
            totalsum: errors.length === 0 ? resss.map(i => i.finalPriceafterdiscount).reduce((a, b) => a + b) : 0,
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

    res.json(cartitems.length == 0 ? 'No items found!': cartitems);
    
    // if (cartitems.length == 0) {
    //     res.json('No items found!');
    // } else {
    //     res.json(cartitems);
    // }
});

var server = app.listen(8000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('shopping cart app listening at http://%s:%s', host, port);
});  