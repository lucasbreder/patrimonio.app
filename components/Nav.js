import Link from 'next/link'
import styled from 'styled-components'
import LogOut from './Logout'
import { useRef } from "react"

export default function Nav() {

    const navContainer = useRef()

    function showTitle(target) {
        
    }

    return (
        <Navigation ref={navContainer}>
            <NavigationMobileButton onClick={() => {navContainer.current.classList.toggle('active')}}/>
            <LogOut/>
            <ul>
                {
                    process.env.NEXT_PUBLIC_ROUTES.map((item, index) => {
                        return (
                            <NavItem icon={item.icon} onMouseEnter={(event) => {showTitle(event.target)}} onClick={() => { navContainer.current.classList.toggle('active') }} key={index}>
                                <Link href={'/list' + item.path}><a></a></Link>
                                <HoverTitle>{item.title}</HoverTitle>
                            </NavItem>
                        )
                    })
                }
                
            </ul>
        </Navigation>
    )   
}

const NavigationMobileButton = styled.div`
    width: 30px;
    height: 20px;
    border-top: 4px solid #fff;
    border-bottom: 4px solid #fff;
    position: relative;
    margin-right: 1rem;
    align-items: center;
    justify-content: center;
    display: none;

    @media (max-width: ${props => props.theme.mobileBreakPoint}) {
        display: block;
    } 

    :after {
        width: 100%;
        content: "";
        display: block;
        height: 4px;
        background-color: #fff;
        position: absolute;
        margin-top: -2px;
        top: 50%;
        left: 0;
    }
`

const Navigation = styled.nav`
padding: 3rem;
width: 8rem;
min-height: 100%;
background-image: linear-gradient(45deg, ${props => props.theme.gradientColor1}, ${props => props.theme.gradientColor2});
transition: all 1s;

    @media (max-width: ${props => props.theme.mobileBreakPoint}) {
        width: 100%;
        height: 80px;
        min-height: 80px;
        display: flex;
        justify-content: space-between;
        flex-flow: wrap;
        padding: 2rem;
        overflow: hidden;
    } 

    &.active {
        min-height: 100%;
        height: auto;

        ul {
            min-height: 100%;
            
        }
    }

    ul {
        margin: 0;
        transition: all 1s;
        display: flex;
        flex-flow: column;

        @media (max-width: ${props => props.theme.mobileBreakPoint}) {
            min-height: 0;
            flex-basis: 100%;
        } 
    }
    a {
        color: #fff;
    }
`

const NavItem = styled.li`
        display: block;
        width: 40px;
        height: 40px;
        list-style: none;
        margin: .6rem 0;
        padding: .3rem 0;
        font-size: 1rem;
        transition: all .5s;
        position: relative;
        background-image: url(${props => '/icons/' + props.icon + '.svg'});
        background-size: auto 70%;
        background-repeat: no-repeat;
        background-position: center;
        
        :before {
        content: "";
        width: 10px;
        height: 10px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: -20px;
    }
    :hover {
        transform: translateX(15px);
    }
    a {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
`

const SiteTitle = styled.div`
    color: #fff;
    font-size: 1.6rem;
    margin-bottom: .5rem;
    height: auto;
`

const HoverTitle = styled.div`
    position: absolute;
    top: 0;
    left: 115%;
    background-color: #f2f2f2;
    padding: .5rem;
    border-radius: 15px;
    width: 200px;
    display: none;

    &.activeTitle {
        display: block;
    }
`