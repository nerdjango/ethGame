web3 = new Web3(web3.currentProvider);
ethereum.request({ method: 'eth_requestAccounts' })

let token = new web3.eth.Contract(abi.token, "0xdE998044c76eEcb1f89F797621d96598C71cF0D0");
let marketplace = new web3.eth.Contract(abi.market, "0xD09Cc5cf35CaA5a6a6Da1B644B15fFC50bCA67cF");

function getUserItems(callback) {
    web3.eth.getAccounts().then(accountArray => {
        let account = accountArray[0];

        let tokenPromise1 = token.methods.balanceOf(account, 1).call();
        let tokenPromise2 = token.methods.balanceOf(account, 2).call();
        let tokenPromise3 = token.methods.balanceOf(account, 3).call();

        Promise.all([tokenPromise1, tokenPromise2, tokenPromise3]).then(values => {
            console.log(values);
            let talisman = values[0]
            let boots = values[1]
            let cape = values[2]
            if (values[0] > 0)
                COIN_GENERATION_INTERVAL = COIN_GENERATION_INTERVAL * Math.pow(0.75, talisman)
            if (values[1] > 0)
                PLAYER_SPEED = PLAYER_SPEED * Math.pow(1.3, boots)
            if (values[2] > 0)
                GAME_SECOND = GAME_SECOND * Math.pow(1.5, cape)

            callback()
        })
    });
}

function buy(id) {

    web3.eth.getAccounts().then(accountArray => {
        let options = {
            from: accountArray[0],
            value: 0
        };
        if (id == 1)
            options.value = 100000000000000;
        else if (id == 2)
            options.value = 200000000000000;
        else if (id == 3)
            options.value = 300000000000000;

        marketplace.methods.buyToken(id).send(options)
            .on('receipt', receipt => {
                alert("Transaction Complete");
            })
    });

}