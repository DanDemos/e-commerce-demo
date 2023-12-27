import styled from "styled-components";

export const StyledProfileCon = styled.div`
  padding-block: 50px;
  @media(max-width: 991px){
    padding-block: 30px;
  }
  .modal-con{
    height: 80vh;
    overflow-y: scroll;
  }
  .profile-con{
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
    .profile-row{
      position: relative;

      .tab{ 
        padding: 0; 
        /* margin-bottom: 25px;  */
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
      }

      .title{
          line-height: 46px; 
          margin-bottom: 20px;
          @media(max-width: 768px){
            font-size: 22px;
          }
      }
      .profile-info{
        .name,.phone,.email{ margin-bottom: 25px;}
        a{ margin-bottom: 22px; svg{ margin-right: 10px;} display: flex; align-items: center; 
        &:hover{ color: #0491A4;}
        width: fit-content;
        }
        @media(max-width: 991px){
          margin-top: -20px;
        }
      }
      .point{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .title{margin-bottom: 0;}
        border: 1px solid ${props => props?.theme?.color?.typo?.line};
        width: 140px;
        height: 140px;
        border-radius: 100%;

        @media(max-width: 991px){
          position: absolute;
          top: 90px;
          right: 0;
          margin: 0;
          width: 90px;
          height: 90px;
          p{ font-size: 10px;}
          .title{ font-size: 18px; line-height: 20px;}

          margin-top: -30px;

        }
      }

      .shipping-add{
        .address-con{
          border: 1px solid ${props => props?.theme?.color?.typo?.line};
          border-radius: 5px;
          justify-content: space-between;
          .name{ margin-bottom: 12px;}
          svg{ margin-right: 8px;}
          .ph{ margin-left: 5px;}
          p{margin-bottom: 15px;}
          p:last-child{margin-bottom: 0;}
          .info{
            padding: 20px;
          }
          .btn{
          padding: 0;
          border: none; 
          border-left: 1px solid ${props => props?.theme?.color?.typo?.line2}; 
          border-radius:0;
          }
          button{ 
          border: none;
          min-width: 50%;
          padding: 15px;
          svg{ margin:0;}
          height: 50%;
          &:first-child{border-bottom: 1px solid ${props => props?.theme?.color?.typo?.line}; border-radius: 0;}
          }
          margin-bottom: 35px;
        }
        .add-btn{
          border-radius: 5px;
          text-transform: uppercase;
        }
        .modaldialog{
            min-width: 50vw !important;
            /* display: flex;
            justify-content: center;
            align-items: center; */
           
          }
        .edit-modal{
            .modaldialog{
              @media(max-width: 768px){
                max-width: 80vw!important;
              }
              @media(max-width: 375px){
                max-width: 95vw!important;
                /* padding: 0; */
                .inner_modal_con{
                  margin-inline: -10px;
                }
              }
            }
            .inner_modal_con{
              /* max-width: 50vw!important; */
              max-height: 70vh;
              overflow-y: scroll;
              /* ::-webkit-scrollbar {display:none;} */er: 1px solid red;
              b
              p.modal-title{ 
                text-align: unset;
                margin-bottom: 30px;
                }
              .label_txt{
                font-weight: 700;
              }
              button{ 
                text-transform: uppercase; 
                border-radius: 5px;
              }
              button:first-child{ border: none;}
              }
              .buttons{
                  @media(max-width:768px){
                    justify-content: flex-start!important;
                    button{
                      min-width: fit-content;
                    }
                  }
              }
        }
          @media(max-width: 992px){
            margin-top: 25px;
          }
      }
    }

    @media(max-width: 991px){
      margin-top: 10px;
      .container-fluid{ margin: 0; padding: 0;}
    }
  }
`