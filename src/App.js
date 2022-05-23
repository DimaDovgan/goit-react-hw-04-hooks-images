
import './App.css';
import {useState, useEffect} from 'react';
import { Searchbar } from "./component/Searchbar.jsx"
import { ImageGallery } from "./component/Image-gallery"
import { LoadMore } from "./component/Loader-more.jsx"
import { Loader } from "./component/Loader"
import { Modal } from "./component/Modal"
import {fetchApi} from "../src/fetch-Api"

const state = {
  IDLE: "idle",
  PENDING:"pending",
  RESOLVED:"resolved",
  REJECTED:"rejected"
}
const App = () => {
  const [seararchTitle, setSeararchTitle] = useState("");
  const [page, setPage] = useState(null);
  const [galleryList, setGalleryList] = useState([]);
  const [states, setStates] = useState(state.IDLE);
  const [selectedImg, setSelectedImg] = useState(null);
  const [err,setErr]=useState(null)

  
  const showModal = () => {
    setSelectedImg(null)
  }
  const selectedCard = (img) => {
    return () => {
      setSelectedImg(img);
    }
  }
  
  const inputSeararchTitle = (title) => {
    setSeararchTitle(title);
  }
  const loadMore = () => {
    setPage((value)=>value+1)
  }
   
  useEffect(() => {
    if (seararchTitle !== "") {
      console.log("reset")
      setGalleryList([]);
      setPage(1);
    }
  },[seararchTitle])
  
  useEffect(() => {
    
    if (seararchTitle !== "") {
      console.log("fetch")
      setStates(state.PENDING);
    fetchApi(seararchTitle, page).then(data => {
      const newArr = galleryList.concat(data);
      if (data.length > 0) {
        setGalleryList(newArr);
        setStates(state.RESOLVED)
      }
      else {
        setStates(state.REJECTED)
      }
    }).catch(err => {
      setErr(err);
      setStates(state.REJECTED);
    })}
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[page])
  
    return <div className='App'><Searchbar seararchTitle={inputSeararchTitle} />
      <ImageGallery galleryList={galleryList} selected={selectedCard}/>
      {states === "resolved" && <LoadMore onClick={loadMore} />}
      {states === "pending" && <Loader />}
      {selectedImg && <Modal img={selectedImg} func={showModal}/>}

      
      
    </div>
  
}

export default App;
