## Api

This TypeScript and React Native code defines the ApiProvider component, which provides a context for managing API requests and loading states.

#### API Requests
The ApiProvider component provides functions to make API requests (makeApiRequest), local requests (makeLocalRequest), and requests to local storage (makeLocalStorageRequest). It handles loading states and status codes.

#### Language
It initializes the app's language.

#### Database
It initializes the local database using repositories.
```
await new TaskRepository().init();
```
