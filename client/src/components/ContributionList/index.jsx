const ContributionList = ({ contributions = [] }) => {
    console.log(contributions);
    if (!contributions.length) {
      return <h3>No Contributions Yet</h3>;
    }
  
    return (
      <>
        <h3
          className="p-5 display-inline-block"
          style={{ borderBottom: '1px dotted #1a1a1a' }}
        >
          Contributions
        </h3>
        <div className="flex-row my-4">
          {contributions &&
            contributions.map((contribution) => (
              <div key={contribution._id} className="col-12 mb-3 pb-3">
                <div className="p-3 bg-dark text-light">
                  <h5 className="card-header">
                    An anonymous user contributed{' '}
                    <span style={{ fontSize: '0.825rem' }}>
                      on {contribution.createdAt}
                    </span>
                  </h5>
                  <p className="card-body">{contribution.contributionText}</p>
                </div>
              </div>
            ))}
        </div>
      </>
    );
  };
  
  export default ContributionList;
  