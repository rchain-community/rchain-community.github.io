# Check block finalization
When the network has accepted your block and reached a consensus on it, the block is finalized

## Check if a block is finalized
Use this command to check if a block with the given blockhash is finalized
```bash
rnode is-finalized <blockhash>
```
Here is an example of the console output following the is-finalized call.

```bash
$ rnode is-finalized f893a2ef3c9d69a0d8b2a660453abe0002628769c51f11af4d720e56c43a96d7
Block is finalized
```
