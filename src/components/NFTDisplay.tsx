import * as anchor from '@project-serum/anchor';
import { PublicKey } from "@solana/web3.js";
import styled from "styled-components";
import { useEffect, useState, useMemo } from "react"
import { useWallet } from "@solana/wallet-adapter-react";
import {
    WalletModalProvider,
    WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";

const Container = styled("div")`
    width: 100%;
    min-height: 200px;
    padding: 4rem 0;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const ImageContainer = styled("div")`
    width: 100%;
    margin-top: 3rem;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`

const NFTImage = styled("img")`
    width: 200px;
    height: auto;
    margin: 1rem;
    border-radius: 10%;
`

const NFTDisplay = () => {
    const wallet = useWallet();
    const [metaData, setMetaData] = useState<any[] | []>([]);
    const [isFetching, setIsFetching] = useState<boolean>(false);

    const anchorWallet = useMemo(() => {
        if (
            !wallet ||
            !wallet.publicKey ||
            !wallet.signAllTransactions ||
            !wallet.signTransaction
        ) {
            return;
        }

        return {
            publicKey: wallet.publicKey,
            signAllTransactions: wallet.signAllTransactions,
            signTransaction: wallet.signTransaction,
        } as anchor.Wallet;
    }, [wallet]);

    const getTokens = (anchorWallet: { publicKey: PublicKey }) => {
        if (process.env.REACT_APP_BACKEND_URL) {
            let walletPubkey: string = anchorWallet.publicKey?.toString()

            const options: RequestInit = {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    pubKey: walletPubkey,
                }),
            }

            console.log(walletPubkey);

            let status: number;
            fetch(`${process.env.REACT_APP_BACKEND_URL}/getTokens`, options)
                .then(res => {
                    console.log(res);
                    status = res.status;
                    return res.json();
                })
                .then(res => {
                    if (status === 200) {
                        console.log(res.data);
                        if (res && res.pubKey === walletPubkey) {
                            console.log(res.data);
                            setMetaData(res.data);
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    useEffect(() => {
        if (anchorWallet) {
            if (!isFetching) {
                setIsFetching(true);
                getTokens(anchorWallet);
            }
        }
    }, [anchorWallet, isFetching])

    return (
        <Container id="nftdisplay">
            <h1 style={{ marginBottom: "50px" }}>
                NFT Display
            </h1>
            <div>
                <WalletModalProvider>
                    <WalletMultiButton style={{ "backgroundColor": "#a855f7" }} />
                </WalletModalProvider>
            </div>
            <ImageContainer>
                {
                    metaData?.length > 0 &&
                    metaData.map((data: any, index: number) => (
                        <NFTImage
                            key={`${data.image}-${index}`} src={`${data.image}`}
                            alt={`${index}`}
                        />
                    ))
                }
            </ImageContainer>
        </Container>
    )
}

export default NFTDisplay;