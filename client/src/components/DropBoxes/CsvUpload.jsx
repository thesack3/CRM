import React, { useState } from 'react';
import Papa from 'papaparse';


const CsvUpload = () => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleFileUpload = (event) => {
   //  alert('File uploaded!');
    const file = event.target.files[0];
    setLoading(true);
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setData(results.data);
        setLoading(false);
        console.log(results.data);
    
      },
    });
  };

  const handleUpload = () => {
    setLoading(true);

    // GraphQL mutation to upload the data
    // using the Apollo Client

    setLoading(false);
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      {loading && <p>Loading...</p>}
      {data && (
        <button onClick={handleUpload}>
          Upload
        </button>
      )}
    </div>
  );
};

export default CsvUpload;
