import { css } from 'styled-components'

export const ButtonStyle = () => css`
    display: block;
    padding: 1rem 2rem;
    border-radius: 50px;
    background-color: ${props => props.theme.featureColor};
    text-align: center;
    color: #fff;
    font-weight: bold;
    border: none;
    margin: 1rem auto;
    font-family: inherit;
    cursor: pointer;
    transition: all 1s;
`;

export const BackgroundImage = () => css`
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
`;

export const TextStyle = () => css`
    line-height: 2rem;
    margin: 1rem 0;
`;

export const Input = () => css`
    border-radius: 10px;
    padding: 1rem;
    border: none;
    border-left: 0 solid ${props => props.theme.featureColor};
    font-family: inherit;
    outline: none;
    transition: all .5s ease-in-out;
`;

export const SubTitle = () => css`
    color: ${props => props.theme.featureColor};
    font-size: 1.5rem;
    font-weight: bold;
    font-style: italic;
`;