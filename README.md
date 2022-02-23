# Install dependencies
``` bash
$ pnpx install
```

# Run unbundled
``` bash
$ pnpm run:unbundled

> main@0.1.0 run:unbundled .../repro
> ts-node lib/cc.ts

In @Type
In parseOptionalBoolean: parsing 0 (string)
In parseOptionalBoolean: parsed false (boolean)
Frankenstein { count: 10, category: 'foo', flag: false }
```

Success!

# Run bundled
## Bundle first
``` ts
$ pnpm bundle

> main@0.1.0 bundle .../repro
> ts-node bundle.ts

```

## And run it
``` ts
pnpm run:bundled

> main@0.1.0 run:bundled .../repro
> ts-node dist/c.js

sA: Validation failed
    at l2.exceptionFactory (.../repro/dist/c.js:17:199596)
    at l2.transform (.../repro/dist/c.js:17:177742)
    at T1e (.../repro/dist/c.js:17:199769) {
  response: {
    message: 'Validation failed',
    payload: [
      'count must not be greater than 1024',
      'count must not be less than 1',
      'count must be an integer number',
      'flag must be a boolean value'
    ]
  },
  status: 400
}
```

Failure!
