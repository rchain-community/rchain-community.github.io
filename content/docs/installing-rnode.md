# Installing RNode

We deliver RNode software in a variety of installation packages. Installation packages are available at both [RChain](https://developer.rchain.coop) and [Github](https://github.com/rchain/rchain/releases). We recommend using the latest release.

> In the command examples below, you must update based on the version number of RNode you want by replacing "x" with the numbers in your installation version.

> Should there be errors, when you install RNode for the first time, please make shure that you have the newest Java version installed.

## Linux

#### Install JDK (Java)

```sh
sudo apt-get update
sudo apt-get install -y software-properties-common
sudo add-apt-repository -y ppa:openjdk-r/ppa
sudo apt-get update
sudo apt-get install -y openjdk-11-jdk
```

#### Install RNode

<div style='overflow-x:auto'>
<table class="tg">
  <tr>
    <th class="tg-0pky">Platform</th>
    <th class="tg-0pky">Package type</th>
    <th class="tg-0pky">Installation information</th>
  </tr>
  <tr>
    <td class="tg-0pky">Debian 9 Stretch<br><br>Ubuntu 16.04 LTS<br><br>Ubuntu 18.04.3 LTS<br></td>
    <td class="tg-0pky">Debian Package (.deb)</td>
    <td class="tg-0pky"><span style="font-weight:bold">First time installation:</span><br>sudo apt install ./rnode_x.x.x_all.deb<br><br><span style="font-weight:bold">Re-installation:</span><br>systemctl stop rnode<br>sudo apt remove rnode <br>rm -rf /var/lib/rnode/rspace<br>sudo apt install ./rnode_x.x.x_all.deb<br></td>
  </tr>
  <tr>
    <td class="tg-0pky">Fedora 27<br><br>Fedora 28<br><br>Fedora 29<br><br>Fedora 30</td>
    <td class="tg-0pky">RPM Package (.rpm)</td>
    <td class="tg-0pky"><span style="font-weight:bold">First time installation:</span><br>sudo dnf install ./rnode-x.x.x-1.noarch.rpm<br><span style="font-weight:bold">Re-installation:</span><br>sudo systemctl stop rnode &amp;&amp; dnf remove rnode &amp;&amp; rm -rf /var/lib/rnode/rspace &amp;&amp; sudo dnf install ./rnode-x.x.x-1.noarch.rpm<br></td>
  </tr>
  <tr>
    <td class="tg-0pky">Other Linux distributions</td>
    <td class="tg-0pky">Tarball (.tgz)</td>
    <td class="tg-0pky"><span style="font-weight:bold">Prerequisites </span><br>Java - We recommend Open JDK 11, <a href="https://openjdk.java.net/projects/jdk/11/">https://openjdk.java.net/projects/jdk/11/</a><br>Libsodium - <a href="https://download.libsodium.org/doc/">https://download.libsodium.org/doc/ </a>installed in a standard prefix (/user or /user/local)<br><br><span style="font-weight:bold">First time installation:</span><br>tar -xvf rnode-x.x.x.tgz<br></td>
  </tr>
</table>
</div>

## Mac

<br/>
<div style='overflow-x:auto'>
  <table class="tg">
  <tr>
    <td class="tg-0pky">Platform</td>
    <td class="tg-0pky">Package type</td>
    <td class="tg-0pky">Installation information</td>
  </tr>
  <tr>
    <td class="tg-0pky">Mac<br></td>
    <td class="tg-0pky">Tarball (.tgz)</td>
    <td class="tg-0pky"><span style="font-weight:bold">Prerequisites</span><br>Java - We recommend Open JDK 11, <a href="https://openjdk.java.net/projects/jdk/11/">https://openjdk.java.net/projects/jdk/11/</a><br>Libsodium - <a href="https://download.libsodium.org/doc/">https://download.libsodium.org/doc/ </a>installed in a standard prefix (/user or /user/local)<br><br><span style="font-weight:bold">First time installation:</span><br>tar -xvf rnode-x.x.x.tgz<br>cd rnode-0.x.x<br>./macos_install.sh<br> <br><span style="font-weight:bold">Note: </span><br>The macos_install.sh script installs the Homebrew package manager on your machine and then installs libsodium.<br>If you already have Homebrew installed on your machine, you can refer to the script for how to install libsodium directly.<br></td>
  </tr>
</table>
  </div>

## Windows

**Prerequisites:**
Windows 10

Although it is simple to install RNode in Docker, it is important to have an understanding for working with Docker to successfully run and interface with RNode.

- If you are brand new to working with Docker, read the [Docker get started documentation](https://docs.docker.com/docker-for-windows/).
- Install latest windows 10 updates
- Install Docker [Install Docker](https://docs.docker.com/docker-for-windows/install/).
- Start Docker Desktop
- open cmd: `$ docker pull rchain/rnode:latest`
- go to tutorial for running rnode in cmd: [Command line docker](/docs/running-rnode-docker)

## ARM

You can run RNode on Raspberry pi. An example of this, including installation and deployment instructions, is available at [https://github.com/kayvank/arm-rnode](https://github.com/kayvank/arm-rnode).
