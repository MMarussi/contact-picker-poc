import React, { Fragment, useEffect, useState } from 'react';

import CurrentPrice from './components/current';
import Header from './components/header';
import History from './components/history';
import Snackbar from './components/snackbar';

function App() {
  const [isOnLine, setOnline] = useState(navigator.onLine);
  const updateNetworkStatus = () => setOnline(navigator.onLine);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    window.addEventListener('offline', updateNetworkStatus);
    window.addEventListener('online', updateNetworkStatus);
    return () => {
      window.removeEventListener('offline', updateNetworkStatus);
      window.removeEventListener('online', updateNetworkStatus);
    };
  });

  const contactsSupported = 'contacts' in navigator && 'ContactsManager' in window;

  const gatherContacts = () => {
    navigator.contacts
      .select(['name'], {})
      .then((response) => {
        console.log('Contacts gathered');
        console.log(response);
        setContacts(response);
        console.log('set contacts');
        console.log(contacts);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(window.isSecureContext);
  console.log('Navigator');
  console.log(navigator);
  return (
    <Fragment>
      <Header online={isOnLine} />
      <div>
        {contactsSupported ? (
          <button type="button" onClick={gatherContacts}>
            Obtener contactos
          </button>
        ) : (
            <p id="notSupported">
              <b>Sorry!</b>This browser doesn't support the Contact Picker API, which required for this demo.
            Try enabling the <code>#enable-experimental-web-platform-features</code> in chrome://flags and try again.
            </p>
          )}
        <CurrentPrice />
        <History />
        <Snackbar online={isOnLine} />
      </div>
    </Fragment>
  );
}
export default App;
