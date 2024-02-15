import { useState } from "react";
import Form, { QuoteProps } from "./Form";
import Quote from "./Quote";

const Quotes = () => {
  const [open, setOpen] = useState(false);
  const [quotes, setQuotes] = useState<QuoteProps[]>([]);
  const handleAddQuote = (quote: QuoteProps) => {
    setQuotes([...quotes, quote]);
    setOpen(false);
  }

  const handleUpdateQuote = ({ quote, index }: { quote: QuoteProps; index: number }) => {
    const newQuotes = [...quotes];
    newQuotes[index] = quote;
    setQuotes(newQuotes);
  }

  const handleDeleteQuote = (index: number) => {
    const newQuotes = [...quotes];
    newQuotes.splice(index, 1);
    setQuotes(newQuotes);
  }

  return (
  <main className="container">
    <div className="header">
      <h1>Quotes</h1>
      <a href="#" className="btn btn--primary" onClick={() => setOpen(!open)}>New quote</a>
    </div>

    {
      open &&
        <Form
          toggleOpen={() => setOpen(!open)}
          handleAddQuote={handleAddQuote}
          quote={{ name: "" }}
          />
    }

    <div className="quotes">
      {quotes.map((quote, index) => (
        <Quote
          key={index}
          quote={quote}
          index={index}
          handleUpdateQuote={handleUpdateQuote}
          handleDeleteQuote={handleDeleteQuote}
        />
      ))}
    </div>
  </main>
  );
}

export default Quotes;
