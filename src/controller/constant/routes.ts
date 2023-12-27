export const routes = {
  // auth
  signIn: `get:api/auth/token`,
  faceBookSignIn: `post:api/auth/facebook`,
  googleSignIn: `post:user/login_with_social_media`,
  signOut: `delete:api/auth/token`,
  signUp: `post:api/user/signup`,
  changePassword: `post:api/password/change`,
  resetPassword: `post:api/user/reset/password`,
  otpVerify: `post:api/user/verify`,
  existUser: `post:api/exist/user`,
  getProfile: `get:api/user`,
  updateProfile: `put:api/user`,

  // cart
  getCart: `get:api/cart/`,
  createCart: `post:api/cart/add`,
  createCartPackage: `post:api/cart/add/package`,
  updateQtyInCart: `post:/api/cart/quantity/update`,
  updateCustomer: `post:/api/cart/login_user`,
  deleteCart: `delete:api/cart/remove`,
  deleteAllInCart: `delete:api/clear/cart`,
  getShippingAddress: `get:/api/user/address`,
  getShippingAddressById: `get:/api/user/address/`,
  createShippingAddress: `post:api/user/address/add`,
  editShippingAddress: `put:/api/user/address/`,
  removeShippingAddress: `delete:/api/user/address/`,
  getDeliveryFee: `get:/api/delivery/charge`,
  getShippingLocations: `get:/api/delivery/locations/`,
  getAllLocation: `get:/api/locations/`,
  joinShippingAndOrder: `post:/api/order/shippingaddress`,
  getPaymentList: `get:api/payments`,
  payNow: `post:api/paynow`,
  PayNow_2c2p: `post:api/send/payload/data/2c2p/v4`,
  PayNow_BPpay: `get:api/get/payload/bppay/v3`,
  // order
  getOrder: `get:/api/orders/`,
  getOrderById: `get:/api/orders/`,
  getOrderByPDF: `get:api/download/order_detail`,

  //Point System
  updateGift: `post:api/cart`,
  getPointRate: `get:api/point/rate/setting`,
  postRedeemPointToOrder: `put:api/cart/`,

  // product
  getProduct: `get:api/product`,
  getPackageProduct: `get:api/product/package`,
  getProductById: `get:api/product/`,
  getProductCategory: `get:api/product/categories`,
  checkStock: `post:api/product/check/quantity`,
  getRelatedProduct: `get:api/product/`,
  getProductGroup: `get:api/group`,
  getFlashSaleList: `get:api/list/flashsales`,
  getFlashSaleDetail: `get:api/flashsale/`,
  getBrandList: `get:api/product/brands`,
  getHighLightBrandList: `get:api/highlight/brands`,
  getCountryOrigin: `get:api/product/countries`,
  sentProductRating: `post:/api/product/`,
  getGiftProduct: `get:api/reward/gifts`,
  // wishlist
  createWishlist: `post:api/wishlist/add`,
  getWishlist: `get:api/wishlist`,
  getExistsWishlist: `get:api/exist/wishlist`,
  removeWishlist: `delete:api/wishlist/remove`,
  // promotion
  getPromotion: `get:api/list/promotion`,
  getPromotionById: `get:api/promotion/`,

  // other
  getTranslation: `get:api/dictionary`,
  getMetaData: `get:api/application/meta`,
  getLocation: `get:api/list/city`,
  getCustomerLocation: `get:api/customer/city`,
  getLocationList: `get:api/get/locationlist`,
  getWebsiteSlider: `get:api/image/slider/`,
  getWebsiteBanner: `get:api/image/banner`,
  getPageCode: `get:api/page`,

  // contactUs
  getContactUsPage: `get:api/contact_info`,
  sentContactUs: `post:api/save/contactinformation`,

  //store 
  getAllCityListForStore: `get:api/store/city`,
  getStoreByCityId: `get:api/store`,

  //news And activity
  getNewsActivityList: `get:api/news_activity`,
  getNewsActivityDetail: `get:api/news_activity`,
}

