import styled from 'styled-components'

export const StyledCheckout = styled.div`
.info{
  input,select{
    border-radius: 5px;
  }
}

.title{
  line-height: 24px;
  margin-bottom: 5px;
  @media(max-width: 425px){
    line-height: 24px;
  }
  @media(max-width: 991px){
    font-size: ${props => props?.theme?.fontSize?.xl}px;
  }
}
.title-wrap{
  margin-bottom: 8px;
  @media(max-width: 768px){
    flex-direction: column;
    align-items: flex-start!important;
    gap: 10px;
    .d-flex{
      p,a{
        font-size: 14px;
      }
    }
  }
  @media(max-width: 991px){
    .d-flex{
      p,a{
        font-size: ${props => props?.theme?.fontSize?.md}px;
      }
    }
  }
}

.register-remind{
  @media(max-width: 991px){
    p{
      font-size: ${props => props?.theme?.fontSize?.md}px;
    }
  }
  @media(max-width: 425px){
    /* align-items: flex-start!important; */
    svg{
      width: 25px!important;
    }
  }
}

#payment-form{
  opacity: 0;
  visibility: hidden;
}
textarea{
  border: 1px solid ${props => props?.theme?.color?.form?.borderColor};
  border-radius: 5px;
}
padding-block:30px;
  .vlc_con{
      /* margin-bottom: 24px; */
    }
  .checkout{
    a{cursor:pointer}
  .order-summary{
    border: 1px solid ${props => props?.theme?.color?.form?.borderColor};
    background:${props => props?.theme?.color?.container?.bg1};
    padding: 30px;
   
    thead{
      border-bottom: 1px solid ${props => props?.theme?.color?.form?.borderColor};
    }
    .title{
      text-align: right;
      width: 60%;
      @media(min-width: 1400px){
        width: 65%;
      }
      
      /* margin-left: 35%;
      @media(max-width: 1200px){
        margin-left: 20%;
      }
       */
    }
    .tax{
      padding: 10px 0;
    }
    @media(max-width: 991px){
      margin-top: 20px;
    }
    @media(max-width: 768px){
      padding: 15px;
      th{
        &:first-child{
          width: 300px;
        }
        p{
          font-size: 14px;
        }
      }
      td{
        &:first-child{
          width: 300px;
        }
        p{
          font-size: 14px;
        }
      }
    }
  }
  a{
     svg{
      margin-right: 8px;
    
     } 
    }
  .shipping-address-con{
    .address-con{
      border: 1px solid ${props => props?.theme?.color?.form?.borderColor};
      border-radius: 5px;
      justify-content: space-between;
      .name{ margin-bottom: 12px;}
      svg{ margin-right: 8px;}
      .ph{ margin-left: 5px;}
      p{margin-bottom: 15px;}
      p:last-child{margin-bottom: 0;}
      &.active{
        border:1px solid ${props => props?.theme?.color?.typo?.primary || 'blue'};
      }
      .info{
        padding: 20px 15px 20px 10px;
        width: 100%;
        /* border: 1px solid red; */
        cursor: pointer;
        input[type='radio']{
          width: 15px;
          height: 15px;
          accent-color: ${props => props?.theme?.color?.typo?.primary};
        }
      }
      .btn{
      padding: 0;
      border-left: 1px solid gray;
      border: none; 
      border-left: 1px solid ${props => props?.theme?.color?.form?.light_gray}; 
      border-radius: 0;
      }
      button{ 
      border: none;
      min-width: 50%;
      padding: 15px;
      svg{ margin:0;}
      height: 50%;
      &:nth-child(2){
        border-top: 1px solid ${props => props?.theme?.color?.form?.light_gray}; 
        border-radius: 0;
    }
      }
      margin-bottom: 20px;
    }
    .add-btn{
      border-radius: 5px;
      text-transform: uppercase;
      svg{ margin-right: 8px;}
    }
    .edit-modal{
        .inner_modal_con{
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
    }
      @media(max-width: 992px){
        margin-top: 25px;
      }
      .no-address{
        background:${props => props?.theme?.color?.container?.background};
        border: 1px solid ${props => props?.theme?.color?.typo?.text};
        border-radius: 5px;
        border-style: dashed;
        height: 130px;
      }
  }
  .disable{
    opacity: 0.6;
  }
  .select-info{
    /* opacity: 0;
    visibility: hidden; */
  }
  .radio-con{
    accent-color: ${props => props?.theme?.color?.container?.primary};
    border-radius: 5px;
    padding: 0;
    padding-inline: 15px;
    label{
      width: 100%;
      cursor: pointer;
      padding-block: 15px;
      border-bottom: 1px solid ${props => props?.theme?.color?.typo?.line2 || '#ddd'};
      &:last-child{
        border-bottom: none;
      }
    }

    input[type="radio"] {
      width: 15px;
      height: 15px;
    }
    .icons{
      flex-wrap: wrap;s
      img{
        border: 1px solid ${props => props?.theme?.color?.typo?.line2 || '#ddd'};
      }
    }
  }
}
.sign-in-user{
  .modaldialog{
            min-width: 40vw !important;
          }
}
.order_success,.paymentNoti{
  .close_outside{
    pointer-events: none;
  }
}
.inner_modal_con{

  .order{
    width: fit-content;
    margin: auto;
    p{text-align: left;}
  }
  a{ text-decoration: none;}
  button{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    min-width: auto;
    max-width: 235px;
    width: 100%;
  }
}
`
export const StyledPayRes = styled.div`
  .res-con{
    min-height: 60vh;
    padding-block: 50px;
    a{
      text-decoration: none;
    }
  }
`