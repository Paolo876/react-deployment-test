import { Fragment } from 'react';
import { useHistory, useLocation } from 'react-router';
import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';

const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {
  const history = useHistory();   //gives access to history object - changes and manages url    **causes component re-render
  const location = useLocation();   //gives access to location object - holds information on the current page
  const queryParams = new URLSearchParams(location.search);   //this is a js feature used to work with the query string of URL. turns the url string to an object instance

  const isSortAscending = queryParams.get('sort') === 'asc';

  sortQuotes(props.quotes, isSortAscending);
  const changeSortHandler = () => {
    // history.push({pathname: location.pathname, search: `?sort=${(isSortAscending ? 'desc' : 'asc')}` });           //alternative way, for complex projs
    history.push(`${location.pathname}?sort=${(isSortAscending ? 'desc' : 'asc')}`);
  }
  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortHandler}>Sort {isSortAscending ? 'Descending' : 'Ascending'}</button>
      </div>
      <ul className={classes.list}>
        {props.quotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;