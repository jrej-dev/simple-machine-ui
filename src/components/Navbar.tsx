import styled from "styled-components";

const Container = styled("div")`
    width: 100vw;
    height: auto;
    background-color: #af48ca;

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    position: relative;
`

const Title = styled("h1")`
    margin: 0;
    white-space: nowrap;
    font-family: 'Bungee', cursive;
`

const Link = styled("a")`
    font-size: 1.5rem;
    margin: 1rem;
    cursor: pointer;
    color: initial;
    text-decoration: none;

    position: absolute;
    right: 5%;

    @media (max-width: 700px) {
        position: initial;
    }
`

const Navbar = () => {
    return (
        <Container>
            <Title>
                Titan Dogs
            </Title>
            <Link href="/#roadmap">
                Roadmap
            </Link>
        </Container>
    )
}

export default Navbar;