export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:3000/',
  useEmulators: true,
  emulators: {
    baseUrl: 'localhost',
    firestorePort: 8080,
    authPort: 9099,
  },
  firebase: {
    apiKey: 'apiKey',
    authDomain: 'task-management-tc.firebaseapp.com',
    projectId: 'task-management-tc',
    storageBucket: 'task-management-tc.appspot.com',
    messagingSenderId: '1096952800242',
    appId: 'appId',
  },
};
