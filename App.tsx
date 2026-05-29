import {NavigationContainer} from '@react-navigation/native';

import KinddSuspiccousIdeasstakk from './KinddSuspiccousIdeas/KinddSuspiccousIdeasrout/KinddSuspiccousIdeasstakk';
import {KinddSuspiccousIdeasCasesProvider} from './KinddSuspiccousIdeas/KinddSuspiccousIdeasdata/KinddSuspiccousIdeascasesStore';
import {KinddSuspiccousIdeasPartyProvider} from './KinddSuspiccousIdeas/KinddSuspiccousIdeasdata/KinddSuspiccousIdeaspartyStore';

const App = () => {
  return (
    <KinddSuspiccousIdeasCasesProvider>
      <KinddSuspiccousIdeasPartyProvider>
        <NavigationContainer>
          <KinddSuspiccousIdeasstakk />
        </NavigationContainer>
      </KinddSuspiccousIdeasPartyProvider>
    </KinddSuspiccousIdeasCasesProvider>
  );
};

export default App;
