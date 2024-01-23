import styled from "styled-components"

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between; 
    align-items: center;
    background-color: #082e54;
    padding: 10px;

    p{
        color: white;
    }
    .link{
      text-decoration:none;
      color: white
    }
    .link:hover{
      cursor:pointer;
    }
   

`

export default Wrapper;