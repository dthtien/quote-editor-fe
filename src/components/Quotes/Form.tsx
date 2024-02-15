import { useState } from "react";

export type QuoteProps = {
  name: string;
};

type FormProps = {
  toggleOpen: () => void;
  handleAddQuote: (quote: QuoteProps) => void;
  quote: QuoteProps;
};

const Form = ({ toggleOpen, handleAddQuote, quote }: FormProps) => {
  const [name, setName] = useState(quote.name);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleAddQuote({ name });
  }

  return (
    <form className="quote form form__inline" onSubmit={handleSubmit}>
      <div className="form__group">
        <input type="text" className="form__input" placeholder="Name of your quote" autoFocus={true} name="name" value={name} onChange={handleNameChange} />
      </div>

      <a href="#" className="btn btn--light" onClick={toggleOpen}>Cancel</a>
      <button type="submit" className="btn btn--secondary">Add</button>
    </form>
  )
}

export default Form;
