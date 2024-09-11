import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const GameOverModal = ({ score, onRestart, open }) => {
    return (
        <Modal open={open}>
            <Box
                style={{
                    backgroundColor: 'rgba(247, 250, 255, 0.8)',
                    color: 'black',
                    textAlign: 'center',
                    width: '710px',
                    height: '500px',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    border: '2px solid #000',
                    boxShadow: 24,
                    padding: '20px'
                }}
            >
                <h1 style={{ fontWeight: 'bolder', fontSize: '48px' }}>
                    Game Over<br /> 😞
                </h1><br/>
                <p style={{ fontSize: '36px' }}>
                    Try harder next time.<br />You earned {score} points
                </p><br/><br/><br/>
                <ButtonGroup>
                    <Button
                        style={{
                            background: 'blue',
                            color: 'white',
                            marginRight: '20px',
                            fontSize: '24px',
                            border: 'none',
                            borderRadius: '24px'
                        }}
                        href='/'
                    >
                        Home
                    </Button>
                    <Button
                        style={{
                            background: 'red',
                            color: 'white',
                            fontSize: '24px',
                            border: 'none',
                            borderRadius: '24px'
                        }}
                        onClick={onRestart}
                    >
                        Restart
                    </Button>
                </ButtonGroup>
            </Box>
        </Modal>
    );
};

export default GameOverModal;
