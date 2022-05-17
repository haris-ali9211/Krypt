import {useState,useEffect} from 'react';


const API_KEY = "iXy0kSfZDY8ESIgHRYomDyldY1Yjw7Z4";


const useFetch = ({keyword}) => {
    const [gifUrl,setgifUrl] = useState("")
    
    const  fetchGifs = async () => {
        try{
            const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword.split(" ").join("")}&limit=1`)
            console.log(API_KEY)
            const {data} = await response.json();
            console.log(data[0]?.images?.downsized_medium?.url)
            setgifUrl(data[0]?.images?.downsized_medium?.url);
        }catch(error){
            setgifUrl("https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284");
        }
    }
    useEffect(()=>{
        if(keyword) {
            fetchGifs()
        }
    },[keyword])

    return gifUrl;
}

export default useFetch;
