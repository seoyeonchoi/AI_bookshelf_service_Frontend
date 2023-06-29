import React from 'react';
import {Button} from "reactstrap";
import BookTable from './BookTable'
import "../../styles/Result.css";
import * as api from "../../services/api";
import {
  // Link, Route, Routes,
  useNavigate,
} from "react-router-dom";

const BookTableView = (props) => {
    const {booksInfo, setSelectedBookInfo, deleteFromBookList, selectedBookRowInfo, setSelectedBookRowInfo, searchValue, setSearchValue, onSearch, bookInfoAPI} = props  
    const navigate = useNavigate();
    const searchBookInfo = async (bookInfo) => {
      console.log('searched')
      const fetchedData = await bookInfoAPI(bookInfo.title, 1);
      if (fetchedData !== undefined && fetchedData && fetchedData.items.length!==0) {        
        return fetchedData.items[0]
      } else {
        return {}
      }
    }

    const saveToMyBookShelf = (e) => {
      console.log('clicked')
      const newBooksInfo = []
      const promises = booksInfo.map((bookInfo) => {
        if (bookInfo.isbn === undefined) {
          return searchBookInfo(bookInfo);
        } else {
          return Promise.resolve(bookInfo);          
        }
      });

      Promise.all(promises).then((results) => {
        newBooksInfo.push(...results);
        console.log([...newBooksInfo]);
        newBooksInfo.forEach(async (bookInfo) => {
          if (Object.keys(bookInfo).length !==0){
            //save this bookInfo to myBookShelf DB  
            await api.addbookshelf(bookInfo)
          }
        })
        navigate('/bookshelf', { replace: true })
      });      
    }

    return (
      <div className = "bookTableView">
        <h3 className="viewHeader">책 목록</h3>
        <BookTable
          booksInfo = {booksInfo}
          setSelectedBookInfo = {setSelectedBookInfo}
          selectedBookRowInfo={selectedBookRowInfo}
          setSelectedBookRowInfo = {setSelectedBookRowInfo}
          deleteFromBookList = {deleteFromBookList}
          searchValue = {searchValue}
          setSearchValue = {setSearchValue}
          onSearch = {onSearch}          
        />
        <div style={{display: 'flex'}}>
          <Button style={{width: '70%', display: 'block'}}>책장 이미지 보기</Button>                
          <Button onClick = {saveToMyBookShelf} style={{width: '70%', display: 'block'}}>내 서재에 추가</Button>                
        </div>
      </div>
    );
  }

  export default BookTableView;