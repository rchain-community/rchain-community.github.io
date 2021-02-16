# Run RChain network in the cloud with terraform

Your can also start a complete new Rchain network on large cloud providers (AWS, Google Cloud, IBM).

## Start Network

> You first have to download the data from: [Rchain-terraform](https://github.com/rchain/rchain-testnet-node).

Inside the folder resources-tf.{network_name} (e.g. resources-tf.testnet) folder you can wipe out an existing network and reestablish a new one by running:

```bash
terraform destroy
```

followed by

```bash
terraform apply
```

This requires access to Google Cloud Engine and properly confugired gcloud and terraform.

You can run nodes instances as preemptible VMs (which are considerably cheaper) when you need to make a short test.
But their availability is not guaranteed.

To run preemptible instances (default), use in hosts.tf

```bash
preemptible       = true
automatic_restart = false
```

for usual one change config to

```bash
preemptible       = false
automatic_restart = true
```
