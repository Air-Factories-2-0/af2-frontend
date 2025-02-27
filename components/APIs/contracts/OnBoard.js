import Web3Provider from './web3provider';
import OnBoarding from '../../../config/ABIs/OnBoarding.json';

export default class OnBoardin{
    constructor(){
        this.provider = new Web3Provider(window.ethereum)
        this.web3 = this.provider.web3
        this.utils = this.web3.utils

        //let ABIContract = JSON.parse(User);
        let ABIScheduling = OnBoarding.abi;
        
        
        //*Prendi automaticamente l'ultimo address del contratto - SERVE SOLO NEI TEST
        let ContractNetworks = OnBoarding.networks
        let ContractAddress = ContractNetworks[Object.keys(ContractNetworks)[Object.keys(ContractNetworks).length - 1]].address
        
        
        console.log(`Indirizzo Contratto----- `+ ContractAddress)
        //*Stampalo per check
        this.contract = new this.web3.eth.Contract(ABIScheduling, "0xcA3105f915F5ABe405f35560dF5ddd5f6F379b99");
    }
    async registerPrinter(printerAddress,printerName,soluble,food){
        let account = await this.provider.checkIfWalletIsConnected();
                await this.contract.methods.addPrinter(
                    printerAddress,                     //Indirizzo Stampante
                    this.utils.asciiToHex(printerName),      //Nome
                    [0,1],                              //Array of supportedMaterial - 1= 2= 3=
                    [0,1,2],                            //Array of supportedNozzles
                    2,                                  //Nozzle mounted 
                    100,                                //Max print temperature
                    100,                                //Max bed temperature
                    40,                                 //Volume L
                    soluble,                              //soluble
                    food,                                //food safety
                    Date.now()
                ).send({from:account}) //Non inserire i gas nell frontend ma sì nel mobile

    }
    async AddMats(){
        let account = await this.provider.checkIfWalletIsConnected();
        await this.contract.methods.addMaterials(
            this.utils.asciiToHex("prova1as"),     //Nome
            1,                              //Tipo di materiale | 0 - ABS , 1 - PLA, 2 - PETG
            1,                              //Colore
            5,                              //Quantità KG
            100,                            //Printer temp
            100,                            //Printer bed
            Date.now()
        ).send({from:account})
    }
    async printMats(){
        let account = await this.provider.checkIfWalletIsConnected();
        return await this.contract.methods.getMaterials().call({from:account})
    }
}