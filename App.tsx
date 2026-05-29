import {NavigationContainer} from '@react-navigation/native';

import SuspiciouskinddaIdeasstakk from './SuspiciouskinddaIdeas/SuspiciouskinddaIdeasrout/SuspiciouskinddaIdeasstakk';
import {SuspiciouskinddaIdeasCasesProvider} from './SuspiciouskinddaIdeas/SuspiciouskinddaIdeasdata/SuspiciouskinddaIdeascasesStore';
import {SuspiciouskinddaIdeasPartyProvider} from './SuspiciouskinddaIdeas/SuspiciouskinddaIdeasdata/SuspiciouskinddaIdeaspartyStore';

const App = () => {
  return (
    <SuspiciouskinddaIdeasCasesProvider>
      <SuspiciouskinddaIdeasPartyProvider>
        <NavigationContainer>
          <SuspiciouskinddaIdeasstakk />
        </NavigationContainer>
      </SuspiciouskinddaIdeasPartyProvider>
    </SuspiciouskinddaIdeasCasesProvider>
  );
};

export default App;
