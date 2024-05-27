/* eslint-disable no-console */
import { createHelia } from 'helia';
import { multiaddr } from '@multiformats/multiaddr';
import { createLibp2p } from 'libp2p';
import { Libp2pOptions } from './config/libp2p.js';
import getNodeOperatorAddress from './getNodeAddrs.js'
import * as dotenv from 'dotenv';
dotenv.config();

/* ToDO
 [x] test conecting between nodes
 [x] Make libp2p por static
 [ ] make peerID static or import
 [ ] setup dns resolver
 [ ] Ethers-js import wallet from .env
 [ ] Test with contracts
 [ ] restructure code and create CLI
 [ ] Daemon Setup
*/

async function main() {
    
    const providerUrl = process.env.PROVIDER_URL;

    if(providerUrl){
        try {
            const nodeAddress: string = await getNodeOperatorAddress(providerUrl);
            console.log('Greeting from contract:', nodeAddress);
        } catch (error) {
            console.error('Error:', error);
        }
    } else {
        console.error("couldn't get provider from the .env")
    }

    // IPFS
    const libp2p = await createLibp2p(Libp2pOptions);
    const ipfs = await createHelia({ libp2p });
    console.info('Helia is running');
    console.info('PeerId:', ipfs.libp2p.peerId.toString())

    const addr = ipfs.libp2p.getMultiaddrs()
    console.log(addr)


    // TODO dial dns peerIDs
    //let node0 = "/dns4/ipfs.decentralizedscience.org/tcp/4004/ws/p2p/12D3KooWQzickgUJ1N9dNZMJpNnFUCHmhndTVgexXnt6dQhPFcEE";
    //let node0 = "/dnsaddr/ipfs.decentralizedscience.org/tcp/4004/ws/p2p/12D3KooWQzickgUJ1N9dNZMJpNnFUCHmhndTVgexXnt6dQhPFcEE";
    //let node0 = "/dns4/ipfs.decentralizedscience.org/tcp/443/ws/p2p/12D3KooWQzickgUJ1N9dNZMJpNnFUCHmhndTVgexXnt6dQhPFcEE";
    //let node0 = "/dnsaddr/ipfs.decentralizedscience.org/tcp/443/wss/p2p/12D3KooWQzickgUJ1N9dNZMJpNnFUCHmhndTVgexXnt6dQhPFcEE";
    //let node0 = "/dnsaddr/ipfs.decentralizedscience.org/p2p/12D3KooWQzickgUJ1N9dNZMJpNnFUCHmhndTVgexXnt6dQhPFcEE"
    
    //let node0 = "/dns4/ipfs.decentralizedscience.org/tcp/443/wss/p2p/";
    
    // local test working
    let node1 = multiaddr("/ip4/10.224.190.150/tcp/8080"); 
    let node2 = multiaddr("/ip4/10.224.190.9/tcp/8080"); 
    let peers = ipfs.libp2p.getPeers()

    while(peers.length < 1) {
      peers = ipfs.libp2p.getPeers()
      try {
        await ipfs.libp2p.dial(node1);
        await ipfs.libp2p.dial(node2);
      } catch (error) {
	  console.log(error);
      }
    }

    console.log(peers)

    //const peer = await ipfs.libp2p.peerStore.get(ipfs.libp2p.dial)
    //const peer = await ipfs.libp2p.peerStore.get(ipfs.libp2p.dial)
    //await ipfs.libp2p.dial(node0);
    //await ipfs.libp2p.hangUp(node0_ma)
    //await ipfs.libp2p.hangUp(node1_ma)
    //await ipfs.stop()
}

main();

