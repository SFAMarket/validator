/* eslint-disable no-console */
import { createHelia } from 'helia';
import { multiaddr } from '@multiformats/multiaddr';
import { createLibp2p } from 'libp2p';
import { Libp2pOptions } from './config/libp2p.js';
import getNodeOperatorAddress from './getNodeAddrs.js'
import * as dotenv from 'dotenv';
dotenv.config();


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

    const peers = ipfs.libp2p.getPeers()

    console.log(peers)


    // TODO dial libp2p peerIDs
    //let node0 = "/dns4/ipfs.decentralizedscience.org/tcp/4004/ws/p2p/12D3KooWQzickgUJ1N9dNZMJpNnFUCHmhndTVgexXnt6dQhPFcEE";
    //let node0 = "/dnsaddr/ipfs.decentralizedscience.org/tcp/4004/ws/p2p/12D3KooWQzickgUJ1N9dNZMJpNnFUCHmhndTVgexXnt6dQhPFcEE";
    //let node0 = "/dns4/ipfs.decentralizedscience.org/tcp/443/ws/p2p/12D3KooWQzickgUJ1N9dNZMJpNnFUCHmhndTVgexXnt6dQhPFcEE";
    //let node0 = "/dnsaddr/ipfs.decentralizedscience.org/tcp/443/wss/p2p/12D3KooWQzickgUJ1N9dNZMJpNnFUCHmhndTVgexXnt6dQhPFcEE";
    //let node0 = "/dnsaddr/ipfs.decentralizedscience.org/p2p/12D3KooWQzickgUJ1N9dNZMJpNnFUCHmhndTVgexXnt6dQhPFcEE"
    //
    //await ipfs.libp2p.dial(multiaddr(node0))
    //let node0 = "/dns4/ipfs.decentralizedscience.org/tcp/443/wss/p2p/";
    //const addr = ipfs1.libp2p.getMultiaddrs()
    //console.log(peer)

    //const peer = await ipfs.libp2p.peerStore.get(ipfs.libp2p.dial)
    //const peer = await ipfs.libp2p.peerStore.get(ipfs.libp2p.dial)
    //await ipfs.libp2p.dial(node0);
    //await ipfs.libp2p.hangUp(node0_ma)
    //await ipfs.libp2p.hangUp(node1_ma)
    await ipfs.stop()
}

main();

