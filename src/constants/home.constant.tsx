import React from 'react';
import { Entypo, AntDesign, Feather, Ionicons, EvilIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { HomeCreate, HomeCreateActionType } from '../interfaces/screens/home.interface';
import { BUTTON_PRIMARY, TEXT_PRIMARY } from './colors.constant';
import { View } from 'react-native';

export const HOME_CREATE: HomeCreate[] = [
    {
        label: "TaskCreate",
        backgroundColor: "#b1d0f0",
        color: TEXT_PRIMARY,
        icon: () => <Entypo name="plus" size={30} color={BUTTON_PRIMARY} />,
        action: HomeCreateActionType.none
    },
    {
        label: "TaskTask",
        backgroundColor: "#ecc6f5",
        color: TEXT_PRIMARY,
        icon: () => <Ionicons name="school-outline" size={27} color="#66027d" />,
        action: HomeCreateActionType.task
    },
    {
        label: "TaskBook",
        backgroundColor: "#fac5af",
        color: TEXT_PRIMARY,
        icon: () => <AntDesign name="book" size={24} color="#852a03" />,
        action: HomeCreateActionType.book
    },
    {
        label: "TaskShopping",
        backgroundColor: "#c6f5cb",
        color: TEXT_PRIMARY,
        icon: () => <Feather name="shopping-bag" size={24} color="#002b05" />,
        action: HomeCreateActionType.shopping
    },
    {
        label: "TaskMovie",
        backgroundColor: "#f2faaf",
        color: TEXT_PRIMARY,
        icon: () => <EvilIcons name="play" size={38} color="#677301" />,
        action: HomeCreateActionType.movie
    },
    {
        label: "TaskDesire",
        backgroundColor: "#fa9e98",
        color: TEXT_PRIMARY,
        icon: () => <MaterialCommunityIcons name='cards-heart-outline' size={24} color="#570101" />,
        action: HomeCreateActionType.desire
    },
    {
        label: "TaskTravel",
        backgroundColor: "#ebebeb",
        color: TEXT_PRIMARY,
        icon: () => <Ionicons name="airplane-outline" size={24} color="#444" />,
        action: HomeCreateActionType.travel
    },
    {
        label: "TaskGift",
        backgroundColor: "#eaacfa",
        color: TEXT_PRIMARY,
        icon: () => <AntDesign name="gift" size={24} color="#410152" />,
        action: HomeCreateActionType.gift
    },
]

export const filterIconHomeCreateAction = (action: "none" | "task" | "book" | "shopping" | "movie" | "desire" | "travel" | "gift") => {
    const find = HOME_CREATE.find(h => h.action == action);
    if (!find) return <View />

    return find.icon();
}