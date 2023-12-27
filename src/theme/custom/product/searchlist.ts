import styled from "styled-components";

export const StyledSearchList = styled.div`
  .product-search{
    padding-top: 30px;
    padding-bottom: 50px;
    @media(max-width: 991px){
      /* padding-top: 10px; */
    }
    .search-con{
      max-width: 60%;
      position: relative;
      input{ 
        height: 45px;
        border-radius: 5px;
      }
      svg{
        position: absolute;
        right: 0;
        top: 10px;
        right: 10px;
      }
      button{
        position: absolute;
        top: 0;
        right: -100px;
        min-width: fit-content;
        min-height: 100%;
        p{ text-transform: uppercase;}
      }
    }
    .search-result-con{
      margin-top: 10px;
      .product-con{
        margin-top: 15px;
      }
      .cu-card-width{
          width: calc(100% / 5);
          margin-bottom: 33px;
          @media(max-width:991px) {
              width: calc(100% / 2);
          }
      }
    }
    .no-result-con{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 40px;
      margin-top: 50px;
      gap: 20px;
      p{ 
        text-align: center;
      }
      .title{
        font-size: 18px;
        @media(min-width: 360px){
          font-size: 32px;
          line-height: 72px;
        }
      }
      .desc{
        @media(max-width: 425px){
          font-size: 14px;
        }
      }
    }
  }
`