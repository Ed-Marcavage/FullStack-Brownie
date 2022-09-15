import { useEthers, useContractFunction } from "@usedapp/core";
import TokenFarm from "../chain-info/contracts/TokenFarm.json";
import networkMapping from "../chain-info/deployments/map.json";
import { constants, utils } from "ethers";
import { Contract } from "@ethersproject/contracts";
import ERC20 from "../chain-info/contracts/MockERC20.json";
import { useEffect, useState } from "react";

export const useStakeTokens = (tokenAddress: string) => {
  const { chainId } = useEthers();
  const { abi } = TokenFarm;
  const tokenFarmAddress = chainId
    ? networkMapping[String(chainId)]["TokenFarm"][0]
    : constants.AddressZero;
  const tokenFarmInterface = new utils.Interface(abi);
  const tokenFarmContract = new Contract(tokenFarmAddress, tokenFarmInterface);

  const erc20ABI = ERC20.abi;
  const erc20Interface = new utils.Interface(erc20ABI);
  const erc20Contract = new Contract(tokenAddress, erc20Interface);

  const { send: approveErc20Send, state: approveAndStakeErc20State } =
    useContractFunction(erc20Contract, "approve", {
      transactionName: "Approve ERC20 transfer",
    });

  const [amountToStake, setAmountToStake] = useState("0");

  const approveAndStake = (amount: string) => {
    setAmountToStake(amount);
    return approveErc20Send(tokenFarmAddress, amount);
  };
  return { approveAndStake };
};
