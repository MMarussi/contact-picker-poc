import React, { Fragment, useEffect, useState } from 'react';

import CurrentPrice from './components/current';
import Header from './components/header';
import History from './components/history';
import Snackbar from './components/snackbar';

function App() {
  const [isOnLine, setOnline] = useState(navigator.onLine);
  const updateNetworkStatus = () => setOnline(navigator.onLine);

  useEffect(() => {
    window.addEventListener('offline', updateNetworkStatus);
    window.addEventListener('online', updateNetworkStatus);
    return () => {
      window.removeEventListener('offline', updateNetworkStatus);
      window.removeEventListener('online', updateNetworkStatus);
    };
  });

  const contactsSupported = ('contacts' in navigator && 'ContactsManager' in window);

  console.log(window.isSecureContext);
  console.log(navigator);

  const renderContacts = async () => {
    try {
      const contacts = await navigator.contacts.select(['name'], {});
      contacts.forEach(contact => console.log(contact));
    } catch (error) {
      console.log(error);
    }
  };

  renderContacts();

  return (
    <Fragment>
      <Header online={isOnLine} />
      <div>
        {!contactsSupported && (
          <p id="notSupported">
            <b>Sorry!</b> This browser doesn't support the Contact
              Picker API, which required for this demo. Try enabling the
            <code>#enable-experimental-web-platform-features</code> in
              chrome://flags and try again.
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
