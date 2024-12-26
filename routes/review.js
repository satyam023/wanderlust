const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../public/utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview , isLoggedIn, isReviewAuthor} = require("../middleware.js")
const reviewController = require("../controller/reviews.js");

//create Review
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));
 
// Delete Review 
router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(reviewController.destroyReview))


module.exports = router;