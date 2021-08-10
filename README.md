# SaaS Starter with MERN Stack

Because developers are stuck to their stack, like me sometimes, I have built a SaaS Boilerplate with MERN. This repo is for all solopreneurs, bootstrappers, and entrepreneurs to start (fast) a SaaS Business. The goal is always to find a product-market-fit fast, so that's why we shouldn't build SaaS main functionalities from scratch.

---

# Stack

This boilerplate is built with:

- Reactjs
- Nodejs & Express
- MongoDB
- Firebase (only for auth)
- AWS S3

---

# Environment Variables

Before you run it, add .env file into your root directory:

```
MONGO_URI = mongodb+srv://<"user">:<"password">@cluster01.j1enx.mongodb.net/<"dbname">?retryWrites=true&w=majority
MONGO_DB_NAME = <"dbname">
BUCKET_AWS=<"your aws bucket">
BUCKET_AWS_REGION=<"region for example eu-central-1">
AWS_ACCESS_KEY_ID=<"key">
AWS_SECRET_ACCESS_KEY=<"secret key">
FIREBASE_TYPE=service_account
FIREBASE_PROJECT_ID=<"project name">
FIREBASE_PRIVATE_KEY_ID=<"private key id">
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n<"key">\n-----END PRIVATE KEY-----\n
FIREBASE_CLIENT_EMAIL=<"admin...iam.gserviceaccount.com">
FIREBASE_CLIENT_ID=<"clientid">
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_PROVIDER_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/<"admin...iam.gserviceaccount.com">
```

You can find the firebase credentials in your config file you get from firebase.

Also you need to include a .env.local file into client (./client/.env.local):

```
REACT_APP_FIREBASE_API_KEY=<"api key">
REACT_APP_FIREBASE_AUTH_DOMAIN=<"app name">.firebaseapp.com
```

---

# Run project

For now clone it, setup AWS S3 and firebase, add your env files and don't forget to run mongo.
If you run `npm run dev` in the root directory the client and server should run simultaneously.

---

# Open Source / Contributing

This project will be open source forever. So pull requests are always welcome! Feel free to open a new GitHub issue for any changes that can be made.

---

# Author

Tunç Polat

[<img align="left" alt="www.simplweb.ch" width="22px" src="https://raw.githubusercontent.com/iconic/open-iconic/master/svg/globe.svg" />][website]
[<img align="left" alt="Tunç Polat | Twitter" width="22px" src="https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/twitter.svg" />][twitter]
[<img align="left" alt="Tunç Polat | LinkedIn" width="22px" src="https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/linkedin.svg" />][linkedin]
[<img align="left" alt="Simplweb | Instagram" width="22px" src="https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/instagram.svg" />][instagram]

---

# Roadmap

- Stipe Freemium Model (for example like Clockify)
- Npx create-saas-boilerplate-mern app-name

[website]: https://www.simplweb.ch
[twitter]: https://twitter.com/TunPolat9
[instagram]: https://www.instagram.com/simplwebbasel/
[linkedin]: https://www.linkedin.com/in/tun%C3%A7-polat-b8203a116/
