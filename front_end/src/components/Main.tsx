import { useEthers } from "@usedapp/core";
import helperConfig from "../helper-config.json";
import networkMapping from "../chain-info/deployments/map.json";
import { constants } from "ethers";
import brownieConfig from "../brownie-config.json";
import dapp from "../dapp.png";
import eth from "../eth.png";
import dai from "../dai.png";
import { YourWallet } from "./yourWallet";

export type Token = {
  image: string;
  address: string;
  name: string;
};

export const Main = () => {
  const { chainId, error, active } = useEthers();
  console.log(chainId);
  console.log(active);
  const networkName = chainId ? helperConfig[chainId] : "dev";
  console.log(networkName);

  const DappTokenAddress = chainId
    ? networkMapping[String(chainId)]["DappToken"][0]
    : constants.AddressZero;
  console.log(DappTokenAddress);

  const wethTokenAddress = chainId
    ? brownieConfig["networks"][String(networkName).toLowerCase()]["weth_token"]
    : constants.AddressZero;
  console.log(wethTokenAddress);

  const fauTokenAddress = chainId
    ? brownieConfig["networks"][networkName]["fau_token"]
    : constants.AddressZero; //
  console.log(fauTokenAddress);

  // const supportedTokens: Array<Token> = [
  //   {
  //     image: dapp,
  //     address: DappTokenAddress,
  //     name: "DAPP",
  //   },
  //   {
  //     image: eth,
  //     address: wethTokenAddress,
  //     name: "WETH",
  //   },
  //   {
  //     image: dai,
  //     address: fauTokenAddress,
  //     name: "DAI",
  //   },
  // ];

  // return <YourWallet supportedTokens={supportedTokens} />;
  return <div>Hello1</div>;
};
