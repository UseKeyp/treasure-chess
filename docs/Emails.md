# Emails

Emailing is faciliated by [`email-templates`](https://www.npmjs.com/package/email-templates#install), using its default - [Pug](https://pugjs.org/api/getting-started.html) - for templating.

## SMTP Configuration

An SMTP server should be configured using environment variables, designating a downstream location which the application will forward emails to for delivery.

> This configuration is _only_ required when running the application in a `NODE_ENV=production` environment.

```dotenv
SMTP_HOST=...
SMTP_PORT=...
SMTP_USER=...
SMTP_PASS=...
```

## Adding and Modifying Templates

Templates are stored in the `./api/templates/` directory. Each template should provide an `html.pug` and `subject.pug` file. These, respectively, denote the body and subject of the template's email. Once a template has been added, it can be sent using the `sendEmail` function, found in the `./api/src/lib/email.js` library - passing the template's directory's name as the email's `template`.

For example, to send an email added to the `MY_EMAIL` directory:

```JavaScript
import { sendEmail } from 'src/lib/email'

await sendEmail({
  member, // The Member the email will be sent to
  locals: { foo: 'bar' }, // Data passed to the template for interpolation
  template: 'MY_EMAIL',
})
```

## Previewing Templates

To preview a specific template, without needing to start the application, we can take advantage of [RedwoodJS' interactive shell](https://redwoodjs.com/docs/cli-commands#console-alias-c).

To begin, start a new instance of the shell:

```
yarn rw c
```

Then, `require(...)` the `email.js` library, invoking the `sendEmail` function - passing data to simulate a production-invocation. This will open the email which would have been sent using your operation system's configured browser.

```JavaScript
require('./api/src/lib/email.js').sendEmail({ locals: {}, member: { email:'foo' }, template: 'PLAID_CONNECT_SUCCESS' })
```

> In addition to whenever manually sent: if the application is ran in `NODE_ENV=development`, emails will **not** be sent to their destination.
