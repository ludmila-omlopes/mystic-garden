import React from 'react';

const OwnedHandlesList = ({ ownedHandles }) => {
  if (ownedHandles.length === 0) {
    return <div>No owned handles found.</div>;
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Owned Handles</h2>
      <ul>
        {ownedHandles.map((handle) => (
          <li key={handle.id} className="mb-1">
            <a 
              href={`https://opensea.io/assets/matic/0xe7e7ead361f3aacd73a61a9bd6c10ca17f38e945/${BigInt(handle?.id).toString()}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {handle.fullHandle}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OwnedHandlesList;
