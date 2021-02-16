---
title: 'RNode explore-deploy bash script using jq'
slug: tools
author: [jimscarver]
date: 2020-09-14
tags: ['tools', 'bash', 'jq', 'explore-deploy']
excerpt: 'A small demo for a explore-deploy bash script using jq'
---
You can run read only contracts on rchain without paying any fee using the http explore-deploy api call. Every returned value from an explore-deploy is enclosed in a structure having a type and data field. Pulling out just the data as json is often needed to use the complete result in json without enclosing type and data constructs. This example uses the bash json utilityy jq to 'detype' the output. While jq is good for many uses of json in bash using javascript might have been as easy in this case.
```javascript
#usage: ./explore.sh URI
uri=${1-"rho:id:ar17ohqq83kx7a16nbfquwu9gxidduk9hstgbs9gkbj63o8gqyh1ye"}
curl -s -X POST https://observer.testnet.rchain.coop/api/explore-deploy -d '
new return,
  lookup(`rho:registry:lookup`)
in {
  new valueCh in {
    // Fill in registry URI: `rho:id:11fhnau8j3...h4459w9bpus6oi`
    lookup!(
`'"$uri"'`
      , *valueCh) |
    for (@value <- valueCh) {
      return!(value)
    }
  }
}
'|tee /tmp/explore.err|jq '.expr[]|
def detype:
  if type == "object"
  then if has("ExprTuple") then .ExprTuple.data | map(detype)
       elif has("ExprList") then .ExprList.data | map(detype)
       elif has("ExprMap") then .ExprMap.data | detype
       elif has("ExprString") then .ExprString.data
       else . end
  else . end;
def walk(f): # walk def is needed for old jq <1.5
  . as $in
  | if type == "object" then
      reduce keys[] as $key
        ( {}; . + { ($key):  ($in[$key] | walk(f)) } ) | f
  elif type == "array" then map( walk(f) ) | f
  else f
  end;
walk(detype)' || cat /tmp/explore.err
exit
```
