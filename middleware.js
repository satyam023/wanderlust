const Listing = require("./models/listing.js");
const ExpressError = require("./public/utils/ExpressError.js");
const { listingSchema ,reviewSchema} = require("./schema.js");
const Review = require("./models/review.js");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl; // Fixed typo
    req.flash("error", "You must be logged in to create a listing!");
    return res.redirect("/login"); 
  }
  next(); 
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
      res.locals.redirectUrl = req.session.redirectUrl;
  }   next();
};

module.exports.isOwner = async (req , res , next ) =>{
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if ( !listing.owner.equals(req.user._id)){
  req.flash("error" , "You don't have permission")
  return res.redirect(`/listings/${id}`);
 }
 next();
}  

module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
      let errMsg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(400, errMsg);
  } else {
      next();
  }
}

module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
}

module.exports.isReviewAuthor = async (req , res , next ) =>{
  let { reviewId , id} = req.params;
  let review = await Review.findById(reviewId);
  if ( !review.author.equals(res.locals.currUser._id)){
  req.flash("error" , "You don't have permission to delete this review")
  return res.redirect(`/listings/${id}`);
 }
 next();
}