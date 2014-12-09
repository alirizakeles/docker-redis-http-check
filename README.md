# redis-http-check

Checks linked `redis` instance health upon http requests to exposed port `80`.

  - returns http 200 with string `PONG` if health check succeeds.
  - returns http 500 with string `FAIL` otherwise.
