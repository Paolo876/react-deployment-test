// LAZY LOADING - make the initial loading much faster
// *optimization-Lazy loading - only load code when needed very useful for routing as it only loads data from the specific route. ONLY FOR PAGES NOT COMPONENTS
// since the code runs synchronously, we need to show a content while the component passed on React.lazy() is loading. Wrap the Routes element with <Suspense><Suspense/>
//    with a prop of fallback={*jsx*} with a value of the component that will render will the data is being downloaded
import { lazy, Suspense } from "react";
import { Route, Switch, Redirect} from "react-router-dom";
import Quotes from "./pages/Quotes";
// import QuoteInfo from "./pages/QuoteInfo";
// import NewQuote from "./pages/NewQuote";
// import NotFound from "./pages/NotFound";
import Layout from "./components/layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";

const NewQuote = lazy(() => import("./pages/NewQuote"));    //import pages as a function using React.lazy()
const QuoteInfo = lazy(() => import("./pages/QuoteInfo"));    
const NotFound = lazy(() => import("./pages/NotFound"));    
function App() {
  return (
    <Layout>
    <Suspense fallback={<div className="centered"><LoadingSpinner/></div>}> {/*Suspense runs while  */}
        <Switch>
          <Route path="/" exact>
            <Redirect to="/quotes"/>
          </Route>
          <Route path="/quotes" exact>
            {/* exact attribute makes sure that the whole path being fetched is exactly equal to the route's path  */}
            <Quotes/>
          </Route>
          <Route path="/quotes/:quoteID">
            <QuoteInfo/>
          </Route>
          <Route path="/new-quote">
            <NewQuote/>
          </Route>

          {/* url that doesn't match any of the provided routes will render this. path='*' .MAKE SURE THIS IS LAST ON THE LIST OF ROUTES
          */}
          <Route path='*'>  
            <NotFound/>
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
