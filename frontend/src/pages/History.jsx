import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import { IconButton } from '@mui/material';

export default function History() {
  const { fetchHistory } = useContext(AuthContext);
  const [meetings, setMeetings] = useState([]);
  const routeTo = useNavigate();

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        const history = await fetchHistory();
        
        setMeetings(history.meetings || []);

      } catch {
        setMeetings([]);
      }
    };

    fetchHistoryData();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div>
      <IconButton onClick={() => routeTo("/home")}>
        <HomeIcon />
      </IconButton>

      {Array.isArray(meetings) && meetings.length !== 0 ? (
        meetings.map((e, i) => (
          <Card key={i} variant="outlined" sx={{ margin: 2 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Code: {e.meetingCode}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Date: {formatDate(e.createdAt)}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography sx={{ textAlign: "center", marginTop: 4, color: "#888" }}>
          No History Found
        </Typography>
      )}
    </div>
  );
}
