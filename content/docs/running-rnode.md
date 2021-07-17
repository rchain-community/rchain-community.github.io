# Running RNode (non-Docker)

Rnode is the instance, where the smart-contracts are executed. This chapter describes, how to setup the rnode instance on your pc and connect to an existing network.

## Install RNode

We deliver RNode software in a variety of installation packages. Installation packages are available at both [RChain](https://developer.rchain.coop) and [Github](https://github.com/rchain/rchain/releases). We recommend using the latest release.

> In the command examples below, you must update based on the version number of RNode you want by replacing "x" with the numbers in your installation version.

> Should there be errors, when you install RNode for the first time, please make shure that you have the newest Java version installed.

### Linux

This part describes, how to setup a rnode instance on linux

#### Install JDK (Java)

The rnode instance for linux needs the Java JDK preinstalled. Many distribution have this included into their os.

```sh
sudo apt-get update
sudo apt-get install -y software-properties-common
sudo add-apt-repository -y ppa:openjdk-r/ppa
sudo apt-get update
sudo apt-get install -y openjdk-11-jdk
```

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

### Mac

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

## ARM

You can run RNode on Raspberry pi. An example of this, including installation and deployment instructions, is available at [https://github.com/kayvank/arm-rnode](https://github.com/kayvank/arm-rnode).

## To connect to an existing network

> Please fill in the `<bootstrap ID>`. The current network ID is posted on [RChain public testnet information](https://rchain.atlassian.net/wiki/spaces/CORE/pages/678756429/RChain+public+testnet+information).

```bash
rnode run --network-id <arg> --shard-id <arg> --bootstrap <arg> --finalization-rate <arg> --fault-tolerance-threshold <arg> --synchrony-constraint-threshold <arg> --fork-choice-stale-threshold <arg> --fork-choice-check-if-stale-interval <arg> --drop-peer-after-retries <arg> --give-up-after-skipped <arg>
```

- `--network-id <arg>` The network to run on (testnet , mainnet).
- `--shard-id <arg>` The network is splitted into shards for scaling.
- `--bootstrap <arg>` The bootstrap server for initial connection to the network.
- `--finalization-rate <arg>` Block finalization is triggered after adding every 'n' blocks. Use this option to configure this.
- `--fault-tolerance-threshold <arg>` Float value representing that the node tolerates up to fault-tolerance-threshold fraction of the total weight to equivocate.
- `--synchrony-constraint-threshold <arg>`Float value representing that the node waits until at least synchrony-constraint-threshold fraction of the validators (by stake weight) proposed at least one block since is node's last proposal.
- `--fork-choice-stale-threshold <arg>` Node will request for fork choice tips if the latest FCT is more then ForkChoiceStaleThreshold old.
- `--fork-choice-check-if-stale-interval <arg>` Interval for check if fork choice tip is stale.
- `--drop-peer-after-retries <arg>` Fair round robin dispatcher drop inactive peer after round robin rounds. After giving up several times the peer gets dropped from the queue.
- `--give-up-after-skipped <arg>` Fair round robin dispatcher give up and try next peer after skipped packets. Skipped packets are buffered in other peers packet queues.

**Examples:**

- run rnode

```bash
./rnode run --network-id mainnet --shard-id root --bootstrap "rnode://487e2c0c519b450b61253dea0a23b4d184a50089@node0.root-shard.mainnet.rchain.coop?protocol=40400&discovery=40404" --finalization-rate 1 --fault-tolerance-threshold -1 --synchrony-constraint-threshold 0 --fork-choice-stale-threshold 30minutes --fork-choice-check-if-stale-interval 30minutes --drop-peer-after-retries 0 --give-up-after-skipped 0
```

- help documentation

```bash
./rnode --help
```

> if the message: `- Waiting for first connection` is there for more than 1 minute, please check your ports and ip: [Network Configuration](/docs/network-configuration)
