# Network Configuration

By default RNode continuously attempts to connect to other peers. Successful connection to other nodes on the RChain network requires connectivity support from your network.

> Please ensure, that your internet service provider or web-hoster has assigned you an IPV4 address. If your ISP is using dual stack or IPV6 (dual stack assignes you an IPV6 address), there is currently no bootstrap node, which you can connect to.

> Normally the RNode Application is doing everything for you automatically, so you can go directly to [Installing RNode](/docs/installing-rnode). Only in cases, where RNode is waiting for it's first connection for a longer time, you have to read the following instructions.

## Background

The RNode software runs as a server on the RChain network. The RNode communications software uses gRPC, which uses TLS to secure TCP connections between validators and read-only nodes. The RChain network is a peer to peer network. For a RNode server instance to properly communicate with the rest of the network, secure bi-directional communication must be possible. Validators must be able to send queries to each other and must be able to receive connections from other validators.

## Supported Network Configuration

RChain communications software supports this network configuration.

RNode server → Router → Internet

The RNode server needs to be directly connected to the router. The router needs to either support UPnP or have static NAT with port forwarding configured for ports 40400 - 40430. If you wish to use a different set of ports, specify those at runtime with the --p option.

## How Universal Plug and Play (UPnP) Works

RNode supports the UPnP protocol, commonly available on retail routers today. When RNode detects a UPnP gateway device, such as your wireless router, the node software will configure the router's firewall rules automatically. In many small business and home networks, this allows the user to run RNode as a validator without having to reconfigure their network.

> Node operators running Docker on Mac OS X will not be successful running RNode with UPnP. If you want to run with Docker on Mac OS X, you must configure static NAT and port forwarding manually. See "Routers without UPnP Support" below.

## Test your network

- Go to [http://canyouseeme.org](http://canyouseeme.org)
- Enter '40400' for the port
  A success message means your configuration should be successful connecting to the RChain network.

An error message means your network configuration may not be successful connecting to the RChain network. You need to investigate your configuration and possibly make changes.

## Routers without UPnP Support

If your router does not support UPnP, you will have to configure Static NAT and Port forwarding manually.

> Information
>
> Refer to your router's documentation and user guide for specific instructions.

At a high level, you should:

1. Assure the machine running RNode is connected to the router and turned on.
2. Configure static NAT for the machine in the router configuration interface.
3. Configure port forwarding for ports 40400 - 40430
   When configuration is complete, it should look something like this:

<br><br/>

<table>
  <tr>
    <th>Device</th>
    <th>Allowed Applications </th>
    <th>Protocol</th>
    <th>Port Number</th>
  </tr>
  <tr>
    <td>MyRNodeServer</td>
    <td>RChain</td>
    <td>tcp</td>
    <td>40400-40430</td>
  </tr>
</table>

## Running Docker

Running RNode in Docker has additional network configuration requirements. You must. include explicit port mapping options in your run command with the --p option..

Example run command:

```javascript
docker run -it -p 40400:40400 --name my_rnode_server -v "$HOME/var":/var rchain/rnode:latest run --default-timeout 6000 --no-upnp -b rnode://address_of_bootstrap_node
```

> Node operators running Docker on Mac OS X will not be successful running RNode with UPnP. If you want to run with Docker on Mac OS X, you must configure static NAT and port forwarding manually. See "Routers without UPnP Support" below.

## Successful Connection

Look in the console for connection confirmation. Below is an example showing the run command through the confirmation of connection to the bootstrap node.

```javascript
root@salt:~# rnode run --default-timeout 6000 -b rnode://7fa70d245268ed19253f18c802fccd22668a0211@52.119.8.68:40400 --validator-private-key d19bab22bed4d72422e5ae2dc37982635e1d894f5a63dc4f790836a86a05b7ba
18:08:34.299 [main] INFO  c.r.n.configuration.Configuration$ - Starting with profile default
18:08:34.321 [main] INFO  c.r.n.configuration.Configuration$ - Using configuration file: /root/.rnode/rnode.toml
18:08:34.330 [main] WARN  c.r.n.configuration.Configuration$ - Can't load the configuration file: File /root/.rnode/rnode.toml not found
INFO - trying to open ports using UPnP....
INFO - No gateway devices found
INFO - No need to open any port
18:08:43.937 [main] INFO  c.r.node.configuration.Configuration - flag --host was not provided, guessing your external IP address
18:08:44.190 [main] INFO  c.r.node.configuration.Configuration - guessed 52.119.8.64 from source: AmazonAWS service
Using data_dir: /root/.rnode
No certificate found at path /root/.rnode/node.certificate.pem
Generating a X.509 certificate for the node
Generating a PEM secret key for the node
18:08:46.224 [main] INFO  coop.rchain.node.NodeRuntime - RChain Node 0.6.1 (acde1c1a2bc983838a38118653905b0c85ab9c58)
18:08:46.225 [main] INFO  coop.rchain.node.NodeRuntime - Starting node that will bootstrap from rnode://7fa70d245268ed19253f18c802fccd22668a0211@52.119.8.68:40400
18:08:46.501 [main] INFO  o.h.b.c.nio1.NIO1SocketServerGroup - Service bound to address /127.0.0.1:40402
18:08:46.502 [main] INFO  org.http4s.server.blaze.BlazeBuilder -   _   _   _        _ _
18:08:46.503 [main] INFO  org.http4s.server.blaze.BlazeBuilder -  | |_| |_| |_ _ __| | | ___
18:08:46.503 [main] INFO  org.http4s.server.blaze.BlazeBuilder -  | ' \  _|  _| '_ \_  _(_-<
18:08:46.503 [main] INFO  org.http4s.server.blaze.BlazeBuilder -  |_||_\__|\__| .__/ |_|/__/
18:08:46.503 [main] INFO  org.http4s.server.blaze.BlazeBuilder -              |_|
18:08:46.549 [main] INFO  org.http4s.server.blaze.BlazeBuilder - http4s v0.18.0 on blaze v0.12.11 started at http://127.0.0.1:40402/
18:08:46.585 [kamon.prometheus.PrometheusReporter] INFO  kamon.prometheus.PrometheusReporter - Started the embedded HTTP server on http://0.0.0.0:40403
18:08:46.659 [main] INFO  coop.rchain.node.api.GrpcServer$ - gRPC server started, listening on
18:08:47.003 [main] INFO  coop.rchain.node.NodeRuntime - Listening for traffic on rnode://d533e024910f1c4c57eae88c0945a29fdc2ada6a@52.119.8.64:40400.
18:08:47.025 [main] INFO  coop.rchain.comm.rp.Connect$ - Initialize protocol handshake to rnode://7fa70d245268ed19253f18c802fccd22668a0211@52.119.8.68:40400
18:08:49.608 [grpc-default-executor-0] INFO  coop.rchain.comm.rp.Connect$ - Peers: 1.
18:08:49.615 [grpc-default-executor-0] INFO  coop.rchain.comm.rp.Connect$ - Connected to rnode://7fa70d245268ed19253f18c802fccd22668a0211@52.119.8.68:40400.
```

## Error Messages

The RNode software automatically attempts to detect a UPnP gateway. If you see the following message and are not able to connect to the bootstrap node, then you need to check that your network configuration is correct and your router supports UPnP.

```
INFO - trying to open port using uPnP....
INFO - [OK] no gateway found, no need to open any port.
```

RNode will make 5 attempts to connect to the bootstrap. After the fifth attempt, RNode will exit. If your RNode cannot connect, you will see the following message.

```
Failed to connect to bootstrap (attempt 1/5)
```
