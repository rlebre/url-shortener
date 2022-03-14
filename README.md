# Summit Racing VA

URL Shortener is a small project that allows authorized users to shorten their long URls. Users may get a random 4 alphanumeric identifier of their links or, alternatively, provide a custom slug. The effectiveness of the short URL goes live after the e-mail confirmation.

The project is built using [Next.js](https://nextjs.org/) framework.

## Table of Contents

- [Requirements](#requirements)
- [Setup](#setup)
- [Running](#running)
- [Deploying](#deploying)
- [Contributing](#contributing)
- [License](#license)

## Requirements

- Node.JS - v14 at least

## Setup

1. Clone this repository

   ```bash
   git clone git@github.com:rlebre/url-shortener.git
   ```

2. Install the dependencies

   ```bash
   yarn # or npm install
   ```

3. Create a `.env` file and fill the following environment variables

   ```bash
   MAIL_HOST="smtp_server"
   MAIL_PORT="smtp_port"
   MAIL_EMAIL="email"
   MAIL_PASSWORD="email_password"
   NEXT_PUBLIC="public_url"
   ```

4. Setup the authorized users. Create a `db.json` file under the project root

```json
{
  "users": [
    {
      "email": "authorized list"
    },
    {
      "email": "of emails"
    }
  ],

  "links": []
}
```

## Running

1. Development mode

   ```bash
   yarn dev
   ```

## Deploying

This project is built with [Next.js](https://nextjs.org/). You may deploy this project under custom solutions or follow the [official instructions](https://nextjs.org/docs/deployment).

1. Build the application

   ```bash
   yarn build
   ```

1. Start the application

   ```bash
   yarn start
   ```

## Contributing

This project is open to new contributors who may find their ideas usefull to be implemented.

### Found a bug or have a suggestion?

Use the [Issues](https://github.com/rlebre/url-shortener/issues) tab and place your question or suggestion.

### Want to include your code in this project?

Fork this repository, create your branch and suggest your [Pull Request](https://github.com/rlebre/url-shortener/pulls).

### Contributors

- [@rlebre](https://github.com/rlebre/url-shortener) - maintainer

## License

This project is under MIT license.
