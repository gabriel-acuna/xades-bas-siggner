import * as forge from 'node-forge'
declare interface PKCS88Bags {
    [key: string]: forge.pkcs12.Bag[] | undefined;
    localKeyId?: forge.pkcs12.Bag[] | undefined;
    friendlyName?: forge.pkcs12.Bag[] | undefined;
}