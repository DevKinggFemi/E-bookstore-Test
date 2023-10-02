import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Facebook,
  Twitter,
  Instagram,
  YouTube,
  RateReview,
  StarHalfOutlined,
} from '@material-ui/icons';
import { Badge } from '@material-ui/core';
import { ShoppingCartOutlined } from '@material-ui/icons';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { addProduct } from '../redux/cartRedux';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './navBar';
import { user } from '../redux/userRedux';
import { publicRequest, userRequest } from '../requestMethods';

const Container = styled.div`
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  max-width: 1320px;
  margin: 0 auto;
`;

const Image = styled.img`
  width: 40%;
  max-height: 400px;
  object-fit: cover;
`;

const Desc = styled.div`
  width: 60%;
  padding-left: 20px;
`;

const DescTitle = styled.span`
  font-size: 30px;
  font-weight: bold;
`;

const DescRatings = styled.div`
  display: flex;
  width: 100px;
  align-items: center;
`;

const DescHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const SocialContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const SocialIcons = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  margin-right: 10px;
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: #ff6600;
  }
`;

const DescBook = styled.div`
  margin-top: 10px;
  font-size: 18px;
  line-height: 1.5;
`;

const Price = styled.div`
  margin-top: 20px;
  font-size: 40px;
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
`;

const BuyButton = styled.button`
  width: 150px;
  height: 50px;
  background-color: #ff6600;
  border: none;
  border-radius: 30px;
  color: white;
  font-weight: bold;
  transition: background-color 0.3s;
  
  cursor: pointer;
  &:hover {
    background-color: #ff8000;
  }


`;

const CartContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  @media (max-width: 768px) {
    margin-left: 5px;
    }
  
`;

const CartButton = styled.button`
  background-color: #ff6600;
  width: 200px;
  height: 50px;
  color: white;
  border: none;
  border-radius: 30px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  @media (max-width: 768px) {
    width: 100px;
  height: 50px;
  }
  transition: background-color 0.3s;
  &:hover {
    background-color: #ff8000;
  }
`;

const CartIcon = styled(ShoppingCartOutlined)`
  font-size: 24px;
  margin-right: 10px;
  @media (max-width: 768px) {
  font-size: 15px;
  }
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  @media (max-width: 768px) {
    margin-left: 5px;
    margin-right: 5px;
    }
`;

const QuantityButton = styled.button`
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: #ddd;
  }
`;

const QuantityText = styled.div`
  margin: 0 10px;
  font-size: 18px;
`;

const AuthNameDes = styled.div`
  font-weight: bold;
`;

const Products = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [Cartquantity, setCartQuantity] = useState(1);
  const TOKEN = localStorage.getItem('TOKEN');
  const userId = localStorage.getItem('userId');
  const dispatch = useDispatch();
  const users = useSelector(user);
  const cartProduct = useSelector((state) => state.user.products);
  

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(
          `/products/${id}`
        );
        setProduct(res.data);
      } catch (err) {}
    };
    getProducts();
  }, [id]);

  
    const createItem = async (userItems) => {
      try {
       
        
        const res = await userRequest.put("/cart/create",
          userItems
        );
        console.log(res.data)
      } catch (err) {}
    };
  
  

  const handleOnclick = ({ name }) => {
    if (name === 'increase') {
      setCartQuantity(Cartquantity + 1);
      setQuantity(quantity + 1);
    } else if (name === 'decrease') {
      Cartquantity > 1 && setCartQuantity(Cartquantity - 1);
      quantity > 1 && setQuantity(quantity - 1);
    }
  };

  const handleClick =  () => {   
      dispatch(addProduct({ ...product,ProductId :product._id ,quantity }));
       createItem({
          userId: userId,
          products: [
            {
              Title: product.Title,
              ProductId: product._id,
              quantity: quantity,
              Img: product.Img,
              Price: product.Price,
              Des: product.Des,
            },
          ]
       })
  };
 
  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Image src={product.Img} alt={product.Title} />
        <Desc>
          <DescTitle>{product.Title}</DescTitle>
          <DescHeader>
            <DescRatings>
              <RateReview />
              <StarHalfOutlined />
            </DescRatings>
            <SocialContainer>
              <SocialIcons style={{ color: '#3b5998' }}>
                <Facebook />
              </SocialIcons>
              <SocialIcons style={{ color: '#3f729b' }}>
                <Twitter />
              </SocialIcons>
              <SocialIcons style={{ color: '#55acee' }}>
                <Instagram />
              </SocialIcons>
              <SocialIcons style={{ color: '#cd201f' }}>
                <YouTube />
              </SocialIcons>
            </SocialContainer>
          </DescHeader>
          <DescBook>{product.Des}</DescBook>
          <Price>${product.Price}</Price>
          <ButtonContainer>
            <BuyButton>Buy Now</BuyButton>
            <CartContainer>
              <QuantityContainer>
                <QuantityButton
                  onClick={() => handleOnclick({ name: 'decrease' })}
                >
                  -
                </QuantityButton>
                <QuantityText>{Cartquantity}</QuantityText>
                <QuantityButton
                  onClick={() => handleOnclick({ name: 'increase' })}
                >
                  +
                </QuantityButton>
              </QuantityContainer>
              <CartButton onClick={handleClick} disabled={!users}>
                Add to Cart{' '}
                <Badge badgeContent={Cartquantity} color="#fff">
                  <CartIcon />
                </Badge>
              </CartButton>
            </CartContainer>
          </ButtonContainer>
        </Desc>
      </Wrapper>
    </Container>
  );
};

export default Products;
