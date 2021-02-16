# Commands for RNode

Commands for calling rnode

## Available shell commands

With RNode running, use `--help` to see available commands and subcommands.

## Calling the API

The RNode API is a server side API. To access the local RNode server once you have RNode running, open a new window and invoke the RNode api with:

```bash
rnode <API call>
```

### Calling the API from a remote server

You can call the API of a remote RNode server by specifying the host server and host server port.

<div style='overflow-x:auto'>
  <table class="wrapped confluenceTable tablesorter tablesorter-default" resolved="" role="grid">
      <colgroup>
          <col>
              <col>
                  <col>
                      <col>
      </colgroup>
      <thead>
          <tr role="row" class="tablesorter-headerRow">
              <th class="confluenceTh tablesorter-header sortableHeader tablesorter-headerUnSorted" data-column="0" tabindex="0" scope="col" role="columnheader" aria-disabled="false" unselectable="on" aria-sort="none" aria-label="Option: No sort applied, activate to apply an ascending sort" style="user-select: none;">
                  <div class="tablesorter-header-inner">Option</div>
              </th>
              <th class="confluenceTh tablesorter-header sortableHeader tablesorter-headerUnSorted" data-column="1" tabindex="0" scope="col" role="columnheader" aria-disabled="false" unselectable="on" aria-sort="none" aria-label="Description: No sort applied, activate to apply an ascending sort" style="user-select: none;">
                  <div class="tablesorter-header-inner">Description</div>
              </th>
              <th class="confluenceTh tablesorter-header sortableHeader tablesorter-headerUnSorted" data-column="2" tabindex="0" scope="col" role="columnheader" aria-disabled="false" unselectable="on" aria-sort="none" aria-label="Syntax: No sort applied, activate to apply an ascending sort" style="user-select: none;">
                  <div class="tablesorter-header-inner">Syntax</div>
              </th>
              <th class="confluenceTh tablesorter-header sortableHeader tablesorter-headerUnSorted" data-column="3" tabindex="0" scope="col" role="columnheader" aria-disabled="false" unselectable="on" aria-sort="none" aria-label="Argument Format: No sort applied, activate to apply an ascending sort" style="user-select: none;">
                  <div class="tablesorter-header-inner">Argument Format</div>
              </th>
          </tr>
      </thead>
      <tbody aria-live="polite" aria-relevant="all">
          <tr role="row">
              <td class="confluenceTd">Host Server</td>
              <td class="confluenceTd">The IP address of the server that will receive the call</td>
              <td class="confluenceTd">--grpc-host</td>
              <td class="confluenceTd">100.10.25.75</td>
          </tr>
          <tr role="row">
              <td class="confluenceTd">Host Server port</td>
              <td class="confluenceTd">The port for the gRPC API on the server listening for calls</td>
              <td class="confluenceTd">--grpc-port</td>
              <td class="confluenceTd">40401</td>
          </tr>
      </tbody>
  </table>
  </div>

This is an example of an API call to a remote server

```bash
./bin/rnode --grpc-host IP.Address.of.server --grpc-port 40401 repl
```

## Find your node address, version, and peer count

You can ask RNode to provide its status to report the RNode address, version, and peer count.

```bash
curl -s http://localhost:40403/status
```

Report status in Docker

```bash
sudo docker exec -ti <containername> curl -s http://localhost:40403/status
```

Example of a status request response

```bash
{"address":"rnode://4fa269b79e781af2c079713772cfc5dbd7dc1569@52.119.8.64?protocol=40400&discovery=40404","version":"RChain Node 0.9.4.git8a4c9939 (8a4c99394c3a22831c2eadef7cdde7dec35238d7)","peers":7,"nodes":44}
```

RNode offers two types of counts of peers. peers are the number of nodes you are connected to via the Kademlia protocol and the ones that are able to pass messages such as blocks. nodes are the number of nodes found as part of node discovery.

## Get a count of blocks in the DAG

Use this command to show the number of blocks in the DAG according to your node.

Report status in Docker

```bash
rnode show-blocks
```

Get a count of blocks in Docker

Report status in Docker

```bash
docker run -it --rm --network-id rnode-net --name rnode -v $HOME/var/rholang:/var/ rchain/rnode:latest --grpc-host rnode2 show-blocks
```

## Generate a public/private key set

You can use the RNode software to generate either a secp256k1 public/private key set to use when deploying Rholang or in other scenarios where providing keys is a requirement. With the release of RNode v0.9.7 the platform uses the secp256k1 algorithm.

```bash
rnode keygen --algorithm secp256k1 --private-key-path <arg>
```
