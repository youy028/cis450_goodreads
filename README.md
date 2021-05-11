# cis450_goodreads



### Dependencies

All dependency information can be found in client/package.json and server/package.json

### Setting Up the project

1. Check if you already have Node installed.Open terminal and type node -v; npm -v to check what version, if any, of node and npm are installed on your machine. If these commands are not recognized, go to https://nodejs.org/en/download/ and download the Node.js for your system. Having multiple versions sometimes causes issues that are hard to debug.
2. In terminal, cd into the client directory. Run npm install. This will download all the required client-side dependencies, which are specified in package.json into the node_modules/ directory.
3. cd into the hw2/server directory. Run npm install. This will download all required server-side dependencies.
4. While in the /server folder, type npm start in the terminal to start the server. By default, it’s running on port 8081. You should see a message in the Terminal saying “Server listening on PORT 8081”.
5. In a separate terminal window, cd into the client folder and type npm start. This will start the client-side code. Your browser should automatically open to http://localhost:3000. If not, enter this link manually. Note: You may need to run npm install react-scripts --save if you get an error message that “react-scripts is not recognized as an internal or external command”.
