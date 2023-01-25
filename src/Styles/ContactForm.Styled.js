import styled from "styled-components";

export const StyledContactForm = styled.form`
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      justify-content: flex-end;
      input,
      textarea {
        line-height: 1.8;
      }
      .submit {
        background-color: #607684;
        color: white;
        width: 5rem;
        margin-left: auto;
        cursor: pointer;
      }
      p {
        color: red;
        margin: 0;
      }
`;
