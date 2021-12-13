import { useEffect } from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQuotesFound from "../components/quotes/NoQuotesFound"
import QuoteList from "../components/quotes/QuoteList";
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";

// const DUMMY_QUOTES =[
//     {id: 'q1', author: 'Pao', text: 'this is a sample text for q1.'},
//     {id: 'q2', author: 'Paolo', text: 'this is a sample text for q2.'},
//     {id: 'q3', author: 'Ja', text: 'this is a sample text for q3.'},
// ]; 
const Quotes = () => {
    const {sendRequest, status, data: loadedQuotes, error } = useHttp(getAllQuotes, true); 

    useEffect(() => {
        sendRequest();
    }, [sendRequest]);

    if(status === 'pending') {
        return (
            <div className='centered'>
                <LoadingSpinner/>
            </div>
        )
    }

    if(error) {
        return (
            <p className='centered focused'>{error}</p>
        )
    }

    if(status === 'completed' && loadedQuotes.length === 0) {
        return <NoQuotesFound/>
    }
    return (  
        <QuoteList quotes={loadedQuotes}/>
    );
}
 
export default Quotes; 