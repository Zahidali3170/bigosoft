import "./App.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Product from "./Product";
import { productData, responsive } from "./data";
import { useState ,useEffect } from "react";
import axios from 'axios';

export default function App() 
{

    // const [data1, productDat]= useState('')

    // const fetchData = async () => {
    //     try {
    //         const res = await fetch('https://fakestoreapi.com/products')
    //         const data = await res.json();
    //         productDat(JSON.parse(data))
    //         console.log("data---------",JSON.parse(data1))
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }
    
    // useEffect(() => {
    //     fetchData()
    // }, [])

    const [posts, setPosts] = useState([]);

    useEffect(() => {
      axios.get('https://fakestoreapi.com/products')
        .then(response => {
          setPosts(response.data);
          console.log("posts",posts)
        })
        .catch(error => {
          console.error(error);
        });
    }, []);


  const product = posts.map((item) => (
    <Product
      name={item.title}
      url={item.image}
      price={item.price}
      description={item.description}
    />
  ));

  return (
    <div className="App">
      <Carousel showDots={true} responsive={responsive}>
        {product}
      </Carousel>
    </div>
  );
}