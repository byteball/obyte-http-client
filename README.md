# Obyte http client

## Install
``yarn add obyte-http-client``

## Use
```js
import obyte from "obyte-http-client"
```
 
## Example

### 1. Create an instance
```js 
import obyte from "obyte-http-client";

export default new obyte.Client({
  testnet: true
});
```


### 2. Use
```js 
import obyteClientInstance from "..."; 

const witnesses = obyteClientInstance.getWitnesses();

```

## Methods

### getWitnesses - Returns list of the current witnesses.

```js
const witnesses = obyteClientInstance.getWitnesses();
```

### getPeers - Returns the list of the current peers.

```js
const peers = obyteClientInstance.getPeers();
```

### getJoint - Request data of a specific unit.

```js
const joint = obyteClientInstance.getJoint('k37Xlns198EHCtubX5X0kqbrnC9XYVTa0aFpR78gidM=');
```

### getLastMci - Request data of a specific unit.

```js
const last_mci = obyteClientInstance.getLastMci();
```

### getLastMci - Get the last main chain index of the node you logged to.

```js
const last_mci = obyteClientInstance.getLastMci();
```

### getHistory - Get the history of one or multiple addresses.

```js
const history = obyteClientInstance.getHistory(["ULQA63NGEZACP4N7ZMBUBISH6ZTCUS2Q"]);
```

### getAttestation - Get attestation unit id from a specific attested value.

```js
const attestation = obyteClientInstance.getAttestation("H5EZTQE7ABFH27AUDTQFMZIALANK6RBG", "email", "obyte@obyte.org");
```

### getAttestation - Get all attestations of a specific address.

```js
const attestations = obyteClientInstance.getAttestations("ULQA63NGEZACP4N7ZMBUBISH6ZTCUS2Q");
```

### getDefinition - Get an address definition.

```js
const definition = obyteClientInstance.getDefinition("TMWNLXR42CKIP4A774BQGNVBZAPHY7GH");
```

### getBalances - Get balances from one or multiple addresses (max 100).

```js
const balances = obyteClientInstance.getBalances(["TMWNLXR42CKIP4A774BQGNVBZAPHY7GH"]);
```

### getProfileUnits - Get profile unit ids from one or multiple addresses (max 100).

```js
const profile_units = obyteClientInstance.getProfileUnits(["TMWNLXR42CKIP4A774BQGNVBZAPHY7GH"]);
```

### getDataFeed

```js
const data = obyteClientInstance.getDataFeed(["I2ADHGP4HL6J37NQAD73J7E5SKFIXJOT"], "timestamp", "none");
```

### dryRunAa - Calculates the predicted outcome of an Autonomous Agent with a sample transaction.

```js
const trigger = {
  address: 'K237YYRMBYWCJBLSZGLJTXLZVVEXLI2Y', // sent from address
  outputs: {
    'base': 10000 // default AA bounce fee in bytes
  },
  data: {
    'vest': true
  }
};

const result = obyteClientInstance.dryRunAa("TSDLQPZTSVDNC63G7YROC26CYCCZC4GO", trigger);
```

### getAaStateVars - Get state variables of an Autonomous Agent.

```js
const state_vars = obyteClientInstance.getAaStateVars("TSDLQPZTSVDNC63G7YROC26CYCCZC4GO", "proposal_1");
```

### getAasByBaseAas - Get Autonomous Agents that are based on some Autonomous Agent.

```js
const aas = obyteClientInstance.getAasByBaseAas("QFM5ECICVHZKRVTW3EMVTUSYJ6P2WLDY"); // or ["QFM5ECICVHZKRVTW3EMVTUSYJ6P2WLDY"]

```

### getAaResponses - Get latest Autonomous Agent responses.

```js
const responses = obyteClientInstance.getAaResponses("PVMCXUZBEHCFWOLXUDQVNCQZ476LNEW4"); // or ["PVMCXUZBEHCFWOLXUDQVNCQZ476LNEW4"]
```

### getAaResponseChain

```js
const response_chain = obyteClientInstance.getAaResponseChain("QjJsukONZ57VBVtLk/0ak1jMYNW0vw7q0So95KBJH2k=");
```

### executeGetter - Execute AA getter function

```js
const result = obyteClientInstance.executeGetter("VLKI3XMMX5YULOBA6ZXBXDPI6TXF6V3D", "get_exchange_result", [0, 100]);
```