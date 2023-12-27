import styled from "styled-components";

export const StyledProfileEditCon = styled.div`
 padding-block: 50px;
  @media(max-width: 991px){
    padding-block: 30px;
  }
  .profile-edit-con{
    .tab{ 
      padding: 0; 
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

    .title{ 
      margin-block: 10px;
      @media(max-width: 991px){
        margin-block: 15px;
      }
    }

    input{ 
      @media(min-width: 992px){
      width: 50%;}
    }

    .buttons{
      a{ text-decoration: none;}
      button{ text-transform: uppercase; border-radius: 5px; min-width: fit-content; padding-inline: 30px;}
      button:first-child{
        border: none;
        }
    }

    @media(max-width: 991px){
      margin-top: 30px;
    }
}
`