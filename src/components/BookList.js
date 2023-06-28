import React, { useState } from "react";
import "../styles/BookList.css";
import { Link } from "react-router-dom";
import * as api from "../services/api";
import { Button, Box, Modal, IconButton } from "@mui/material";
import ClampLines from "react-clamp-lines";
import { lightBlue } from "@mui/material/colors";

import { Favorite, FavoriteBorder, AddShoppingCart } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "#171941",
  boxShadow: 24,
  height: "90%",
  p: 4,
};

const styleImage = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "70%",
  bgcolor: "#171941",
  boxShadow: 24,
};
// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  // console.log(props?.list.includes(props?.isbn));
  const [open, setOpen] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [heart, setHeart] = useState(
    props?.list.includes(props?.isbn) || false
  );
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const handleCloseImage = () => setOpenImage(false);
  const handleOpenImage = () => setOpenImage(true);

  const request = {
    title: props?.title,
    author: props?.author,
    description: props?.description,
    discount: props?.discount,
    isbn: props?.isbn,
    link: props?.link,
    pubdate: props?.pubdate,
    publisher: props?.publisher,
    image: props?.image,
  };

  const handleHeart = async () => {
    if (heart) {
      setHeart(false);
      await api.deletelike(request);
    } else {
      setHeart(true);
      await api.addlike(request);
    }
  };
  const handleCart = () => {
    // eslint-disable-next-line no-restricted-globals
    confirm("장바구니에 추가하시겠습니까?");
  };
  // console.log(props);
  return (
    <div class="booklist">
      <div
        style={{
          marginTop: "10px",
        }}
        // onMouseMove={(e) => {
        //   console.log(1);
        // }}
      >
        <Button
          style={{
            display: "flex",
            justifyContent: "space-between",
            border: "solid 2px",
            borderColor: "rgb(31 64 182 / 66%)",
            backgroundColor: "#FFFFFF",
            borderRadius: "15px",
            padding: "20px",
            textAlign: "left",
            alignItems: "stretch",
            zIndex: 12,
            // width: "1110px",
          }}
        >
          <img
            src={
              props.image ||
              "/Users/edaumedo1/aivle0317/src/assets/img/sample_book.png"
            }
            alt={props.booktitle}
            width={120}
            height={160}
            onClick={handleOpenImage}
          />
          <div
            style={{
              marginLeft: "5px",
              paddingLeft: "10px",
              paddingRight: "10px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              // justifyContent: "space-between",
            }}
          >
            <div onClick={handleOpen}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "black",
                  position: "relative",
                }}
              >
                <h3 style={{ marginBottom: 0, fontSize: "18px", color: "black", }}>
                  {props?.title}
                </h3>
                <p
                  style={{
                    fontSize: "13px",
                    marginTop: "5px",
                    fontWeight: 400,
                    position: "absolute",
                    color: "black",
                    // textAlign: "end",
                    right: 0,
                    bottom: 0,
                    margin: 0,
                  }}
                >
                  {props?.isbn}
                </p>
              </div>
              <div
                style={{
                  marginTop: "5px",
                  border: "1px solid #dddddd",
                  borderColor: "rgb(31 64 182 / 75%)",
                }}
              ></div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "2px",
                }}
              >
                <p style={{ fontSize: "15px", fontWeight: 400, color: "black",}}>
                  {props?.author}
                </p>
                <p style={{ fontSize: "15px", fontWeight: 400, color: "black", }}>
                  {props?.publisher}
                </p>
              </div>
              <div
                style={{
                  width: "740px",
                  fontWeight: "border",
                  fontSize: "16px",
                  
                }}
              >
                <ClampLines
                  text={props?.description}
                  lines={5}
                  ellipsis="..."
                  // className="custom-class"
                  innerElement="p"
                  buttons={false}
                  style={{color: "black"}}
                />
              </div>
            </div>
            <h4 style={{ marginBottom: 0, fontSize: "14px", textAlign: "end", color: "black",}}>
              {String(props?.pubdate).slice(0, 4)}.
              {String(props?.pubdate).slice(4, 6)}.
              {String(props?.pubdate).slice(6, 8)}
            </h4>
          </div>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column-reverse",
                height: "100%",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <IconButton
                  onClick={handleHeart}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderColor: "white",
                  }}
                  color="error"
                >
                  {heart ? <Favorite /> : <FavoriteBorder />}
                </IconButton>
                <IconButton
                  style={{ width: "50px", height: "50px" }}
                  onClick={handleCart}
                >
                  <AddShoppingCart sx={{ color: lightBlue[500] }} />
                </IconButton>
              </div>
              <Link to={props?.link}>
                <Button
                  variant="outlined"
                  style={{
                    width: "128px",
                    background: "blue",
                    color: "white"
                  }}
                >
                  {Number(props?.discount).toLocaleString("ko-KR")} 원
                </Button>
              </Link>
            </div>
          </div>
        </Button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{}}
      >
        <Box sx={style} style={{ "background-color": "white" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <img
                src={
                  props.image ||
                  "/Users/edaumedo1/aivle0317/src/assets/img/sample_book.png"
                }
                alt={props.booktitle}
                width={120}
                height={160}
                onClick={handleOpenImage}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column-reverse",
                height: "100%",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <IconButton
                  onClick={handleHeart}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderColor: "white",
                  }}
                  color="error"
                >
                  {heart ? <Favorite /> : <FavoriteBorder />}
                </IconButton>
                <IconButton
                  style={{ width: "50px", height: "50px" }}
                  onClick={handleCart}
                >
                  <AddShoppingCart sx={{ color: lightBlue[500] }} />
                </IconButton>
              </div>
              <Link to={props?.link}>
                <Button
                  variant="outlined"
                  style={{
                    width: "128px",
                    backgroundColor: "blue",
                    color: "white"
                  }}
                >
                  {Number(props?.discount).toLocaleString("ko-KR")} 원
                </Button>
              </Link>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div style={{ marginTop: "10px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  position: "relative",
                }}
              >
                <h3 style={{ marginBottom: 0, fontSize: "18px", color: "#000",}}>
                  {props?.title}
                </h3>
                <p
                  style={{
                    fontSize: "13px",
                    marginTop: "5px",
                    fontWeight: 400,
                    position: "absolute",
                    // textAlign: "end",
                    right: 0,
                    bottom: 0,
                    margin: 0,
                    color: "black",
                  }}
                >
                  {props?.isbn}
                </p>
              </div>
              <div
                style={{
                  marginTop: "5px",
                  border: "1px solid #dddddd",
                  borderColor: "rgb(31 64 182 / 75%)",
                }}
              ></div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "2px",
                }}
              >
                <p style={{ fontSize: "15px", fontWeight: 400, color: "black",}}>
                  {props?.author}
                </p>
                <p style={{ fontSize: "15px", fontWeight: 400, color: "black", }}>
                  {props?.publisher} {String(props?.pubdate).slice(0, 4)}.
                  {String(props?.pubdate).slice(4, 6)}.
                  {String(props?.pubdate).slice(6, 8)}
                </p>
              </div>
              <div
                style={{
                  width: "618px",
                  fontWeight: "border",
                  fontSize: "16px",
                  position: "absolute",
                  height: "60%",
                  overflowY: "auto",
                }}
              >
                <div
                  style={{
                    // position: "relative",
                    display: "block",
                  }}
                >
                  <div style={{color: "black",}}>
                    <p style={{color: "black",}}>{props?.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
      <Modal
        open={openImage}
        onClose={handleCloseImage}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleImage} style={{ color: "white" }}>
          <img
            src={
              props.image ||
              "/Users/edaumedo1/aivle0317/src/assets/img/sample_book.png"
            }
            alt={props.booktitle}
            width={"100%"}
            height={"100%"}
            onClick={handleOpenImage}
          />
        </Box>
      </Modal>
    </div>
  );
};
