import {createContext} from 'react';
import PropTypes from 'prop-types';
import {useState} from 'react';
export const AppContext = createContext();
const AppContextProvider = ({children}) => {
  const [messages, setMessages] = useState([])
  const [session_ID, setSession_ID] = useState(undefined)
  const [name, setName] = useState('')
  // const [activeWorkspace, setActiveWorkspace] = useState(undefined);
  // const [activeChannel, setActiveChannel] = useState(undefined);
  // const [activeMessage, setActiveMessage] = useState(undefined);
  return (
    <AppContext.Provider
      value={{messages, setMessages,
        session_ID, setSession_ID,
        name, setName
      }}>
      {children}
    </AppContext.Provider>
  );
};

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AppContextProvider;