import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
function App() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  useEffect(() => {
    setSocket(io('http://localhost:4000'));
  }, []);
  useEffect(() => {
    if (!socket) return;
    socket.on('message-from-server', (data) => {
      setChat((prevChat) => [...prevChat, data.message]);
    });
  }, [socket]);
  const handleForm = (e) => {
    e.preventDefault();
    socket.emit('send-message', { message });
    setMessage('');
  };
  return (
    <div>
      <Container>
        <Box sx={{ marginBottom: 5 }}>
          {chat.map((message) => {
            return <Typography key={message}>{message}</Typography>;
          })}
        </Box>
        <Box component="form" onSubmit={handleForm}>
          <OutlinedInput
            label="Write your message"
            size="small"
            value={message}
            placeholder="Write your message"
            onChange={(e) => setMessage(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton type="submit" edge="end">
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            }
          />
          <Button variant="text" type="submit">
            Send
          </Button>
        </Box>
      </Container>
    </div>
  );
}

export default App;
