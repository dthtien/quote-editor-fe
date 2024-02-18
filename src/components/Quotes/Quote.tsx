import { useEffect, useState } from "react";
import Form, { QuoteProps } from "./Form";
import httpClient from "../../utils/httpClient";

type QuoteDetailsProps = {
  quote: QuoteProps;
  handleEdit: () => void;
  handleDelete: () => void;
}
const QuoteDetails = ({ quote, handleEdit, handleDelete }: QuoteDetailsProps ) => {
  return (
    <div className="quote">
      <a>{quote.name}</a>
      <div className="quote__actions">
        <button className="btn btn--light" onClick={handleDelete}>Delete</button>
        <a href="#" className="btn btn--light" onClick={handleEdit}>Edit</a>
      </div>
    </div>
  );
}

type QuoteType = {
  quote: QuoteProps;
  index: number;
  handleUpdateQuote: ({ quote, index }: { quote: QuoteProps; index: number }) => void;
  handleDeleteQuote: (index: number) => void;
}
const Quote = ({ quote, index, handleUpdateQuote, handleDeleteQuote }: QuoteType) => {
  const [open, setOpen] = useState(false);
  const handleAddQuote = (quote: QuoteProps) => {
    setOpen(false);
    handleUpdateQuote({ quote, index });
  }

  const handleClickDelete = () => {
    setOpen(false);
    handleDeleteQuote(index);
  }

  useEffect(() => {
    httpClient.get('/api/users/detail', { withCredentials: true })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  if (open) {
    return (
      <Form
        toggleOpen={() => setOpen(!open)}
        handleAddQuote={handleAddQuote}
        quote={quote}
      />
    );
  }

  return (
    <QuoteDetails
      quote={quote}
      handleEdit={() => setOpen(true)}
      handleDelete={handleClickDelete}
    />
  );
}

export default Quote;
