import { Home } from 'screen/home'
import { SignIn, SignUp, Otp, ChangePass, ForgotPass } from 'screen/auth'
import { AboutUs, ContactUs, TermsPolicy, NotFoundPage } from 'screen/content'
import { StaticPage } from 'screen/store'
import { ProductDetial, ProductList, PromoList, SearchList } from 'screen/product'
import { Profile, ProfileEdit, Wishlist, OrderList, OrderDetail } from 'screen/account'
import { NewsActivity, NewsActivityDetail } from 'screen/newactivity'
import { GiftProduct, Checkout, ShoppingCart, PaymentResult } from 'screen/cart'
export const RouteConfig = [
  {
    path: '/',
    element: <Home />,
  },
  // {
  //   path: '/category',
  //   element: <Category.categorylist />
  // },
  {
    path: '/category/:catId',
    element: <ProductList />,
  },
  {
    path: '/promotion',
    element: <PromoList />,
  },
  {
    path: '/promotion/:promoId',
    element: <PromoList />,
  },
  {
    // /products?category=20,30&brand=2
    path: '/products',
    element: <ProductList />,
  },
  {
    path: '/product/:id',
    element: <ProductDetial />,
  },

  // {
  //   path: '/promotion/:promo-id',
  //   element: <Category.promotion />
  // },
  {
    path: '/order/cart',
    element: <ShoppingCart />,
  },
  {
    path: '/order/payment',
    element: <Checkout />,
  },
  {
    path: '/order/payment/success',
    element: <PaymentResult />,
  },
  {
    path: '/order/checkout',
    element: <Checkout />,
  },
  {
    path: '/order/gift',
    protect: true,
    element: <GiftProduct />,
  },
  // {
  //   path: '/order/:id/complete/:status',
  //   element: <Common.ordersuccess />
  // },
  {
    path: '/news_and_activity',
    element: <NewsActivity />,
  },
  {
    path: '/news_and_activity_detail/:id',
    element: <NewsActivityDetail />,
  },
  {
    path: '/our_store',
    element: <StaticPage />,
  },
  {
    path: '/our_store/:id',
    element: <StaticPage />,
  },
  {
    path: '/aboutus',
    element: <AboutUs />,
  },
  {
    path: '/contactus',
    element: <ContactUs />,
  },
  {
    path: '/page/:id', //for static screens
    element: <TermsPolicy />,
  },
  {
    path: '/user/signin',
    // guestonly: true,
    element: <SignIn />,
  },
  {
    path: '/user/signup',
    guestonly: true,
    element: <SignUp />,
  },
  {
    path: '/user/signup/success',
    guestonly: true,
    element: <Otp />,
  },
  {
    path: 'user/forgot_password',
    guestonly: true,
    element: <ForgotPass />,
  },
  {
    path: 'user/otp',
    guestonly: true,
    element: <Otp />,
  },
  {
    path: '/user/reset_password',
    guestonly: true,
    element: <ChangePass />,
  },
  {
    path: '/user/reset_password/success',
    guestonly: true,
    element: <Otp />,
  },
  {
    path: '/user/change_password',
    protect: true,
    element: <ChangePass />,
  },
  {
    path: '/user/profile',
    protect: true,
    element: <Profile />,
  },
  {
    path: '/user/profile_edit',
    protect: true,
    element: <ProfileEdit />,
  },
  {
    path: '/user/my_orders',
    protect: true,
    element: <OrderList />,
  },
  {
    path: '/user/my_orders/:orderId',
    protect: true,
    element: <OrderDetail />,
  },
  // {
  //   path: '/user/my_orders/:orderId/review/:productId',
  //   protect: true,
  //   element: <Account.review />
  // },
  {
    path: '/user/wishlist',
    protect: true,
    element: <Wishlist />,
  },
  {
    path: '/search/:keyword',
    element: <SearchList />,
  },
  // {
  //   path: '/common',
  //   element: <Common.common />
  // },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]
