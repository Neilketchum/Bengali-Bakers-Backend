const Cart = require('../models/cart');

exports.addToCart = (req, res) => {

    Cart.findOne({ user: req.user._id })
    .exec((error, cart) => {
        if(error) return res.status(400).json({ error });
        if(cart){
            //if cart already exists then update cart by quantity
            const product = req.body.cartItems.product;
            const item = cart.cartItems.find(c => c.product == product);
            let condition, update;
            if(item){
                Cart.findOneAndUpdate({
                    "user":req.user._id,
                    "cartItems.product":product
                },{
                    "$set":{
                        "cartItems":{
                            ...req.body.cartItems,
                            quantity:item.quantity + req.body.cartItems.quantity
                        }
                    }
                }).exec((error,_cart)=>{
                    if(error){
                        return res.status(400).send(error)
                    }else{
                        return res.status(200).send({
                            cart:_cart
                        })
                    }
                })
            }         
        }else{
            //if cart not exist then create a new cart
            const cart = new Cart({
                user: req.user._id,
                cartItems: [req.body.cartItems]
            });
            cart.save((error, cart) => {
                if(error) return res.status(400).json({ error });
                if(cart){
                    return res.status(201).json({ cart });
                }
            });
        } 
    });

    

};