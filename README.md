# MOCK-API

Use node/express compared the system. You can request the mock api which writing in the files. And, you can see the api document in local website.

## How to start the server

1. Download the code from github.
2. Install the node environment from `https://nodejs.org/en/`. Usually we use the LTS version.
3. Run the shell `npm install`, it will install the required packages.
4. Start the web server, just run `npm start`. You can read the command in `package.json`
5. Now, open the browser and enter `http://localhost:3000/web`, you can see the api document.

## How to write the mock api
 
 * In the directory `api_package`, you can write api files here. See the example in directory `test`
 * Add the package required in `app.js` . First defined the required variable, then enter the `app.use()` to use it.
 * Restart the web server by `npm start` .

## Directory description

Usually we just need write the api files in `api_package` and `api_achieve`, then add the required in `app.js`.
But if you want to develop or change it, you can see the directory description next.

```
api_achieve //The mock api achieve method, the realy logic process.
api_package //The mock api defined, add the remark by the rules, you can generate the api document.
app // The api document web project.
    |_components    // react components
    |_config        // some config
    |_provider      // some required package
    |_scss          // the scss of components required
    |_service       // some service for generating documents
generate_file       // the generated document files
generateMethod      // the method of generate json files
```

## other

 