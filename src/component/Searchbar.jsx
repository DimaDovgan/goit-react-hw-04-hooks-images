import "../App.css"
import { useState, useEffect} from "react"
import PropTypes from "prop-types";
export const Searchbar =({seararchTitle})=>{
    
    const [inputValue,setInputValue]=useState("")
    
    const writeTitle = (event) => {
        setInputValue(event.currentTarget.value.toLowerCase())
    }
    const formReset = () => {
        setInputValue("")

    }
    const submitTitle = (event) => {
        event.preventDefault();
        if (inputValue.trim() === "") {
            alert("input some")
            return;
        }
        seararchTitle(inputValue);
        formReset();

    }

        return <header className="Searchbar">
    <form className="SearchForm" onSubmit={submitTitle}>
    <button   type="submit" className="SearchForm-button">
        <span className="SearchForm-button-label">Search</span>
    </button>

    <input onChange={writeTitle}
        className="SearchForm-input"
        type="text"
        autoComplete="off"
        autoFocus
                    placeholder="Search images and photos"
                    value={inputValue}
    />
    </form>
</header>
    
}

Searchbar.propTypes = {
    seararchTitle: PropTypes.func.isRequired,
}

