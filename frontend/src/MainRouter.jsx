import React, { lazy, Suspense } from "react"
import { connect } from "react-redux"
import { BrowserRouter, Route, Switch } from "react-router-dom"

import ProtectedRoutes from "./utils/protectedRoutes"
import Loader from "./utils/Loader"
import Loading from "./assets/Loading.svg"

const HomePage = lazy(() => import("./components/pages/HomePage"))
const Introduction = lazy(() => import("./components/functional/Introduction"))
const LoginPage = lazy(() => import("./components/pages/LoginPage"))
const Register = lazy(() => import("./components/pages/Register"))
const AddMoney = lazy(() => import("./components/pages/AddMoney"))
const CreditCard = lazy(() => import("./components/pages/CreditCard"))
const SendMoney = lazy(() => import("./components/pages/SendMoney"))
const EnterNumber = lazy(() => import("./components/pages/EnterNumber"))
const ViewReceipts = lazy(() => import("./components/pages/ViewReceipts"))
const CardInfo = lazy(() => import("./components/pages/CardInfo"))
const PersonalInfo = lazy(() => import("./components/pages/PersonalInfo"))
const Error404 = lazy(() => import("./components/pages/Error404"))

const MainRouter = ({ userInfo }) => {
	return (
		<BrowserRouter>
			<Switch>
				<Suspense
					fallback={
						<div className="loader">
							<img src={Loading} alt="loading" />
						</div>
					}
				>
					<Route
						exact
						path="/"
						component={userInfo.loggedIn ? HomePage : Introduction}
					/>
					<Route exact path="/loader" component={Loader} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/login" component={LoginPage} />
					<ProtectedRoutes
						exact
						path="/add-money/credit-card"
						component={CreditCard}
					/>
					<ProtectedRoutes exact path="/add-money" component={AddMoney} />
					<ProtectedRoutes
						exact
						path="/send-money/enter-number"
						component={EnterNumber}
					/>
					<ProtectedRoutes exact path="/send-money" component={SendMoney} />
					<ProtectedRoutes
						exact
						path="/view-receipts"
						component={ViewReceipts}
					/>
					<ProtectedRoutes exact path="/card" component={CardInfo} />
					<ProtectedRoutes exact path="/personal" component={PersonalInfo} />
					<Route component={Error404} />
				</Suspense>
			</Switch>
		</BrowserRouter>
	)
}

const mapStateToProps = ({ userInfo }) => ({
	userInfo,
})

export default connect(mapStateToProps)(MainRouter)
