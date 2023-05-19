import React, { useEffect, useState } from "react";
import "./style.css";
import { products } from "../localFiles/products";
import ContentWrapper from "../components/contentWrapper/ContentWrapper";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const HomePage = () => {
  const [filteredProduct, setFilteredProduct] = useState(products);
  const [searchedProduct, setSearchedProduct] = useState("");
  const [catagories, setCatagories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Select Catagory");
  const [sortProducts, setSortProducts] = useState("Sort Products");

  useEffect(() => {
    const allCatagories = products.map((product) => product.category);
    const uniqueCatagories = new Set(allCatagories);
    setCatagories([...uniqueCatagories]);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleClick();
    } else {
      return;
    }
  };

  const handleClick = (e) => {
    if (searchedProduct === "") {
      setFilteredProduct(products);
    } else {
      const newFilteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchedProduct.toLowerCase())
      );

      setFilteredProduct(newFilteredProducts);
    }
  };

  useEffect(() => {
    let newProductList = [];

    if (selectedCategory === "Select Catagory") {
      newProductList = products;
    } else {
      const categoryName =
        selectedCategory.charAt(0).toLowerCase() + selectedCategory.slice(1);

      newProductList = products.filter(
        (product) => product.category === categoryName
      );

      // setFilteredProduct(newProductList);
    }

    if (sortProducts === "Sort Products") {
      setFilteredProduct(newProductList);
    } else {
      // let sorted;

      if (sortProducts === "Low To High") {
        newProductList = [...newProductList].sort((a, b) => a.price - b.price);
      } else if (sortProducts === "High To Low") {
        newProductList = [...newProductList].sort((a, b) => b.price - a.price);
      } else {
        return;
      }
    }

    setFilteredProduct(newProductList);
    console.log(newProductList);
  }, [selectedCategory, sortProducts]);

  // useEffect(() => {
  //   if (sortProducts === "Sort Products") {
  //     setFilteredProduct(products);
  //   } else {
  //     let sorted;
  //     if (sortProducts === "Low To High") {
  //       sorted = [...filteredProduct].sort((a, b) => a.price - b.price);
  //     } else if (sortProducts === "High To Low") {
  //       sorted = [...filteredProduct].sort((a, b) => b.price - a.price);
  //     } else {
  //       return;
  //     }

  //     setFilteredProduct(sorted);
  //   }
  // }, [sortProducts]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSortingChange = (e) => {
    setSortProducts(e.target.value);
  };

  return (
    <div>
      <ContentWrapper>
        <div className="mainDiv">
          <div className="topDiv">
            <div className="searchDiv">
              <input
                type="text"
                className="textInput"
                onChange={(e) => setSearchedProduct(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button className="searchButton" onClick={handleClick}>
                Search
              </button>
            </div>
            <div className="functionalityDiv">
              <div className="select-container">
                <select
                  className="selectBox"
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e)}
                >
                  <option>Select Catagory</option>
                  {catagories.map((category) => (
                    <option key={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="select-container">
                <select
                  className="selectBox"
                  value={sortProducts}
                  onChange={(e) => handleSortingChange(e)}
                >
                  <option>Sort Products</option>
                  <option>Low To High</option>
                  <option>High To Low</option>
                </select>
              </div>
            </div>
          </div>
          <div className="allProducts">
            {filteredProduct.map((item) => {
              return (
                <Card sx={{ maxWidth: 230 }} key={item.id}>
                  <CardMedia
                    sx={{ objectFit: "contain", padding: "5px" }}
                    component="img"
                    alt="green iguana"
                    height="140"
                    image={item.icon}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.title}
                      <Button
                        size="small"
                        style={{
                          fontSize: "20px",
                          color: "red",
                          fontWeight: "bold",
                        }}
                      >{`$ ${item.price}`}</Button>
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
              );
            })}
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HomePage;
