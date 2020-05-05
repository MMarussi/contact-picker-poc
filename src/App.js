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
  const contactProperties = ['name', 'tel', 'email'];

  const gatherContacts = () => {
    navigator.contacts
      .select(contactProperties, { multiple: false })
      .then((response) => {
        console.log('Contacts gathered');
        console.log(response);
        setContacts(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderContacts = () =>
    contacts.length > 0 &&
    contacts.map((contact) => <div key={contact.name[0]}>{renderContactInfo(contact)}</div>);

  const renderContactInfo = (contact) =>
    contactProperties.map(
      (property) =>
        contact[property] && (
          <span className="m-bottom-5" id="notSupported">
            {contact[property][0]}
          </span>
        )
    );

  console.log(window.isSecureContext);
  return (
    <Fragment>
      <Header online={isOnLine} />
      <div>
        {contactsSupported ? (
          <button type="button" onClick={gatherContacts}>
            Obtener contactos
          </button>
        ) : (
          <p className="p-horizontal-10" id="notSupported">
            Debido a cuestiones de seguridad o que el navegador es incompatible con contactPicker API, se inhabilitó el uso de la misma
          </p>
        )}
        <div className="column center middle p-horizontal-5">{renderContacts()}</div>
        <CurrentPrice />
        <History />
        <Snackbar online={isOnLine} />
      </div>
    </Fragment>
  );
}
export default App;
