# Setup local rnode instance

This document describes how to setup a docker rnode instance on your local computer. This is for testing purposes, so you can test your code in a local test environement. Your code will behave, like it will on the real network.

## Installing rnode (docker)

The rnode docker instance is running on Windows, Linux, Mac. This tutorial describes the installing process for windows, but other operating systems are similar to setup.

**Prerequisites:**
Windows 10, Linux, Mac

1. Install the latest updates for windows 10 and install the latest version of [docker](https://hub.docker.com/editions/community/docker-ce-desktop-windows/). Click on **Get Docker** and install it on your pc. Restart the pc.
2. There has to be a **white** docker logo on the windows taskbar.
   If the docker logo ist red, then there is a docker problem with your pc (sometimes wsl_update_x64.msi has to be additionally installed).
   ![vscode1](./images/vscode-1.png)

3. Download the rnode-client-js-dev-test from [rnode-client-js-dev-test](https://github.com/tgrospic/rnode-client-js-dev-test) ➜ click on the button **Code** on github ➜ Download ZIP ➜ extract the zip folder locally
4. open a command line window and type in:

```javascript
   $ cd <rnode-client-js-dev-test-master folder>
```

```javascript
   $ docker-compose up -d
```

Make sure you go two folders deep if you have extracted the folder (rnode-client-js-dev-test-master/rnode-client-js-dev-test-master)
![sdk-1](./images/sdk-1.png)

5. Open the docker setting if you want to see the logs of rnode (small icon on the taskbar)
   ![sdk-2](./images/sdk-2.png)

> ⚠️ If you get the following errors in your console:  
> **Error: bind: An attempt was made to access a socket in a way forbidden by its access permissions.**  
> Solution: this is due to hyper-v binding the ports. Open cmd and type:
>
> ```javascript
> $ netsh interface ipv4 show excludedportrange protocol=tcp
> $ net stop winnat
> $ netsh int ipv4 add excludedportrange protocol=tcp startport=50400 numberofports=10
> $ netsh int ipv4 add excludedportrange protocol=tcp startport=60400 numberofports=10
> $ net start winnat
> ```
>
> **Error: Windows push notification framework is missing**  
> Solution: enable windows push noftification (WpnService) or disable this in WPD (windows privacy dashboard)
>
> **Error: binding error**  
> Solution: if you have installed the rholang extension for vscode, disable under extension settings: Run Rnode with Docker.

## Deploy to the local rnode instance

1. Open vscode and open the downloaded folder: [rnode-client-js-dev-test](https://github.com/tgrospic/rnode-client-js-dev-test)

2. Open this folder inside vscode and open a terminal:

```javascript
   $ npm install
```

3. After installing the packages then type:

```javascript
   $ npm run start
```

![sdk-3](./images/sdk-3.png)

4. Open the http://localhost:1234 link in the browser
5. Select localhost and type in the following private key

```bash
bb6f30056d1981b98e729cef72a82920e6242a4395e500bd24bd6c6e6a65c36c
```

![sdk-4](./images/sdk-4.png)

6. Name the wallet and save it.

> ⚠️ Never type a private key in an app your don't trust, this is only a private key for testrevs, so no real mainnet tokens.

7. Click on an example contract (here return data) click on **Deploy Rholang code** and then click on **Propose**. After a very seconds there should be a return value.
   ![sdk-5](./images/sdk-5.png)
