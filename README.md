# Localizer

A super simple express middleware for localization. To use it, you need to have locale installed.

## How does it work?
Localizer reads all the files in a folder called languages in your current directory and parses them, by key-value principle.

It exports two methods:

### `initialize(options)`
This method reads all the files in `options.path` and parses them all.

### `localize`
This method is the middleware, which adds the next method `req.localize` to the request object.

### `req.localize`
This method tries to find a key in the languages dictionar which matches. If it cannot find it, it just returns the key.

The way how it tries to find the value is by the following order,

1. `req.locale` value if this doesn't exist
2. it just gets the `default` value from the `default.json` file if this isn't present
3. it just returns the key

## TODO
- [ ] Tests
- [x] Configuration of languages path