import React from 'react'
import { useGoogleAuth } from '../../context/googleAuth'
import { Button, PageHeader, Menu } from 'antd';

const { Item, SubMenu } = Menu




export default () => {
    const { signIn, signOut, googleUser, isSignedIn } = useGoogleAuth()
    return (
        <Menu  mode="horizontal" theme="dark">
            <Item>Menu</Item>
            <Item onClick={signIn}>Sign In</Item>
            <Item onClick={signOut}>Sign Out</Item>
            <Item><img src={googleUser.profileObj.imageUrl} alt="Avatar." /></Item>
        </Menu>
    )
}