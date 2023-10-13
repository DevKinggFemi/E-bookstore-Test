import React, { useState } from "react";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/navBar";
import Productlist from "../components/productlist";
import { useLocation } from "react-router-dom";
import Footer from "../components/footer"
const Container = styled.div`
  max-width: 2800px;
  width: 100%;
  @media screen and (max-width: 768px) {
   
  }
`;

const ContentWrapper = styled.div`
  display: flex;
`;

const SidebarWrapper = styled.div`
  width: 40%;
  background-color: hsl(0, 0%, 100%);
  @media screen and (max-width: 768px) {
    width: 30%;
    align-items: center;
  }
`;

const MainContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
 
`;



const SlideWrapper = styled.div`
width: 100%;
margin-top: 20px;
@media screen and (max-width: 768px) {
    width: 60%;
  }
`;


const Bookshop = () => {
  const location = useLocation();
  const locationCategory = location.pathname.split('/')[2]
  
  const [selectedCategories, setSelectedCategories] = useState('');
  return (
    <Container>
      <Navbar />
      <ContentWrapper>
        <SidebarWrapper> 
          <Sidebar onCreate ={setSelectedCategories}/>
        </SidebarWrapper>
        <MainContentWrapper>
        <SlideWrapper>
     
     <Productlist  locationCategory= {locationCategory} selectCategories={selectedCategories}  />
   </SlideWrapper>
        </MainContentWrapper>
      </ContentWrapper>
      <Footer/>
    </Container>
  );
};

export default Bookshop;
