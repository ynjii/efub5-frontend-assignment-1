import styled from "styled-components";

export const Container = styled.div`
  max-width: 700px;
  margin: 40px auto;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.06);
  padding: 40px 32px 32px 32px;
`;

export const Card = styled.div`
  background: #f9fbfc;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 1px 6px rgba(0,0,0,0.03);
`;

export const DangerButton = styled.button`
  background: #d32f2f;
  color: #fff;
  &:hover {
    background: #b71c1c;
  }
`;

export const SecondaryButton = styled.button`
  background: #e0e0e0;
  color: #333;
  &:hover {
    background: #bdbdbd;
  }
`;