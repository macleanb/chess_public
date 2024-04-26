import { useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";

const ListOfPlayableGames = ({ parentState }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                        {parentState?.playableGames?.sort((a, b) => a.id - b.id).map(game => (
                            <li key={game.id}>
                                Game #{game.id} 
                                <Button
                                    variant="primary"
                                    onClick={
                                        (e) => {
                                            handleClose();
                                            parentState.handleJoinGameClicked(e, game);
                                        }
                                    }
                                >
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