import * as forge from 'node-forge'
import { PKCS88Bags } from './types';
import { Certificate } from 'crypto';
export function getPCK12CertInfo(certificate: ArrayBuffer, certKey: string) {
    const der = forge.util.decode64(
        forge.util.binary.base64.encode(
            new Uint8Array(certificate)
        )
    );

    const ansi = forge.asn1.fromDer(der)
    const p12 = forge.pkcs12.pkcs12FromAsn1(ansi, certKey)
    const pkcs8Bags: PKCS88Bags = p12.getBags({ bagType: forge.pki.oids.pkcs8ShroudedKeyBag })
    const data = p12.getBags({ bagType: forge.pki.oids.certBag })
    if (!data || !data?.[forge.pki.oids.certBag]?.[0])
        throw new Error('Unable to parse certificate. Incorrect Password?')

    //return data[forge.pki.oids.certBag]
    const certBags = data[forge.pki.oids.certBag] ?? []
    const friendlyName = certBags[1].attributes.friendlyName[0]
    let certBag = getCertificate(certBags)
    const cert = certBag.cert
    let pckcs8;
    let issuerName = getIssuerName(certBag)
    pckcs8 = getKey(pkcs8Bags, friendlyName)



}

function getIssuerName(cert: forge.pkcs12.Bag) {

    const issuerTributes = cert.cert?.issuer.attributes;
    let issuerName = issuerTributes?.reverse()
        .map(attr => {
            return `${attr.shortName}=${attr.value}`
        }).join(', ')
    return issuerName;
}

function getKey(pkcs8Bags: PKCS88Bags, friendlyName: string) {
    let pckcs8;

    if (friendlyName.includes('BANCO CENTRAL')) {
        let index = pkcs8Bags[forge.pki.oids.pckcs8ShorudedkeyBag]?.findIndex(
            (key) => key.attributes.friendlyName[0].includes('Signing Key')
        )
        //@ts-ignore
        pckcs8 = pkcs8Bags[forge.pki.oids.pckcs8ShorudedkeyBag][i]


    }
    if (friendlyName.includes('SECURITY DATA')) {
        //@ts-ignore
        pckcs8 = pckcs8Bags[forge.pki.oids.pckcs8ShorudedkeyBag][0];
    }
    return pckcs8;

}

function getCertificate(certBag: forge.pkcs12.Bag[]){
    let crt = certBag.reduce((prev: forge.pkcs12.Bag, current: forge.pkcs12.Bag) => {
        //@ts-ignore
        return current.cert?.extensions.length > prev.cert?.extensions.length ?
            current : prev;
    })
    return crt
}