function checkLogo(name, symbol){
    switch (name) {
        case "polkadot":
            return 'https://cryptologos.cc/logos/polkadot-new-dot-logo.png?v=014';
            break;
        case "terra":
            return 'https://cryptologos.cc/logos/terra-luna-luna-logo.png?v=014';
            break;
        case "terra":
            return 'https://cryptologos.cc/logos/terra-luna-luna-logo.png?v=014';
            break;
        case "crypto.com-coin":
            return 'https://cryptologos.cc/logos/crypto-com-mco-logo.png?v=014';
            break;
        case "terrausd":
            return 'https://www.pngall.com/wp-content/uploads/10/TerraUSD-Crypto-Logo-PNG-Pic.png';
            break;
        case "elrond":
            return 'https://cryptologos.cc/logos/elrond-egld-egld-logo.svg?v=014';
            break;
        case "gala":
            return 'https://www.freelogovectors.net/wp-content/uploads/2021/12/gala-games-logo-freelogovectors.net_.png';
            break;
        case "kadena":
            return "https://assets.coingecko.com/coins/images/3693/small/djLWD6mR_400x400.jpg?1591080616"
            break;
        case "symbol":
            return "https://s2.coinmarketcap.com/static/img/coins/64x64/8677.png"
            break;
        case "1inch-network":
            return "https://cryptologos.cc/logos/1inch-1inch-logo.svg?v=014"
            break;
        case 'wemix':
            return "https://s2.coinmarketcap.com/static/img/coins/64x64/7548.png"
            break;
        case "mina":
            return "https://s2.coinmarketcap.com/static/img/coins/64x64/8646.png"
            break;
        case "metahero":
            return "https://s2.coinmarketcap.com/static/img/coins/64x64/10778.png"
            break;
        default:
            return `https://cryptologos.cc/logos/${name}-${symbol}-logo.svg?v=014`
    }
}