from scripts.helpful_scripts import get_account#, get_contract
from brownie import DappToken, TokenFarm, network, config, interface
from web3 import Web3
import yaml
import json
import os
import shutil

KEPT_BALANCE = Web3.toWei(100, "ether")

def deploy_token_farm_and_dapp_token(front_end_update=False):
    account = get_account()
    dapp_token = DappToken.deploy({"from": account})
    print('Deploying Token Farm...')
    token_farm = TokenFarm.deploy(
        dapp_token.address,
        {"from": account},
        #publish_source=config["networks"][network.show_active()]["verify"],
    )
    print(f'Token Farm Deployed at {token_farm.address}')
    print(f'Dapp Token Deployed at {dapp_token.address}')
    tx = dapp_token.transfer(
        token_farm.address, dapp_token.totalSupply() - KEPT_BALANCE, {"from": account}
    )
    tx.wait(1)
    # dapp_token, weth_token, fau_token/dai
    #weth_token = get_contract("weth_token")
    weth_token  = config["networks"][network.show_active()]["weth_token"]
    fau_token = config["networks"][network.show_active()]["fau_token"]
    # dict_of_allowed_tokens = {
    #     dapp_token: get_contract("dai_usd_price_feed"),
    #     fau_token: get_contract("dai_usd_price_feed"),
    #     weth_token: get_contract("eth_usd_price_feed"),
    # }
    dict_of_allowed_tokens = {
        dapp_token: config["networks"][network.show_active()]["dai_usd_price_feed"],
        fau_token: config["networks"][network.show_active()]["dai_usd_price_feed"],
        weth_token: config["networks"][network.show_active()]["eth_usd_price_feed"]
    }

    add_allowed_tokens(token_farm, dict_of_allowed_tokens, account)
    if front_end_update:
        update_front_end()
    return token_farm, dapp_token

    
def add_allowed_tokens(token_farm, dict_of_allowed_tokens, account):
    for token in dict_of_allowed_tokens:
        print(token)
        add_tx = token_farm.addAllowedTokens(token, {"from": account})
        add_tx.wait(1)
        set_tx = token_farm.setPriceFeedContract(
            token, dict_of_allowed_tokens[token], {"from": account}
        )
        set_tx.wait(1)
    return token_farm

def update_front_end():
    # Send the build folder
    copy_folders_to_front_end("../build", "../front_end/src/chain-info")
    # Sending the front end our config in JSON format
    with open("../brownie-config.yaml", "r") as brownie_config:
        config_dict = yaml.load(brownie_config, Loader=yaml.FullLoader)
        with open("../front_end/src/brownie-config.json", "w") as brownie_config_json:
            json.dump(config_dict, brownie_config_json)
    print("Front end updated!")

def copy_folders_to_front_end(src, dest):
    if os.path.exists(dest):
        print(f'{dest} Exsist!, Deleting...')
        shutil.rmtree(dest)
    shutil.copytree(src, dest)

def main():
    deploy_token_farm_and_dapp_token(front_end_update=True)