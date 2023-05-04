import { initializeApp} from '../node_modules/firebase/app';
import { getDatabase } from '../node_modules/firebase/database';

// authentication of my firebase instance.
const firebaseConfig = {
    databaseURL: ""
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

