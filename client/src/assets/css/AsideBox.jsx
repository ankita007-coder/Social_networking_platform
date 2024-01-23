import styled from "styled-components";

const Wrapper = styled.div`
    margin:10px;
    border: 1px solid var(--grey-900);
    border-radius: var(--borderRadius);
    .title{
        background-color: var(--primary-500);
        padding:5px;
    }
    h5{
        color: var(--white);
        padding: 5px;
        text-align: left;
    }
    button{
        background-color: var(--primary-400);
        color:white;
        border: none;
        border-radius: var(--borderRadius);
        padding: 5px 8px;
        margin: 8px;
    }
    .link{
        text-decoration: none;
        color: var(--white)
    }
`

export default Wrapper;