import fetch from 'cross-fetch';

class Client {
  #request;

  constructor({ hubAddress, testnet = false }) {
    if (hubAddress) {
      this.hubAddress = hubAddress;
    } else {
      if (testnet) {
        this.hubAddress = "https://testnet.obyte.org/api";
      } else {
        this.hubAddress = "https://obyte.org/api";
      }
    }

    this.witnesses = null;

    this.#request = async (path, body = {}) => {
      const response = await fetch(`${this.hubAddress}/${path}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: "post",
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const errorBody = await response.text();
        let errorObject = {};

        try {
          errorObject = errorBody && JSON.parse(errorBody);
        } catch { }

        if (errorObject && ("error" in errorObject)) {
          throw new Error(errorObject.error);
        } else {
          throw new Error("unknown error");
        }
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      } else {
        return data?.data;
      }
    }
  }


  async getLastMci() {
    return await this.#request("get_last_mci");
  }

  async getPeers() {
    return await this.#request("get_peers");
  }

  async getWitnesses(update = false) {
    if (this.witnesses && !update) {
      return this.witnesses;
    } else {
      this.witnesses = await this.#request("get_witnesses");
      return this.witnesses;
    }
  }

  async getJoint(unit) {
    const { joint } = await this.#request("get_joint", {
      unit
    });
    return joint;
  }

  async getBalances(addresses) {
    return await this.#request("get_balances", { addresses });
  }

  async getProfileUnits(addresses) {
    return await this.#request("get_profile_units", { addresses });
  }

  async getDefinition(address) {
    return await this.#request("get_definition", { address });
  }

  async getDataFeed(oracles, feed_name, ifnone) {
    return await this.#request("get_data_feed", { oracles, feed_name, ifnone });
  }

  async getHistory(addresses, witnesses, updateWitnesses = false) {
    const witnessesList = witnesses || await this.getWitnesses(updateWitnesses);

    return await this.#request("get_history", { addresses, witnesses: witnessesList });
  }

  async getAttestation(attestor_address, field, value) {
    return await this.#request("get_attestation", { attestor_address, field, value });
  }

  async getAttestations(address) {
    return await this.#request("get_attestations", { address });
  }

  async getAaResponseChain(trigger_unit) {
    return await this.#request("get_aa_response_chain", { trigger_unit });
  }

  async getAaResponses(aaOrAas) {
    let params = {};

    if (typeof aaOrAas === "string") {
      params.aa = aaOrAas;
    } else {
      params.aas = aaOrAas;
    }

    return await this.#request("get_aa_responses", params);
  }

  async getAasByBaseAas(aaOrAas) {
    let params = {};

    if (typeof aaOrAas === "string") {
      params.base_aa = aaOrAas;
    } else {
      params.base_aas = aaOrAas;
    }

    return await this.#request("get_aas_by_base_aas", params);
  }

  async dryRunAa(address, trigger) {
    return await this.#request("dry_run_aa", {
      address,
      trigger
    });
  }

  async executeGetter(address, getter, args) {
    return await this.#request("execute_getter", { address, getter, args }).then(data => data.result);
  }

  async getAaBalances(address) {
    return await this.#request("get_aa_balances", { address }).then(data => data.balances);
  }

  async getAaStateVars(address, var_prefix, var_prefix_from = undefined, var_prefix_to = undefined) {
    return await this.#request("get_aa_state_vars", { address, var_prefix, var_prefix_from, var_prefix_to });
  }
}

export default {
  Client
}