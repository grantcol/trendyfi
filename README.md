## Installation

### NPM
Npm (node package manager) is a dependency manager for node.js applications, which both parts of our application are.You'll need to install both. There are a few ways to get up and running.

1. [Use the installer](https://nodejs.org/en/download/). Here's a [blog post for windows users](http://blog.teamtreehouse.com/install-node-js-npm-windows) explaining the process.
2. [Use homebrew](http://brew.sh/). This is a OSX only method. After installing homebrew you should then be able to complete the installation by running `brew install node` and `brew install npm`

### React Native
The mobile portion of this application is built with [react native](https://facebook.github.io/react-native/). To get started follow the instructions for your platform configuration [here](https://facebook.github.io/react-native/docs/getting-started.html#content)

### Node server
The backend of our application is built with node and express. It's a simple, barebones server that implements RESTful functions for manipulating our [mongodb](https://www.mongodb.com/) data sets. It does so through a mongo wrapper called [mongoose](http://mongoosejs.com/) which makes data operations wavy as fuck (for those curious).

Fortunately, all the server dependencies are contained in `package.json` so once you pull the latest from this repo all you need to do is run `npm install` from the local project directory and everything should be good to go.

### Git
Getting and keeping up to date with the code is done through git. Regardless of the interface you use to do operations (push, pull etc) you'll need to [install git first](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

I do not use gui applications for this but most people use [SourceTree](https://www.sourcetreeapp.com/). It's well documented and easy to set up.

For those who opt to stay true to themselves, you can also use the terminal. The following is a cheat sheet for using the terminal.

1. `git clone <repo url>`: downloads the code base to your computer. (note that the repo url can be found on the upper right hand portion of the github page under the contributors tab. it's labeled 'clone or download')
2. `git pull origin <branch>`: updates the version on your local machine to the latest version online. branch is usually master unless otherwise noted.
3. `git push origin <branch>`: pushes changes you've made locally to the online repo. branch is usually master unless otherwise noted.
4. `git branch <new branch>`: if you want to write new code make a branch with this command. then run `git checkout branchYouJustCreated` to switch to it. [Read up](https://git-scm.com/book/en/v2/Git-Commands-Branching-and-Merging) on branching if you care to do so.
5. `git stash`: if you made changes but fucked up and want to erase all evidence of idiocy / don't want developers to hate you forever.

## Setup
Once you're up and running with all the garbage pre-reqs it's time to run code.

0. Open up 2 terminal windows to start. One for the server and one for the app itself.
1. Run `git clone https://github.com/grantcol/trendyfi` or follow SourceTree instructions if you're using that.
2. Run `cd trendyfi` to move into the project directory.
3. `git pull origin master` to download the latest if using the terminal. if not skip.
4. Start the server with `cd server` then `node server.js` in one of the terminals.
5. Start the app with `cd mobile` then `react-native run-ios` this will bring up the simulator.
6. Enable logging so you can see errors and print statements in the terminal: `react-native log-ios`.
7. To run on a device, follow these [instructions](https://facebook.github.io/react-native/docs/running-on-device-ios.html)

The end result should be two running processes (meaning the prompt in the terminal should be gone), a simulator showing the app, and a server running at `http://localhost:8888` (If you simply want to test the server you can send http requests here and see the output). Alternatively if you'd like to run the app without the backend it'll still work fine if you simply kill or don't execute `node server.js`.

Stay safe kids.
