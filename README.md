# Validator 

Gets the maker CID, the node operator(taker) peerID and verified they keep online and sharing the CID of the maker,
being optimistic, if not, publish the failure into the blockchain (either event or blob for lower fees possible)

if multiple validators push failure proofs then the node operator might get slashed.
and the validators rewarded.

if the Validator is a bad actor, he will be also slashed.



## Getting Started

### Prerequisites

Make sure you have installed all of the following prerequisites on your development machine:

- Git - [Download & Install Git](https://git-scm.com/downloads). OSX and Linux machines typically have this already installed.
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

### Installation and Running example

```console
> npm install
> npm start
```

## Usage

[ts-node](https://typestrong.org/ts-node/) is a [TypeScript](https://www.typescriptlang.org/) execution and [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) tool for running TypeScript files from the command line, similar to how you would run JavaScript files with node.js.

It gives the illusion of compilation-free code execution by using [JIT compilation](https://en.wikipedia.org/wiki/Just-in-time_compilation) to turn your TypeScript code into JavaScript at runtime and is a useful development tool.

Because TypeScript outputs [CommonJS](https://en.wikipedia.org/wiki/CommonJS) by default, and Helia is written using more modern [ECMAScript Modules](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/) it's necessary to override the default configuration `ts-node` uses.

### tsconfig.json

This is the minimum config that is required.

#### target

The [target](https://www.typescriptlang.org/tsconfig#target) to `ES2021` - this will ensure ESM is output and not CJS.

#### module

[module](https://www.typescriptlang.org/tsconfig#module) should be set to at least `ES2022` - this is necessary to support things like [private class fields](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields).

#### moduleResolution

[moduleResolution](https://www.typescriptlang.org/tsconfig#moduleResolution) should be set to `node` or `node16` to enable use of `import` as well as `require`.

### package.json

We have to tell node that this is an ESM project.

#### type

The `type` field in your `package.json` should be set to `module`.  This means the `.js` extension is interpreted as ESM by default.

It also means that import paths within your own project need file extensions, so any `import foo from './bar/baz'` will need to be changed to `import foo from './bar/baz.js'`.

TypeScript [will not add this for you](https://github.com/microsoft/TypeScript/issues/16577).

### ts-node

> :warning: Currently ts-node is [broken on Node.js v20](https://github.com/TypeStrong/ts-node/issues/1997) so the instructions below will not work until the issue is fixed.
>
> The workaround is to pass `ts-node/esm` as a loader:
>
> ```console
> $ node --loader ts-node/esm ./src/index.ts
> ```
>
> Alternatively consider using [TypeScript Execute](https://www.npmjs.com/package/tsx) which works in a similar way but does not have the same problem.

#### esm flag

`ts-node` has an `--esm` flag that is slightly counter-intuitively necessary to enable loading `.ts` files for JIT compilation via `import`:

```console
% npx ts-node --help | grep esm
  --esm   Bootstrap with the ESM loader, enabling full ESM support
```

It is necessary to pass this flag when running `ts-node`

### Putting it all together

`tsconfig.json`

```js
{
  "compilerOptions": {
    "module": "ES2022",
    "target": "ES2021",
    "moduleResolution": "node"
  },
  // other settings here
}
```

`package.json`

```js
{
  "type": "module",
  // other settings here
}
```

You can now run ts code using ts-node:

> :warning: As of Node.js v20 the following command will not work, please see the [note above](#ts-node).

```bash
> npx ts-node --esm ./src/index.ts

Helia is running
PeerId: 12D3KooWMUv1MYSYrgsEg3ykfZ6nDZwaT72LtVCheRNhH15kzroz
```

That's it! You just ran an ESM-only module using ts-node with JIT compilation!

_For more examples, please refer to the [Documentation](#documentation)_

## Documentation

- [IPFS Primer](https://dweb-primer.ipfs.io/)
- [IPFS Docs](https://docs.ipfs.io/)
- [Tutorials](https://proto.school)
- [More examples](https://github.com/ipfs-examples/helia-examples)
- [API - Helia](https://ipfs.github.io/helia/modules/helia.html)
- [API - @helia/unixfs](https://ipfs.github.io/helia-unixfs/modules/helia.html)

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the IPFS Project
2. Create your Feature Branch (`git checkout -b feature/amazing-feature`)
3. Commit your Changes (`git commit -a -m 'feat: add some amazing feature'`)
4. Push to the Branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Want to hack on IPFS?

[![](https://cdn.rawgit.com/jbenet/contribute-ipfs-gif/master/img/contribute.gif)](https://github.com/ipfs/community/blob/master/CONTRIBUTING.md)

The IPFS implementation in JavaScript needs your help! There are a few things you can do right now to help out:

Read the [Code of Conduct](https://github.com/ipfs/community/blob/master/code-of-conduct.md) and [JavaScript Contributing Guidelines](https://github.com/ipfs/community/blob/master/CONTRIBUTING_JS.md).

- **Check out existing issues** The [issue list](https://github.com/ipfs/helia/issues) has many that are marked as ['help wanted'](https://github.com/ipfs/helia/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc+label%3A%22help+wanted%22) or ['difficulty:easy'](https://github.com/ipfs/helia/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc+label%3Adifficulty%3Aeasy) which make great starting points for development, many of which can be tackled with no prior IPFS knowledge
- **Look at the [Helia Roadmap](https://github.com/ipfs/helia/blob/main/ROADMAP.md)** This are the high priority items being worked on right now
- **Perform code reviews** More eyes will help
  a. speed the project along
  b. ensure quality, and
  c. reduce possible future bugs
- **Add tests**. There can never be enough tests

[cid]: https://docs.ipfs.tech/concepts/content-addressing  "Content Identifier"
[Uint8Array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array
[libp2p]: https://libp2p.io
[IndexedDB]: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
[S3]: https://aws.amazon.com/s3/
