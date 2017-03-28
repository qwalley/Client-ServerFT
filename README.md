# Client-ServerFT
A school assignment to create Client and Server applications for file transfer using TCP socket programming. Built with Node.js and the "net" module

## Use it!
### In your terminal:
* verify that your system has Node.js installed: `$node -v`
* clone the repo: `$git clone https://github.com/qwalley/Client-ServerFT.git`
* navigate to the folder: `$cd Client-ServerFT`
* install dependencies: `$npm install`
* open a second terminal

**in terminal A:**
* navigate to `Client-ServerFT/src/server`
* create a file `your_file.txt` in the `Client-ServerFT/src/server/public/` directory
* run: `$node tcp_server.js`

**in terminal B:**
* navigate to `Client-ServerFT/src/client`
* run: `$node tcp_client.js`
* type `your_file.txt` and hit enter
* Now the file is saved in `Client_ServerFT/src/client/downloads/`
* type `exit` and hit enter to end the process, or request a second file
