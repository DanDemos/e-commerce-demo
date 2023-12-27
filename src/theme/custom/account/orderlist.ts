import styled from "styled-components";

export const StyledOrderlistCon = styled.div`
  padding-block: 50px;
  @media(max-width: 991px){
    padding-block: 30px;
  }
  .tab{ 
    padding: 0; 
    margin-bottom: 25px; 
    p{ text-transform: uppercase; width: auto;}
    .def_title_wrap{
      a{ display: flex;
         gap: 5px;
         align-items: center;
      }
    }
    @media(max-width: 768px){
      .tab-head{ gap: 0;}
      .def_title_wrap{ 
        padding: 5px;
        p{ font-size: 14px;}
        }
    }

    .tab-body{ display: none;}
    @media(max-width: 991px){
      margin-bottom: 0;
    }
  }

  .title{
      line-height: 46px; 
      margin-bottom: 30px!important;
      @media(max-width: 768px){
        font-size: 22px;
        margin-bottom: 20px!important;
      }
  }
  .row{ 
    display: flex; 
    justify-content: center;
    margin: auto;
    width: 95%;
    @media(max-width: 1200px){
      margin: 0;
      width: 100%;
    }
  }

  .order-history-content{
    padding-right: 0;
    p{margin: 0;}
    .order-card{
      padding: 0;
      flex-direction: column;
      margin-bottom: 20px;
      .order-title{
        padding: 15px;
        width: 100%;
        justify-content: space-between;
        background: ${props => props?.theme?.color?.typo?.bg1 || '#f9f9f9'};
        border-bottom:  1px solid ${props => props?.theme?.color?.typo?.line || '#D9D9D9'};
        .status{
          border-radius: 15px;
          padding-inline: 10px;
          font-style: italic;
          background: ${props => props?.theme?.color?.typo?.status || '#FF4200'};
          line-height: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 22px;
        }
        @media(max-width: 1024px){
          padding: 8px;
        }
      }
      .order-detail{
        .detail{
          padding: 15px;
          width: 85%;
          span{ margin-left: 50px;}
          .d-flex{ 
            justify-content: space-between;
            div.point{
              font-style: italic;
            }
            .detail-info{
              display: flex;
              gap: 30px;
              @media(max-width: 1100px){
                gap: 8px;
              }
            }
            @media(max-width: 991px){
              flex-direction: column;
              gap: 10px;
              p{font-size: 15px;}
            }
          }
          @media(max-width: 1024px){
              padding-inline: 8px;
          }
          @media(min-width: 992px) and (max-width: 1024px){
            p{ font-size: 15px;}
          }
          @media(max-width: 375px){
            padding-right: 0;
          }
        }
        .detail-btn{
          width: 15%;
          display: flex;
          justify-content: center;
          align-items: center;
          border-left: 1px solid ${props => props?.theme?.color?.typo?.line || '#d9d9d9'};
          button{
            min-width: fit-content;
            padding: 0;
            border-color: transparent;
            svg{margin-right: 3px;}
            text-transform: uppercase;
            @media(max-width: 1200px){
              svg{ 
                margin-right: 0;
                width: 17px;
                height: 17px;
              }
              font-size: 14px;
            }
            @media(max-width: 375px){
             flex-direction: column;
            }
          }
          @media(max-width: 1200px){
            width: 16%;
          }
          @media(max-width: 991px){
            width: 30%;
          }
        }
      }
    }
    @media(max-width: 991px){
      padding-left: 0;
    }
    .no-item{
    padding-block: 50px;
   }
  }

  .side-bar{
    padding: 20px;
    margin-left: 20px; 
    border: 1px solid ${props => props?.theme?.color?.typo?.line};
    height: fit-content;
    margin-top: 76px;
    .title{
      align-items: center;
      img{margin-right: 20px;}
      p{ line-height: 46px;}
    }
    a{text-decoration: underline;}
    @media(max-width: 1200px){
      padding: 15px;
      margin-left: 15px; 
    }
    @media(max-width: 991px){
      margin: 0;
    }
  }
`