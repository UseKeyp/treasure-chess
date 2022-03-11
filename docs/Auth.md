# Auth

Currently we are using our own _custom extension_ of RedwoodJS dbAuth.

1. When the user calls `login`, a graphql function `chessLoginUrl` is executed and opens a window with the URL.
2. Upon returning to `RedirectPage`, the function `submitLoginCodeGrant` is executed, which calls `login` on dbAuth `/auth`.
3. The response from dbAuth sets a session cookie in the browser, and login is complete.
