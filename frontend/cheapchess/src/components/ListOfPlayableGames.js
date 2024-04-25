// import { useState, useEffect, useContext } from "react";
import { useState } from "react";
// import axios from "axios";
// import AuthContext from "../contexts/AuthProvider";
// import constants from "../constants";
import { Button, Offcanvas } from "react-bootstrap";

const ListOfPlayableGames = ({ parentState }) => {
    // const [listOfGames, setListOfGames] = useState([])
    const [show, setShow] = useState(false)
    // const { auth } = useContext(AuthContext)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    // useEffect(() => {
    //     if (auth.status === constants.STATUS_AUTHENTICATED) {
    //         // fetchPlayableGames()
    //     }
    // }, [auth.status]);

    // const fetchPlayableGames = async () => {
    //     try {
    //         const response = await axios.get('/games/playable/', {
    //             withCredentials: true
    //         })
    //         const sortedGames = response.data.sort((a, b) => a.id - b.id);
    //         setListOfGames(sortedGames)
    //     } catch (error) {
    //         console.error('Failed to fetch playable games:', error)
    //     }
    // }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Show Playable Games
            </Button>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>List of Playable Games</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ul>
                        {/* {listOfGames.map(game => ( */}
                        {parentState?.playableGames?.map(game => (
                            <li key={game.id}>
                                Game #{game.id} <Button variant="primary" onClick={() => console.log("Joining game #", game.id)}>
                                    Join
                                </Button> <br />
                                {game.player1?.email} vs {game.player2?.email || 'Waiting for player to join'}
                            </li>
                        ))}
                    </ul>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default ListOfPlayableGames