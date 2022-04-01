import styled from "styled-components";

const Container = styled("div")`
    width: 100vw;
    height: 100vh;
    margin-top: 100px;
    padding: 100px 20px;
    background-color: white;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const ListItem = styled("li")`
    margin: 10px;
`

const Roadmap = () => {
    return (
        <Container id="roadmap">
            <h1>Roadmap</h1>
            <h1>Q1 2022</h1>
            <ul style={{padding: "0 20%"}}>
                <ListItem>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. At accusantium eaque assumenda officia ad libero corrupti, maiores error mollitia, debitis, maxime atque totam quos velit esse. Saepe dolor dolores labore.
                </ListItem>
                <ListItem>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. At accusantium eaque assumenda officia ad libero corrupti, maiores error mollitia, debitis, maxime atque totam quos velit esse. Saepe dolor dolores labore.
                </ListItem>

            </ul>
        </Container>
    )
}

export default Roadmap;