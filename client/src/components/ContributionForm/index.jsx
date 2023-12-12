import { useState } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_CONTRIBUTION } from '../../utils/mutations';

const ContributionForm = ({ thoughtId }) => {
  const [contributionText, setContributionText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addContribution, { error }] = useMutation(ADD_CONTRIBUTION);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addContribution({
        variables: { thoughtId, contributionText },
      });

      setContributionText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'contributionText' && value.length <= 280) {
      setContributionText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h4>What is your contribution to this thought?</h4>
      <p
        className={`m-0 ${
          characterCount === 280 || error ? 'text-danger' : ''
        }`}
      >
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-center"
        onSubmit={handleFormSubmit}
      >
        <div className="col-12 col-lg-9">
          <textarea
            name="contributionText"
            placeholder="Add your contribution..."
            value={contributionText}
            className="form-input w-100"
            style={{ lineHeight: '1.5' }}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="col-12 col-lg-3">
          <button className="btn btn-primary btn-block py-3" type="submit">
            Add Contribution
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContributionForm;
