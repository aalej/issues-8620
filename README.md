# Repro for issue 8620

## Versions

firebase-tools: v14.4.0<br>
node: v20.19.1

## Steps to reproduce

1. Run `npm i`
2. Run `firebase emulators:start --project demo-project`

```
$ firebase emulators:start --project demo-project --debug
i  emulators: Starting emulators: apphosting {"metadata":{"emulator":{"name":"hub"},"message":"Starting emulators: apphosting"}}
i  emulators: Detected demo project ID "demo-project", emulated services will use a demo configuration and attempts to access non-emulated services for this project will fail. {"metadata":{"emulator":{"name":"hub"},"message":"Detected demo project ID \"demo-project\", emulated services will use a demo configuration and attempts to access non-emulated services for this project will fail."}}
[2025-05-19T13:10:38.379Z] [logging] Logging Emulator only supports listening on one address (127.0.0.1). Not listening on ::1
[2025-05-19T13:10:38.379Z] [apphosting] App Hosting Emulator only supports listening on one address (127.0.0.1). Not listening on ::1
[2025-05-19T13:10:38.379Z] assigned listening specs for emulators {"user":{"hub":[{"address":"127.0.0.1","family":"IPv4","port":4400},{"address":"::1","family":"IPv6","port":4400}],"logging":[{"address":"127.0.0.1","family":"IPv4","port":4500}],"apphosting":[{"address":"127.0.0.1","family":"IPv4","port":5002}]},"metadata":{"message":"assigned listening specs for emulators"}}
[2025-05-19T13:10:38.382Z] [hub] writing locator at /var/folders/6r/csjmhpv13nbbc2wq1mdclkc400t31x/T/hub-demo-project.json
i  emulators: Shutting down emulators. {"metadata":{"emulator":{"name":"hub"},"message":"Shutting down emulators."}}
i  apphosting: Stopping App Hosting Emulator {"metadata":{"emulator":{"name":"apphosting"},"message":"Stopping App Hosting Emulator"}}
i  apphosting: stopping apphosting emulator {"metadata":{"emulator":{"name":"apphosting"},"message":"stopping apphosting emulator"}}
i  hub: Stopping emulator hub {"metadata":{"emulator":{"name":"hub"},"message":"Stopping emulator hub"}}
[2025-05-19T13:10:38.939Z] TypeError: Cannot convert undefined or null to object
    at Function.values (<anonymous>)
    at tripFirebasePostinstall (/usr/local/lib/node_modules/firebase-tools/lib/emulator/apphosting/serve.js:138:41)
    at serve (/usr/local/lib/node_modules/firebase-tools/lib/emulator/apphosting/serve.js:96:15)
    at async start (/usr/local/lib/node_modules/firebase-tools/lib/emulator/apphosting/serve.js:32:5)
    at async AppHostingEmulator.start (/usr/local/lib/node_modules/firebase-tools/lib/emulator/apphosting/index.js:12:36)
    at async EmulatorRegistry.start (/usr/local/lib/node_modules/firebase-tools/lib/emulator/registry.js:19:9)
    at async Object.startAll (/usr/local/lib/node_modules/firebase-tools/lib/emulator/controller.js:658:9)
    at async /usr/local/lib/node_modules/firebase-tools/lib/commands/emulators-start.js:34:43

Error: An unexpected error has occurred.
```

## Notes

- I wasn't able to reproduce the issue firebase-tools v14.3.1
- Running `npm ls @firebase/util --json --long` outputs the below, maybe we need to change `npmLsResults.dependencies` to `npmLsResults._dependencies`(?)

```
$ npm ls @firebase/util --json --long
{
  "version": "0.1.0",
  "name": "next-app",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@tailwindcss/postcss": "^4",
    "tailwindcss": "^4",
    "eslint": "^9",
    "eslint-config-next": "15.3.2",
    "@eslint/eslintrc": "^3"
  },
  "_id": "next-app@0.1.0",
  "extraneous": false,
  "path": "/Users/PATH/8620-next/next-app",
  "_dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "next": "15.3.2"
  },
  "peerDependencies": {}
}
```
