import React, { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import { Box, Modal, TablePagination } from "@mui/material";

function App() {
  
  //Use states
  const [dataUsers, setDataUsers] = useState([]);
  const [dataPosts, setDataPosts] = useState([]);
  const [textBody, setTextBody] = useState("");
  const [dataPhotos, setDataPhotos] = useState([]);
  const [modal, setModal] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = React.useState(10);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  async function getUsers() {
    try {
      const { data } = await axios.get(import.meta.env.VITE_API_URL_USERS);
      setDataUsers(data);
      // console.log(data);
    } catch (error) {}
  }

  async function getPosts() {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL_POSTS}?_rowsPerPage=${rowsPerPage}`);
      setDataPosts(data);
      console.log(data);
    } catch (error) {}
  }

  async function getPhotos() {
    try {
      const { data } = await axios.get(import.meta.env.VITE_API_URL_PHOTOS);
      setDataPhotos(data);
    } catch (error) {}
  }

  useEffect(() => {
    getUsers();
    getPosts(search);
    getPhotos();
  }, [search]);

  //My functions

  function openModal(item) {
    setModal(true);
    setTextBody(item.body);
  }

  function handleClose() {
    setModal(false);
  }

  function closeModalPosts() {
    setModal(false);
  }


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  return (
    <div>
      <header className="header">
        <input
          type="search"
          name=""
          id=""
          value={search}
          onChange={(event)=>setSearch(event.target.value)}
          className=" p-[10px_30px] border-[2px] border-[#000] outline-none rounded-[30px]"
          placeholder="Search Title"
        />
      </header>
      <section className="section flex items-start flex-wrap gap-[20px] justify-center mt-[50px]">
        {dataPosts.filter((item)=> {
          return item.title.trim().toLowerCase().includes(search.toLowerCase());
        })
        .map((item) => {
          return (
            <div
              key={item.id}
              className="p-[6px_40px] w-[280px] shadow-2xl cursor-pointer"
              onClick={() => openModal(item)}
            > 
              <h1 className=" max-w-[280px] text-[20px] font-[700]">
                {item.title}
              </h1>
            </div>
          );
        })}
      <Modal
        open={modal}
        onClose={() => handleClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex justify-center items-center"
      >
        <Box className="w-[280px] p-[20px] bg-[#fff] outline-none rounded-[20px]">
          <div
            className="flex justify-end text-[22px] cursor-pointer"
          >
            <span onClick={() => closeModalPosts()}>&times;</span>
          </div>
          <div>
            <h1 className="text-[16px] font-[700]">{textBody}</h1>
          </div>
        </Box>
      </Modal>
      </section>
      <footer>
      <TablePagination
      component="div"
      count={100}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
      </footer>
    </div>
  );
}

export default App;
