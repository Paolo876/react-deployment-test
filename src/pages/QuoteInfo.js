import { useEffect } from "react";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote"
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";

// const DUMMY_QUOTES =[
//     {id: 'q1', author: 'Pao', text: 'this is a sample text for q1.'},
//     {id: 'q2', author: 'Paolo', text: 'this is a sample text for q2.'},
//     {id: 'q3', author: 'Ja', text: 'this is a sample text for q3.'},
// ]; 

const QuoteInfo = () => {
    const match = useRouteMatch();      //functions the same as useLocation but with more functionality
    const params = useParams();
    // const quote = DUMMY_QUOTES.find((item) => item.id === params.quoteID);
    const { sendRequest, status, data: quote, error } = useHttp(getSingleQuote, true);

    useEffect(() => {
      sendRequest(params.quoteID);
    }, [sendRequest, params.quoteID]);
    if( status === 'pending') {
        return <LoadingSpinner/>
    }
    if(error){
        return <p className='centered'>{error}</p>
    }
    if(!quote.text){
        return <p>Nothing found.</p>
    }
    return (  
        <>
            <h1>Quote Information Page</h1>
            <HighlightedQuote text={quote.text} author={quote.author}/>
            
            <Route path={`${match.path}`} exact>
                <div className="centered">
                    <Link to={`${match.url}/comments`} className='btn--flat'>Add A Comment</Link>
                </div>
            </Route>

            <Route path={`${match.path}/comments`}>
                <Comments/>
            </Route>
        </>
    );
}
 
export default QuoteInfo;