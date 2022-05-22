import axios from "axios"
const filterContent = (arr) => {
        return arr.map(({ id, webformatURL, largeImageURL }) => {
        return { id, webformatURL, largeImageURL }
        })
    }
export async function fetchApi(titile, page) {
    const res = await axios(`https://pixabay.com/api/?q=${titile}&page=${page}&key=25723997-fd962a98215c24b806b0808d5&image_type=photo&orientation=horizontal&per_page=12`);
    const modeficationList=filterContent(res.data.hits)
        return await modeficationList; 
    
}

