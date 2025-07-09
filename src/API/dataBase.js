import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

export default class DataBase {
	static PRIVATE_FIREBASECONFIG = {
		apiKey: 'AIzaSyAYzLKkRrNfhQY_jyuIjAPJU7jNKosL8xE',
		authDomain: 'react-organizer-portfolio.firebaseapp.com',
		projectId: 'react-organizer-portfolio',
		storageBucket: 'react-organizer-portfolio.firebasestorage.app',
		messagingSenderId: '988067963902',
		appId: '1:988067963902:web:12c0e06d1566442ac756af',
		measurementId: 'G-GXRC77H9SG',
	};

	static app = initializeApp(this.PRIVATE_FIREBASECONFIG);

	static auth = getAuth(this.app);
}
