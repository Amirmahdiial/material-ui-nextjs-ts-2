"use client";
import { Box, Container, Typography, CardMedia, Button } from "@mui/material";
import React from "react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";
import { ISeat } from "@/lib/types/types";
import { useState } from "react";
import Seat from "@/components/seat";
import { Search } from "@mui/icons-material";

interface SeatsInfoResponse {
  response: string;
  data: ISeat[];
}
interface MovieInfoResponse {
  response: string;
  data: Movie;
}
interface Movie {
  actorPhoto: string;
  coverPhoto: string;
  description: string;
  director: string;
  genre: string;
  id: number;
  name: string;
  rating: string;
  thumbnail: string;
}
function page() {
  const params = useParams<{ movieId: string; showTimeId: string }>();

  const [seats, setSeats] = useState<ISeat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<ISeat[]>([]);
  const [movie, setMovie] = useState<Movie>();

  const submitSeats = async () => {
    if (!movie || !params.showTimeId) {
      console.log("اطلاعات کافی برای ارسال درخواست وجود ندارد.");
      return;
    }
    const selectedSeatIds = selectedSeats.map((seat) => seat.id);
    const response = await axios.post("/api/book-seat", {
      userId: 1,
      movieId: movie?.id,
      showTimeId: Number(params.showTimeId),
      seats: selectedSeatIds,
    });
    location.reload();
  };

  function addSeatToSelectedSeats(seat: ISeat) {
    setSelectedSeats([...selectedSeats, seat]);
  }

  function removeSeatFromSelectedSeats(colNumber: number, rowNumber: number) {
    setSelectedSeats(
      selectedSeats.filter((s) => {
        return s.column !== colNumber || s.row !== rowNumber;
      })
    );
  }

  useEffect(() => {
    async function getMovieInfo() {
      const res = await axios.get<MovieInfoResponse>(
        `/api/movie/${params.movieId}/`
      );
      setMovie(res.data.data);
    }
    async function getSeatInfo() {
      const res = await axios.get<ISeat[]>(
        `/api/seat?movieId=${params.movieId}&showTimeId=${params.showTimeId}`
      );
      setSeats(res.data);
    }
    getSeatInfo();
    getMovieInfo();
  }, []);

  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css"
        rel="stylesheet"
        type="text/css"
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#393a47",
          fontFamily: "Vazirmatn",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            sx={{
              padding: "20px",
              color: "white",
              fontFamily: "Vazirmatn",
              paddingRight: "5px",
              cursor: "pointer",
            }}
          >
            پروفایل
          </Typography>
          <CardMedia
            component="img"
            sx={{ height: "40px" }}
            image="/profile-mine.svg"
          />
        </Box>
        <Typography
          sx={{
            color: "white",
            alignContent: "center",
            padding: "10px",
            backgroundColor: "#2b2b36",
            borderRadius: "10px",
            height: "40px",
            fontFamily: "Vazirmatn",
          }}
        >
          سانس
        </Typography>
        <Button
          size="large"
          variant="text"
          sx={{ color: "white", marginRight: "20px", fontFamily: "Vazirmatn" }}
          font-size="16px"
        >
          سینما تیکت
        </Button>
      </Box>

      <Container
        maxWidth="xl"
        sx={{
          fontFamily: "Vazirmatn",
          backgroundColor: "#393a47",
          borderTop: "1px solid #3e3f4d",
        }}
      >
        <Box
          maxWidth="lg"
          sx={{ margin: "auto", height: "150vh", textAlign: "center" }}
        >
          <Box
            sx={{
              marginTop: "100px",
              maxWidth: "700px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Vazirmatn",
                padding: "5px",
                border: "1px solid white",
                borderRadius: "10px",
                color: "white",
              }}
            >
              صحنه
            </Typography>
            <Box
              sx={{
                paddingTop: "10px",
                display: "grid",
                gridTemplateColumns: "repeat(12, 1fr)",
                gap: "20px",
                placeItems: "center",
              }}
            >
              {seats.map((seat) => (
                <Seat
                  id={seat.id}
                  status={seat.status}
                  price={seat.price}
                  row={seat.row}
                  column={seat.column}
                  addSeatToSelectedSeats={addSeatToSelectedSeats}
                  removeSeatFromSelectedSeats={removeSeatFromSelectedSeats}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Container>

      <Box sx={{ position: "fixed", bottom: "0", backgroundColor: "#2a2a35" }}>
        <Box
          sx={{
            display: "flex",
            width: "100VW",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#2a2a35",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Vazirmatn",
              padding: "20px",
              paddingLeft: "90px",
              color: "white",
            }}
          >
            ظرفیت سالن:{seats.length}
          </Typography>
          <Box
            sx={{ display: "flex", alignItems: "center", marginRight: "100px" }}
          >
            <Typography
              sx={{
                color: "white",
                padding: "5px",
                marginLeft: "20px",
                fontFamily: "Vazirmatn",
              }}
            >
              انتخاب شما
            </Typography>
            <Box
              sx={{
                backgroundColor: "red",
                height: "25px",
                width: "25px",
                borderRadius: "100%",
                marginRight: "20px",
              }}
            ></Box>
            <Typography
              sx={{
                color: "white",
                padding: "5px",
                marginLeft: "20px",
                fontFamily: "Vazirmatn",
              }}
            >
              فروخته شده
            </Typography>
            <Box
              sx={{
                backgroundColor: "black",
                height: "25px",
                width: "25px",
                borderRadius: "100%",
                marginRight: "20px",
              }}
            ></Box>

            <Typography
              sx={{
                color: "white",
                padding: "5px",
                marginLeft: "20px",
                fontFamily: "Vazirmatn",
              }}
            >
              صندلی خالی
            </Typography>
            <Box
              sx={{
                backgroundColor: "#bcc7d6",
                height: "25px",
                width: "25px",
                borderRadius: "100%",
                marginRight: "20px",
              }}
            ></Box>
          </Box>
        </Box>
        <Box
          sx={{
            backgroundColor: "#393a47",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "Vazirmatn",
          }}
        >
          <Button
            sx={{
              backgroundColor: "#aaaaaa",
              color: "#ffffff",
              padding: "10px",
              margin: "40px",
              fontSize: "18px",
            }}
            onClick={submitSeats}
          >
            ثبت صندلی
          </Button>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent:"flex-start", gap: "20px", flexWrap:"wrap" }}>
            {selectedSeats.map((sSeat) => (
              <Box sx={{ backgroundColor:"#4d4e5b", padding:"10px", borderRadius:"10px"}}>
                <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                صندلی:{sSeat.column} . ردیف:{sSeat.row}
                </Box>
                <Box sx={{textAlign:"center"}}>
                قیمت:{sSeat.price}
                </Box>
              </Box>
              
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              fontFamily: "Vazirmatn",
              width: "300px",
              borderLeft: "2px dashed white",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Vazirmatn",
                color: "white",
                paddingLeft: "20px",
              }}
            >
              {movie?.name}
            </Typography>
            <CardMedia
              sx={{
                height: "150px",
                width: "170px",
                margin: "10px",
                paddingRight: "50px",
              }}
              component="img"
              image={movie?.thumbnail}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default page;
