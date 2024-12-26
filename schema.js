const joi = require("joi");

 module.exports.listingSchema  = joi.object({
    listing : joi.object({
        title: joi.string().required(),
        description: joi.string().required(),
        image: joi.string().allow("",null).default("https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
        price: joi.number().required(),
        location: joi.string().required().min(0),
        country: joi.string().required(),
    }).required()
});


module.exports.reviewSchema = joi.object({
    review: joi.object({
        rating:joi.number().required().min(1).max(5),
        comment:joi.string().required(),
    }).required()
})