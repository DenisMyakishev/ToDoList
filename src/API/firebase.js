import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

export default class DataBase {
	static PRIVATE_FIREBASECONFIG = {
		//Put your firebase config here
	};

	static app = initializeApp(this.PRIVATE_FIREBASECONFIG);

	static auth = getAuth(this.app);
}
