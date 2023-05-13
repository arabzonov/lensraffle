import { create } from 'ipfs-http-client';

const ipfs = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: `Basic ${window.btoa(`${INFURA_PR_ID}:${INFURA_SERCET}`)}`,
    },    
});

export const uploadToIPFS = async (data) => {    
    const result = await ipfs.add(JSON.stringify(data));  
    ////console.log(result)
    return result.cid.toV1().toString() 
};

export const uploadFileToIPFS = async (file) => {    
    const result = await ipfs.add(file); 
    ////console.log(result.cid.toV1().toString())
    return result.cid.toV1().toString()
};

export const ipfsUrl = (url) => { 
    if (url && url.includes('ipfs')) {
        return url.replace('ipfs://', IPFS_URL)
    }
    return url
}
