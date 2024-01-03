import React, { useState, useRef } from 'react';
import './App.css';
//import HowToUse from './HowToUse.jsx';
import Html5QrcodePlugin from './Html5QrcodePlugin.jsx';
import ResultContainerPlugin from './ResultContainerPlugin.jsx';

const App = (props) => {
  const [decodedResults, setDecodedResults] = useState([]);
  
  // Use state hooks to store the input values
  const [loc, setLoc] = useState('');
  const [inv, setInv] = useState('');

  // Create refs for the input elements
  const locRef = useRef();
  const invRef = useRef();

  const onNewScanResult = (decodedText, decodedResult) => {
      // handle decoded results here
      setDecodedResults(prev => [...prev, decodedResult]);

      if (document.activeElement === locRef.current) {
        console.log('loc is focused');
        // Set the focus and the value of the inv input
        setLoc(decodedText); // Set the state value
      } else if (document.activeElement === invRef.current) {
        console.log('inv is focused');
        // Set the focus and the value of the inv input
        setInv(decodedText); // Set the state value
        // invRef.current.focus(); // Set the focus using the ref
      } else {
        console.log('neither loc nor inv is focused');
      }

  };

  // Handle the form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default browser behavior
    alert(`You entered: loc = ${loc}, inv = ${inv}`); // Display the input values
  };

  return (
      <div className="App">
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Location:&nbsp;
              <input
                type="text"
                name="loc"
                value={loc}
                onChange={(e) => setLoc(e.target.value)}
                ref={locRef} // Assign the ref to the loc input
              />
            </label>
          </div>
          <div>
            <label>
              Item:&nbsp;
              <input
                type="text"
                name="inv"
                value={inv}
                onChange={(e) => setInv(e.target.value)}
                ref={invRef} // Assign the ref to the inv input
              />
            </label>
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>

        <Html5QrcodePlugin
            fps={10}
            qrbox={300}
            disableFlip={false}
            rememberLastUsedCamera={false}
            qrCodeSuccessCallback={onNewScanResult}
        />

        <ResultContainerPlugin results={decodedResults} />
      </div>
  );
};

/*
  return (
      <div className="App">
          <section className="App-section">
              <div className="App-section-title"> Html5-qrcode React demo</div>
              <br />
              <br />
              <br />
              <Html5QrcodePlugin
                  fps={10}
                  qrbox={250}
                  disableFlip={false}
                  qrCodeSuccessCallback={onNewScanResult}
              />
              <ResultContainerPlugin results={decodedResults} />
              <HowToUse />
          </section>
      </div>
  );
};
*/

export default App;

/*
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="Octocat.png" className="App-logo" alt="logo" />
        <p>
          GitHub Codespaces <span className="heart">♥️</span> React
        </p>
        <p className="small">
          Edit <code>src/App.jsx</code> and save to reload.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </p>
      </header>
    </div>
  );
}

*/