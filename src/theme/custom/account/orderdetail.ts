import styled from "styled-components";

export const StyledOrderDetailCon = styled.div`
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
 
    /* content */
    .order-detail-content{
      .order-detail-card{
        padding: 0;
        flex-direction: column;
        .order-title{
          position: relative;
          width: 100%;
          background: ${props => props?.theme?.color?.typo?.bg1 || '#f9f9f9'};
          padding: 15px;
          p{ margin-bottom: 8px;}
          .status{
            border-radius: 15px;
            padding-inline: 10px;
            font-style: italic;
            background: ${props => props?.theme?.color?.typo?.status || '#FF4200'};
            /* line-height: 50px; */
            display: flex;
            justify-content: center;
            align-items: center;
            width: fit-content;
            height: 25px;
            position: absolute;
            top: 15px;
            right: 10px;
          }
        }
        .order-table{
          padding: 20px;
          border-bottom: 1px solid ${props => props?.theme?.color?.typo?.line || '#d9d9d9'};
          table{
            thead{ display: none;}
          }
          .product_name_wrap{
            align-items:center;
            img{
              max-width: 200px;
              margin-right: 20px;
              @media(max-width: 1200px){
                max-width: 130px;
              }
            }
            p{margin-bottom: 10px;}
          }
        }
        margin-bottom: 30px;
      }
      .sub-total,.total{
        padding: 15px;
        justify-content: flex-end;
        gap: 150px;
        p:first-child{
          margin-bottom: 10px;
        }
        @media(max-width: 768px){
          justify-content: space-between;
        }
      }
      .total{
        border-top: 1px solid ${props => props?.theme?.color?.typo?.line || '#d9d9d9'};
        background: ${props => props?.theme?.color?.typo?.bg1 || '#d9d9d9'};
        padding: 15px;
        gap: 145px;
        .point{
          align-items: flex-end;
          gap: 5px;
        }
        .point-earn{
          float: right;
          background: ${props => props?.theme?.color?.typo?.secondary || '#F27043'};
          border-radius: 50%;
          width: fit-content;
          padding-inline: 5px;
          padding-block: 2px;
        }
      }
      .gift-card{
        padding: 0;
        flex-direction: column;
        .gift-table{
          width: 100%;
          padding: 20px;
          table{
            thead{ display: none;}
          }
        }
        .product_name_wrap{
          align-items: center;
          img{
              max-width: 200px;
              margin-right: 20px;
              @media(max-width: 1200px){
                max-width: 130px;
              }
            }
        }
        .total{
          padding: 25px;
          padding-right: 20px;
          gap: 50px;
          @media(max-width: 768px){
            padding: 20px;
          }
        }
        @media(max-width: 991px){
          margin-bottom: 40px;
        }
      } 
      @media(max-width: 991px){
        padding-inline: 0;
      }
    }
    .back-btn{
      border: none;
      margin-top: 40px;
      svg{ margin-right: 10px;}
      padding: 0;
      &:hover{
        color: ${props => props?.theme?.color?.typo?.primary};
      }
      @media(max-width: 991px){
        display: none;
      }
    }

    /* sidebar */
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
  .order-title,.order-table,.gift-table,.sub-total,.total,.side-bar{
    @media(max-width: 425px){
      padding-inline: 8px!important;
    }
  }
  .order-detail-card{
    .sub-total,.total{
      @media(max-width: 768px){
        gap: unset!important;
      }
    }
  }
`