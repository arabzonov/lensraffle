import { BigNumber, utils } from "ethers";

export default {  
    addressShort(tokenAddress) {
      if (tokenAddress) return tokenAddress.replace(tokenAddress.substring(6, 38), "...")
      return '...'      
    },

    txHashShort(txHash) {
      if (txHash) return txHash.replace(txHash.substring(8, 60), ".....")
      return '.....'
    },

    formatWalletBalance(val) {
      if (!val) return '--'
      return BigNumber.from(val).toString();      
    },

    toUpperCase(val) {
      return val.toUpperCase();      
    },
    
    formatBalance(val, decimals = 18, fixed = 4) {
      if (val === null || val === undefined) return '--'
      if (typeof val === 'string') return val

      if (!BigNumber.isBigNumber(val)) return '--'
      if (BigNumber.isBigNumber(val)) {
        let n = parseFloat(utils.formatUnits(val, decimals)).toFixed(fixed)
        if (n.match(/\./)) n = n.replace(/\.?0+$/, '');        
        return n //.replace(/\.0+$/,'');
      }
      return '0.0000'
    },

    weiToBn(val) {
      if (val === null || val === undefined) return null
      if (typeof val === 'string') return BigNumber.from(val)
      return null
    },

    anyBNValue(val) {
      if (val === null || val === undefined) return '--'
      if (typeof val === 'string') return val
      if (!BigNumber.isBigNumber(val)) return '--'
      return val.toString();
    },

    numberWithCommas(x) {
      if (x === undefined || x === null || x === '--') return '--'
      if (x === '--' || x === 'ERROR') return x
      var parts = x.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    },

    abbrNum(number, decPlaces = 0) {
      if (number === undefined || number === null) return '--'
      if (number === '--' || number === 'ERROR') return number
      // 2 decimal places => 100, 3 => 1000, etc
      decPlaces = Math.pow(10,decPlaces);
      // Enumerate number abbreviations
      var abbrev = [ "k", "m", "b", "t" ];
      // Go through the array backwards, so we do the largest first
      for (var i=abbrev.length-1; i>=0; i--) {
        // Convert array index to "1000", "1000000", etc
        var size = Math.pow(10,(i+1)*3);
        // If the number is bigger or equal do the abbreviation
        if(size <= number) {
         // Here, we multiply by decPlaces, round, and then divide by decPlaces.
         // This gives us nice rounding to a particular decimal place.
         number = Math.round(number*decPlaces/size)/decPlaces;
         // Handle special case where we round up to the next abbreviation
         if((number == 1000) && (i < abbrev.length - 1)) {
          number = 1;
          i++;
         }
         // Add the letter for the abbreviation
         number += abbrev[i];
         // We are done... stop
         break;
        }
      }
      return number;
    },  
}

