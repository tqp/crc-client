// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  name: 'agnostic',
  production: false,
  hmr: false,
  apiUrl: 'http://localhost:8080',
  buildTimestamp: '01/24/2021 08:39:21'
};
