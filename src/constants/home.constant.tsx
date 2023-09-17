import React from 'react';
import { Entypo, AntDesign, Feather, Ionicons, EvilIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { HomeCreate } from '../interfaces/screens/home.interface';
import { BUTTON_PRIMARY, TEXT_PRIMARY } from './colors.constant';

export const HOME_CREATE: HomeCreate[] = [
    {
        label: "TaskCreate",
        backgroundColor: "#b1d0f0",
        click: () => { },
        color: TEXT_PRIMARY,
        icon: () => <Entypo name="plus" size={30} color={BUTTON_PRIMARY} />,
        action: "none",
    },
    {
        label: "TaskTask",
        backgroundColor: "#ecc6f5",
        click: () => { },
        color: TEXT_PRIMARY,
        icon: () => <Ionicons name="school-outline" size={27} color="#66027d" />,
        action: "task",
    },
    {
        label: "TaskBook",
        backgroundColor: "#fac5af",
        click: () => { },
        color: TEXT_PRIMARY,
        icon: () => <AntDesign name="book" size={24} color="#852a03" />,
        action: "book",
    },
    {
        label: "TaskShopping",
        backgroundColor: "#c6f5cb",
        click: () => { },
        color: TEXT_PRIMARY,
        icon: () => <Feather name="shopping-bag" size={24} color="#002b05" />,
        action: "shopping",
    },
    {
        label: "TaskMovie",
        backgroundColor: "#f2faaf",
        click: () => { },
        color: TEXT_PRIMARY,
        icon: () => <EvilIcons name="play" size={38} color="#677301" />,
        action: "movie",
    },
    {
        label: "TaskDesire",
        backgroundColor: "#fa9e98",
        click: () => { },
        color: TEXT_PRIMARY,
        icon: () => <MaterialCommunityIcons name='cards-heart-outline' size={24} color="#570101" />,
        action: "desire",
    },
    {
        label: "TaskTravel",
        backgroundColor: "#ebebeb",
        click: () => { },
        color: TEXT_PRIMARY,
        icon: () => <Ionicons name="airplane-outline" size={24} color="#444" />,
        action: "travel",
    },
    {
        label: "TaskGift",
        backgroundColor: "#eaacfa",
        click: () => { },
        color: TEXT_PRIMARY,
        icon: () => <AntDesign name="gift" size={24} color="#410152" />,
        action: "gift",
    },
]