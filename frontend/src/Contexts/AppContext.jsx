import {createContext} from 'react';
import PropTypes from 'prop-types';

export const AppContext = createContext();
const AppContextProvider = ({children}) => {
  // const [activeWorkspace, setActiveWorkspace] = useState(undefined);
  // const [activeChannel, setActiveChannel] = useState(undefined);
  // const [activeMessage, setActiveMessage] = useState(undefined);
  return (
    <AppContext.Provider
      value={{}}>
      {children}
    </AppContext.Provider>
  );
};

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AppContextProvider;