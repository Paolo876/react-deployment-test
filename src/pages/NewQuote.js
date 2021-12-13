import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import QuoteForm from "../components/quotes/QuoteForm";
import useHttp from "../hooks/use-http";
import { addQuote } from "../lib/api"
const NewQuote = () => {
    const { sendRequest, status} = useHttp(addQuote);
    const history = useHistory();

    useEffect(() => {
      if (status === 'completed') {
        history.push('/quotes');  //redirect to /quotes 
      }
    },[status, history]);

    const addQuoteHandler = (quoteData) => {
      sendRequest(quoteData)  
      /*PROGRAMMATIC NAVIGATION */
      // .push    -> redirects the page to a certain path provided
      // .replace -> redirects the page to a certain path but does not get saved from history.(the back button from browser will not work)
      // history.push('/quotes');
    }
    return (  
        <QuoteForm onAddQuote={addQuoteHandler} isLoading={status === 'pending'}/>
    );
}
 
export default NewQuote;